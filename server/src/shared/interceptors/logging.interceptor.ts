import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Logger,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { GraphQLResolveInfo } from 'graphql';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  private readonly logger = new Logger(LoggingInterceptor.name);

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    if (context.getType() === 'http') {
      return this.logHttpCall(context, next);
    } else {
      return this.logGraphQlCall(context, next);
    }
  }

  private logHttpCall(context: ExecutionContext, next: CallHandler) {
    const request = context.switchToHttp().getRequest();
    const userAgent = request.get('user-agent') || '';
    const { ip, method, path: url } = request;
    const correlationKey = uuidv4();
    const userId = request.user?.sub;

    this.logger.log(
      `[${correlationKey}] ${method} ${url} ${userId} ${userAgent} ${ip}: ${
        context.getClass().name
      } ${context.getHandler().name}`,
    );

    const now = Date.now();
    return next.handle().pipe(
      tap(() => {
        const response = context.switchToHttp().getResponse();

        const { statusCode } = response;

        this.logger.log(
          `[${correlationKey}] ${method} ${url} ${statusCode}: Completed in ${
            Date.now() - now
          }ms`,
        );
      }),
    );
  }

  private logGraphQlCall(context: ExecutionContext, next: CallHandler) {
    const gqlContext = GqlExecutionContext.create(context);
    const info = gqlContext.getInfo<GraphQLResolveInfo>();
    const { fieldName, operation } = info;
    const args = gqlContext.getArgs<Record<string, any>>();
    const correlationKey = uuidv4();
    const userId = gqlContext.getContext().req?.user?.sub;

    this.logger.log(
      `[${correlationKey}] GraphQL Operation: ${operation.operation} ${fieldName} User: ${userId} Args: ${JSON.stringify(
        args,
      )}`,
    );

    const now = Date.now();
    return next.handle().pipe(
      tap(() => {
        this.logger.log(
          `[${correlationKey}] GraphQL Operation: ${operation.operation} ${fieldName} completed in ${
            Date.now() - now
          }ms`,
        );
      }),
    );
  }
}

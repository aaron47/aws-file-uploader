import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { JwtPayload } from '../types/JwtPayload.type';

export const GetCurrentUserFromGql = createParamDecorator(
  (data: keyof JwtPayload, context: ExecutionContext) => {
    const ctx = GqlExecutionContext.create(context);
    const user = ctx.getContext().req.user; // Access user from the request in GraphQL context
    return data ? user?.[data] : user;
  },
);

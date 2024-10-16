import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { JwtPayload } from '../types/JwtPayload.type';
import { Request } from 'express';

export const GetCurrentUser = createParamDecorator(
  (data: keyof JwtPayload, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest<Request>();
    const user = request.user;

    if (data) {
      return user[data];
    }

    return user;
  },
);

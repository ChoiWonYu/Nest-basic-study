import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const UserFromToken = createParamDecorator(
  (data, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const user = request.user;
    return user.id;
  },
);

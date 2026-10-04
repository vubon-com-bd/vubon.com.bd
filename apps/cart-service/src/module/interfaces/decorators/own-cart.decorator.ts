import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const OwnCart = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext): string | undefined => {
    const req = ctx.switchToHttp().getRequest<{ params?: Record<string, string> }>();
    return req.params?.cartId ?? req.params?.id;
  },
);

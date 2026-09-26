import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const CurrentVendor = createParamDecorator(
  (field: string | undefined, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest<{ vendor?: Record<string, unknown> }>();
    const vendor = request.vendor;
    return field && vendor ? vendor[field] : vendor;
  },
);

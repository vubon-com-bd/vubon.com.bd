import { createParamDecorator, type ExecutionContext } from '@nestjs/common';
import type { AuthContext } from '@vubon/shared-types/auth';

interface RequestWithUser {
  user?: AuthContext;
}

/**
 * Extract the authenticated user from the request.
 * Usage: `@CurrentUser() user: AuthContext`
 */
export const CurrentUser = createParamDecorator(
  (data: keyof AuthContext | undefined, ctx: ExecutionContext): unknown => {
    const req = ctx.switchToHttp().getRequest<RequestWithUser>();
    const user = req.user;
    if (!user) return null;
    return data ? user[data] : user;
  }
);

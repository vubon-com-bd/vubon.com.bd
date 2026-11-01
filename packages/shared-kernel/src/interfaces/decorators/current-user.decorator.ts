/**
 * Current User Decorator
 * @module shared-kernel/interfaces/decorators
 */
import { createParamDecorator } from '@nestjs/common';
import type { ExecutionContext } from '@nestjs/common';

export interface CurrentUserShape {
  readonly userId: string;
  readonly sessionId?: string;
  readonly roles?: readonly string[];
  readonly permissions?: readonly string[];
}

export const CurrentUser = createParamDecorator(
  (field: keyof CurrentUserShape | undefined, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest<{
      user?: CurrentUserShape;
    }>();
    const user = request.user;
    if (!user) return undefined;
    return field ? user[field] : user;
  }
);

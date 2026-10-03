/**
 * @CurrentUser — extracts authenticated user from request
 * @module auth-service/interfaces/decorators
 *
 * The request.user shape is populated by JwtAuthGuard (kernel).
 * Falls back to header-based session if needed.
 */
import { createParamDecorator, type ExecutionContext } from '@nestjs/common';

export interface AuthenticatedUser {
  readonly id: string;
  readonly email?: string;
  readonly roles?: readonly string[];
  readonly sessionId?: string;
  readonly mfaVerified?: boolean;
  readonly deviceTrusted?: boolean;
}

export const CurrentUser = createParamDecorator(
  (data: keyof AuthenticatedUser | undefined, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest<{ user?: AuthenticatedUser }>();
    const user = request.user;
    if (!user) return undefined;
    return data ? user[data] : user;
  },
);

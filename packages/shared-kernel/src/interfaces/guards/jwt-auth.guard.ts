/**
 * JWT Auth Guard
 * @module shared-kernel/interfaces/guards
 *
 * Uses HTTP_STATUS.UNAUTHORIZED from shared-constants।
 * Base implementation can be extended by auth-service.
 */
import { Injectable, UnauthorizedException } from '@nestjs/common';
import type { CanActivate, ExecutionContext } from '@nestjs/common';
import { HTTP_STATUS } from '@vubon/shared-constants/common';

export interface AuthenticatedUser {
  readonly userId: string;
  readonly sessionId?: string;
  readonly roles?: readonly string[];
  readonly permissions?: readonly string[];
}

@Injectable()
export class JwtAuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<{
      user?: AuthenticatedUser;
      headers: Record<string, string | undefined>;
    }>();

    if (!request.user) {
      throw new UnauthorizedException({
        statusCode: HTTP_STATUS.UNAUTHORIZED,
        message: 'Authentication required',
      });
    }
    return true;
  }
}

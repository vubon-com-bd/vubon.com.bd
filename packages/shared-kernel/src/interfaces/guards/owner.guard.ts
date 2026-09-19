/**
 * Owner Guard
 * @module shared-kernel/interfaces/guards
 */
import { ForbiddenException, Injectable } from '@nestjs/common';
import type { CanActivate, ExecutionContext } from '@nestjs/common';
import { HTTP_STATUS } from '@vubon/shared-constants/common';
import type { AuthenticatedUser } from './jwt-auth.guard';

export const OWNER_PARAM_KEY = 'ownerParam';

@Injectable()
export class OwnerGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<{
      user?: AuthenticatedUser;
      params: Record<string, string>;
    }>();

    const user = request.user;
    if (!user) {
      throw new ForbiddenException({
        statusCode: HTTP_STATUS.FORBIDDEN,
        message: 'Authentication required',
      });
    }

    const ownerParam = Reflect.getMetadata(OWNER_PARAM_KEY, context.getHandler()) as
      string | undefined;

    if (!ownerParam) return true;

    const ownerId = request.params[ownerParam];
    if (ownerId && ownerId !== user.userId) {
      throw new ForbiddenException({
        statusCode: HTTP_STATUS.FORBIDDEN,
        message: 'Not the resource owner',
      });
    }
    return true;
  }
}

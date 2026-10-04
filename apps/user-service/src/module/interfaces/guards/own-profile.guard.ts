/**
 * OwnProfileGuard — blocks access if target user ≠ current user
 * @module user-service/interfaces/guards
 */
import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import type { Request } from 'express';
import type { CurrentUserShape } from '@vubon/shared-kernel/interfaces';
import { USER_ROLE } from '@vubon/shared-constants/user';

interface AuthedRequest extends Request {
  user?: CurrentUserShape;
}

@Injectable()
export class OwnProfileGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<AuthedRequest>();
    const currentUser = request.user;

    if (!currentUser) {
      throw new ForbiddenException('Authentication required');
    }

    const targetUserId = request.params.id ?? request.params.userId;
    if (!targetUserId) {
      throw new ForbiddenException('Target user id is missing in route');
    }

    if (currentUser.userId === targetUserId) return true;

    // Admin bypass
    const isAdmin = (currentUser.roles ?? []).includes(USER_ROLE.ADMIN);
    if (isAdmin) return true;

    throw new ForbiddenException('You can only access your own profile');
  }
}

/**
 * OwnProfileGuard — user can only access own profile
 * @module identity-service/interfaces/guards
 */
import {
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { BaseGuard } from '@vubon/shared-kernel/interfaces/guards';
import { ROLE } from '@vubon/shared-constants/common';

interface ProfileRequest {
  params?: Record<string, string>;
  user?: {
    userId?: string;
    roles?: readonly string[];
  };
}

@Injectable()
export class OwnProfileGuard extends BaseGuard {
  canActivate(context: ExecutionContext): boolean {
    const req = context.switchToHttp().getRequest<ProfileRequest>();
    const targetUserId = req.params?.['userId'] ?? req.params?.['id'];
    const user = req.user;

    if (!user?.userId) {
      throw new ForbiddenException('Authentication required');
    }

    const isAdmin =
      user.roles?.includes(ROLE.ADMIN) ||
      user.roles?.includes(ROLE.SUPER_ADMIN);
    if (isAdmin) return true;

    if (targetUserId && targetUserId !== user.userId) {
      throw new ForbiddenException('You can only access your own profile');
    }

    return true;
  }
}

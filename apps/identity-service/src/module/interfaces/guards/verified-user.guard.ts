/**
 * VerifiedUserGuard — requires email+phone verification
 * @module identity-service/interfaces/guards
 */
import {
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { BaseGuard } from '@vubon/shared-kernel/interfaces/guards';

interface UserRequest {
  user?: {
    userId?: string;
    emailVerified?: boolean;
    phoneVerified?: boolean;
  };
}

@Injectable()
export class VerifiedUserGuard extends BaseGuard {
  canActivate(context: ExecutionContext): boolean {
    const req = context.switchToHttp().getRequest<UserRequest>();
    const user = req.user;

    if (!user?.userId) {
      throw new ForbiddenException('Authentication required');
    }
    if (!user.emailVerified || !user.phoneVerified) {
      throw new ForbiddenException('Email and phone verification required');
    }
    return true;
  }
}

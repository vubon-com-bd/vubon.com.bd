/**
 * VerifiedGuard — requires email+phone verification
 * @module identity-service/interfaces/guards
 */
import {
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { BaseGuard } from '@vubon/shared-kernel/interfaces/guards';

interface VerifiedRequest {
  user?: {
    userId?: string;
    emailVerified?: boolean;
    phoneVerified?: boolean;
  };
}

@Injectable()
export class VerifiedGuard extends BaseGuard {
  canActivate(context: ExecutionContext): boolean {
    const req = context.switchToHttp().getRequest<VerifiedRequest>();
    const user = req.user;

    if (!user?.userId) {
      throw new ForbiddenException('Authentication required');
    }

    if (user.emailVerified !== true || user.phoneVerified !== true) {
      throw new ForbiddenException(
        'Email and phone verification required to access this resource',
      );
    }

    return true;
  }
}

/**
 * KycVerifiedGuard — requires KYC verification
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
    kycVerified?: boolean;
  };
}

@Injectable()
export class KycVerifiedGuard extends BaseGuard {
  canActivate(context: ExecutionContext): boolean {
    const req = context.switchToHttp().getRequest<UserRequest>();
    const user = req.user;

    if (!user?.userId) {
      throw new ForbiddenException('Authentication required');
    }
    if (user.kycVerified !== true) {
      throw new ForbiddenException('KYC verification required');
    }
    return true;
  }
}

/**
 * MfaGuard — requires MFA verification for the current session
 * @module identity-service/interfaces/guards
 */
import {
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { BaseGuard } from '@vubon/shared-kernel/interfaces/guards';

interface MfaRequest {
  user?: {
    userId?: string;
    sessionId?: string;
    mfaVerified?: boolean;
  };
}

@Injectable()
export class MfaGuard extends BaseGuard {
  canActivate(context: ExecutionContext): boolean {
    const req = context.switchToHttp().getRequest<MfaRequest>();
    const user = req.user;

    if (!user?.userId) {
      throw new ForbiddenException('Authentication required');
    }

    if (user.mfaVerified !== true) {
      throw new ForbiddenException('MFA verification required');
    }

    return true;
  }
}

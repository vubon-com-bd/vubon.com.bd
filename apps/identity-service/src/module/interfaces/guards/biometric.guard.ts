/**
 * BiometricGuard — requires biometric verification
 * @module identity-service/interfaces/guards
 */
import {
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { BaseGuard } from '@vubon/shared-kernel/interfaces/guards';

interface BiometricRequest {
  user?: {
    userId?: string;
    biometricVerified?: boolean;
  };
}

@Injectable()
export class BiometricGuard extends BaseGuard {
  canActivate(context: ExecutionContext): boolean {
    const req = context.switchToHttp().getRequest<BiometricRequest>();
    const user = req.user;

    if (!user?.userId) {
      throw new ForbiddenException('Authentication required');
    }

    if (user.biometricVerified !== true) {
      throw new ForbiddenException('Biometric verification required');
    }

    return true;
  }
}

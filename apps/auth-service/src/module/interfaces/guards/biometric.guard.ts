import {
  Injectable,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { BaseGuard } from '@vubon/shared-kernel/interfaces';

export const BIOMETRIC_REQUIRED_KEY = 'biometricRequired';

@Injectable()
export class BiometricGuard extends BaseGuard {
  constructor(private readonly reflector: Reflector) {
    super();
  }

  canActivate(context: ExecutionContext): boolean {
    const required = this.reflector.getAllAndOverride<boolean>(
      BIOMETRIC_REQUIRED_KEY,
      [context.getHandler(), context.getClass()],
    );
    if (!required) return true;

    const request = context
      .switchToHttp()
      .getRequest<{ user?: { biometricVerified?: boolean } }>();
    if (!request.user?.biometricVerified) {
      throw new ForbiddenException('Biometric verification required');
    }
    return true;
  }
}

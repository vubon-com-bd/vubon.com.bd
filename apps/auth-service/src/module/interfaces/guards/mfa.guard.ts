import {
  Injectable,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { BaseGuard } from '@vubon/shared-kernel/interfaces';

export const MFA_REQUIRED_KEY = 'mfaRequired';

@Injectable()
export class MfaGuard extends BaseGuard {
  constructor(private readonly reflector: Reflector) {
    super();
  }

  canActivate(context: ExecutionContext): boolean {
    const required = this.reflector.getAllAndOverride<boolean>(
      MFA_REQUIRED_KEY,
      [context.getHandler(), context.getClass()],
    );
    if (!required) return true;

    const request = context
      .switchToHttp()
      .getRequest<{ user?: { mfaVerified?: boolean } }>();
    if (!request.user?.mfaVerified) {
      throw new ForbiddenException('MFA verification required');
    }
    return true;
  }
}

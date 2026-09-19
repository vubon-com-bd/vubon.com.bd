import {
  Injectable,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { BaseGuard } from '@vubon/shared-kernel/interfaces';

export const VERIFIED_REQUIRED_KEY = 'verifiedRequired';

@Injectable()
export class VerifiedGuard extends BaseGuard {
  constructor(private readonly reflector: Reflector) {
    super();
  }

  canActivate(context: ExecutionContext): boolean {
    const required = this.reflector.getAllAndOverride<boolean>(
      VERIFIED_REQUIRED_KEY,
      [context.getHandler(), context.getClass()],
    );
    if (!required) return true;

    const request = context
      .switchToHttp()
      .getRequest<{ user?: { emailVerified?: boolean } }>();
    if (!request.user?.emailVerified) {
      throw new ForbiddenException('Email verification required');
    }
    return true;
  }
}

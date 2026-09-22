import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';

@Injectable()
export class KycVerifiedGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context
      .switchToHttp()
      .getRequest<{ user?: { kycVerified?: boolean } }>();

    if (!request.user?.kycVerified) {
      throw new ForbiddenException('KYC verification required');
    }
    return true;
  }
}

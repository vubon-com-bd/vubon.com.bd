import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { BaseGuard } from '@vubon/shared-kernel/interfaces';

interface AuthenticatedRequest {
  readonly user?: { readonly roles?: readonly string[] };
}

@Injectable()
export class AffiliateOnlyGuard extends BaseGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<AuthenticatedRequest>();
    const roles = request.user?.roles ?? [];

    if (!roles.includes('affiliate') && !roles.includes('admin')) {
      throw new ForbiddenException('Affiliate access only');
    }
    return true;
  }
}

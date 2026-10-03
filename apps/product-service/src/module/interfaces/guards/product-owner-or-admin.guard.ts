/**
 * ProductOwnerOrAdminGuard — allows owner (vendor) or admin.
 * @module product-service/interfaces/guards
 */
import { Injectable, ExecutionContext, ForbiddenException, UnauthorizedException } from '@nestjs/common';
import { BaseGuard } from '@vubon/shared-kernel/interfaces/guards';

interface AuthenticatedRequest {
  readonly user?: { readonly userId: string; readonly role?: string };
  readonly params: Record<string, string | undefined>;
}

@Injectable()
export class ProductOwnerOrAdminGuard extends BaseGuard {
  canActivate(context: ExecutionContext): boolean {
    const req = context.switchToHttp().getRequest<AuthenticatedRequest>();
    const user = req.user;
    if (!user) throw new UnauthorizedException('Authentication required');

    if (user.role === 'admin' || user.role === 'super_admin') return true;

    throw new ForbiddenException('Admin or owner access required');
  }
}

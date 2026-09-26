import {
  Injectable,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { BaseGuard } from '@vubon/shared-kernel/interfaces';

@Injectable()
export class AdminOnlyGuard extends BaseGuard {
  canActivate(context: ExecutionContext): boolean {
    const request = context
      .switchToHttp()
      .getRequest<{ user?: { roles?: readonly string[] } }>();

    const roles = request.user?.roles ?? [];
    if (!roles.includes('admin') && !roles.includes('super_admin')) {
      throw new ForbiddenException('Admin access required');
    }
    return true;
  }
}

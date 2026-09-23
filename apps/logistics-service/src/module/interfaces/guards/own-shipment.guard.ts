import {
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { BaseGuard } from '@vubon/shared-kernel/interfaces';

@Injectable()
export class OwnShipmentGuard extends BaseGuard {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<{
      user?: { userId?: string };
      params?: { id?: string };
    }>();
    if (!request.user?.userId) {
      throw new ForbiddenException('Authentication required');
    }
    return true;
  }
}

import {
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { BaseGuard } from '@vubon/shared-kernel/interfaces';

@Injectable()
export class WarehouseActiveGuard extends BaseGuard {
  canActivate(context: ExecutionContext): boolean {
    const request = context
      .switchToHttp()
      .getRequest<{ warehouse?: { status?: string } }>();
    if (request.warehouse && request.warehouse.status !== 'active') {
      throw new ForbiddenException('Warehouse is not active');
    }
    return true;
  }
}

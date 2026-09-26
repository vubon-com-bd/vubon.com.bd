import {
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { BaseGuard } from '@vubon/shared-kernel/interfaces';

@Injectable()
export class VendorShipmentGuard extends BaseGuard {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<{
      user?: { vendorId?: string };
    }>();
    if (!request.user?.vendorId) {
      throw new ForbiddenException('Vendor access required');
    }
    return true;
  }
}

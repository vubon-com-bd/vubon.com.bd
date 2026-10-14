/**
 * VendorActiveGuard — checks vendor is in 'active' state
 * @module vendor-service/interfaces/guards
 */
import {
  ExecutionContext,
  ForbiddenException,
  Inject,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { BaseGuard } from '@vubon/shared-kernel/interfaces/guards';
import { HTTP_STATUS } from '@vubon/shared-constants/common';
import {
  VENDOR_REPOSITORY,
  type VendorRepository,
} from '../../domain/repositories/vendor.repository.interface.js';
import { VENDOR_ACTIVE_META_KEY } from '../decorators/vendor-active.decorator.js';

@Injectable()
export class VendorActiveGuard extends BaseGuard {
  constructor(
    @Inject(VENDOR_REPOSITORY)
    private readonly vendorRepo: VendorRepository,
    private readonly reflector: Reflector,
  ) {
    super();
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const required = this.reflector.getAllAndOverride<boolean>(
      VENDOR_ACTIVE_META_KEY,
      [context.getHandler(), context.getClass()],
    );
    if (!required) return true;

    const req = context.switchToHttp().getRequest<{
      vendor?: { vendorId?: string };
    }>();

    const vendorId = req.vendor?.vendorId;
    if (!vendorId) return true;

    const vendor = await this.vendorRepo.findById(vendorId);
    if (!vendor) {
      throw new ForbiddenException({
        statusCode: HTTP_STATUS.FORBIDDEN,
        message: 'Vendor not found',
      });
    }

    if (!vendor.isActive()) {
      throw new ForbiddenException({
        statusCode: HTTP_STATUS.FORBIDDEN,
        message: `Vendor is not active (status: ${vendor.status.value})`,
      });
    }

    return true;
  }
}

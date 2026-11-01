/**
 * OwnVendorGuard — checks that authenticated user owns the vendor
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
import { HTTP_STATUS, ROLE } from '@vubon/shared-constants/common';
import {
  VENDOR_REPOSITORY,
  type VendorRepository,
} from '../../domain/repositories/vendor.repository.interface.js';
import { OWN_VENDOR_META_KEY } from '../decorators/own-vendor.decorator.js';

@Injectable()
export class OwnVendorGuard extends BaseGuard {
  constructor(
    @Inject(VENDOR_REPOSITORY)
    private readonly vendorRepo: VendorRepository,
    private readonly reflector: Reflector,
  ) {
    super();
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const required = this.reflector.getAllAndOverride<boolean>(
      OWN_VENDOR_META_KEY,
      [context.getHandler(), context.getClass()],
    );
    if (!required) return true;

    const req = context.switchToHttp().getRequest<{
      user?: { userId?: string; roles?: readonly string[] };
      vendor?: { vendorId?: string };
      params?: Record<string, string>;
    }>();

    const user = req.user;
    if (!user?.userId) {
      throw new ForbiddenException({
        statusCode: HTTP_STATUS.FORBIDDEN,
        message: 'Authentication required',
      });
    }

    const isAdmin =
      user.roles?.includes(ROLE.ADMIN) ||
      user.roles?.includes(ROLE.SUPER_ADMIN);
    if (isAdmin) return true;

    const vendorId = req.vendor?.vendorId ?? req.params?.['vendorId'];
    if (!vendorId) return true;

    const vendor = await this.vendorRepo.findById(vendorId);
    if (!vendor) {
      throw new ForbiddenException({
        statusCode: HTTP_STATUS.FORBIDDEN,
        message: 'Vendor not found',
      });
    }

    if (vendor.vo.userId.value !== user.userId) {
      throw new ForbiddenException({
        statusCode: HTTP_STATUS.FORBIDDEN,
        message: 'You do not own this vendor',
      });
    }

    return true;
  }
}

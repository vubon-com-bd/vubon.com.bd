/**
 * VendorStatusGuard — ensures vendor's status is in allowed set
 * @module vendor-service/interfaces/guards
 */
import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Inject,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { HTTP_STATUS } from '@vubon/shared-constants/common';
import {
  VENDOR_REPOSITORY,
  type VendorRepository,
} from '../../domain/repositories/vendor.repository.interface.js';
import { REQUIRED_VENDOR_STATUS_KEY } from '../decorators/vendor-status.decorator.js';

@Injectable()
export class VendorStatusGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    @Inject(VENDOR_REPOSITORY)
    private readonly vendorRepo: VendorRepository,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const required = this.reflector.getAllAndOverride<readonly string[]>(
      REQUIRED_VENDOR_STATUS_KEY,
      [context.getHandler(), context.getClass()],
    );
    if (!required || required.length === 0) return true;

    const request = context.switchToHttp().getRequest<{
      params: Record<string, string>;
    }>();
    const vendorId = request.params['vendorId'];
    if (!vendorId) return true;

    const vendor = await this.vendorRepo.findById(vendorId);
    if (!vendor) {
      throw new ForbiddenException({
        statusCode: HTTP_STATUS.FORBIDDEN,
        message: 'Vendor not found',
      });
    }

    if (!required.includes(vendor.status.value)) {
      throw new ForbiddenException({
        statusCode: HTTP_STATUS.FORBIDDEN,
        message: `Vendor must be in status: ${required.join(', ')}`,
      });
    }

    return true;
  }
}

/**
 * VendorTierGuard — ensures vendor's tier is in allowed set
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
import { REQUIRED_VENDOR_TIER_KEY } from '../decorators/vendor-tier.decorator.js';

@Injectable()
export class VendorTierGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    @Inject(VENDOR_REPOSITORY)
    private readonly vendorRepo: VendorRepository,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const required = this.reflector.getAllAndOverride<readonly string[]>(
      REQUIRED_VENDOR_TIER_KEY,
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

    if (!required.includes(vendor.tier.value)) {
      throw new ForbiddenException({
        statusCode: HTTP_STATUS.FORBIDDEN,
        message: `Vendor tier must be one of: ${required.join(', ')}`,
      });
    }

    return true;
  }
}

/**
 * VendorOwnerGuard — ensures the authenticated user owns the vendor
 * @module vendor-service/interfaces/guards
 *
 * Reads VENDOR_OWNER_PARAM_KEY metadata to know which route param is the vendorId.
 * Fetches vendor, compares vendor.userId with current user.
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
import { VENDOR_OWNER_PARAM_KEY } from '../decorators/vendor-owner.decorator.js';
import type { AuthenticatedUser } from '@vubon/shared-kernel/interfaces/guards';

@Injectable()
export class VendorOwnerGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    @Inject(VENDOR_REPOSITORY)
    private readonly vendorRepo: VendorRepository,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const paramName = this.reflector.get<string>(
      VENDOR_OWNER_PARAM_KEY,
      context.getHandler(),
    );
    if (!paramName) return true;

    const request = context.switchToHttp().getRequest<{
      user?: AuthenticatedUser;
      params: Record<string, string>;
    }>();

    const user = request.user;
    if (!user) {
      throw new ForbiddenException({
        statusCode: HTTP_STATUS.FORBIDDEN,
        message: 'Authentication required',
      });
    }

    const vendorId = request.params[paramName];
    if (!vendorId) return true;

    const vendor = await this.vendorRepo.findById(vendorId);
    if (!vendor) {
      throw new ForbiddenException({
        statusCode: HTTP_STATUS.FORBIDDEN,
        message: 'Vendor not found',
      });
    }

    // Admins bypass
    if (user.roles?.includes('super_admin') || user.roles?.includes('admin')) {
      return true;
    }

    if (vendor.userId !== user.userId) {
      throw new ForbiddenException({
        statusCode: HTTP_STATUS.FORBIDDEN,
        message: 'Not the vendor owner',
      });
    }

    return true;
  }
}

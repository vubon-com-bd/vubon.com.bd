/**
 * VendorProductGuard — verifies that the caller belongs to the vendor.
 * @module product-service/interfaces/guards
 */
import {
  ExecutionContext,
  ForbiddenException,
  Inject,
  Injectable,
} from '@nestjs/common';
import { BaseGuard } from '@vubon/shared-kernel/interfaces/guards';
import { PRODUCT_REPOSITORY, type ProductRepository } from '../../domain/repositories/product.repository.interface.js';

export const VENDOR_PRODUCT_GUARD = Symbol('VENDOR_PRODUCT_GUARD');

@Injectable()
export class VendorProductGuard extends BaseGuard {
  constructor(
    @Inject(PRODUCT_REPOSITORY) private readonly productRepo: ProductRepository,
  ) {
    super();
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest<{
      params?: Record<string, string>;
      user?: { userId?: string; vendorId?: string; role?: string };
    }>();

    const productId = req.params?.productId ?? req.params?.id;
    if (!productId) return true;

    const user = req.user;
    if (!user?.userId) throw new ForbiddenException('Authentication required');
    if (user.role === 'admin') return true;

    const product = await this.productRepo.findById(productId);
    if (!product) throw new ForbiddenException('Product not found');

    if (!user.vendorId || product.vendorId !== user.vendorId) {
      throw new ForbiddenException('Product does not belong to your vendor account');
    }
    return true;
  }
}

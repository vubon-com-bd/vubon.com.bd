/**
 * OwnProductGuard — verifies that the caller owns the product.
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

export const OWN_PRODUCT_GUARD = Symbol('OWN_PRODUCT_GUARD');

@Injectable()
export class OwnProductGuard extends BaseGuard {
  constructor(
    @Inject(PRODUCT_REPOSITORY) private readonly productRepo: ProductRepository,
  ) {
    super();
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest<{
      params?: Record<string, string>;
      user?: { userId?: string; role?: string };
    }>();

    const productId = req.params?.productId ?? req.params?.id;
    if (!productId) return true;

    const user = req.user;
    if (!user?.userId) throw new ForbiddenException('Authentication required');

    // Admins bypass ownership check
    if (user.role === 'admin') return true;

    const product = await this.productRepo.findById(productId);
    if (!product) throw new ForbiddenException('Product not found');

    if (product.vendorId !== user.userId) {
      throw new ForbiddenException('You do not own this product');
    }
    return true;
  }
}

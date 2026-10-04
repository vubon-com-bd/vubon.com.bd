/**
 * ProductPublishedGuard — restricts access to published products only.
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

export const PRODUCT_PUBLISHED_GUARD = Symbol('PRODUCT_PUBLISHED_GUARD');

@Injectable()
export class ProductPublishedGuard extends BaseGuard {
  constructor(
    @Inject(PRODUCT_REPOSITORY) private readonly productRepo: ProductRepository,
  ) {
    super();
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest<{
      params?: Record<string, string>;
      user?: { role?: string };
    }>();

    // Admins/vendors bypass published check
    if (req.user?.role === 'admin' || req.user?.role === 'vendor') return true;

    const productId = req.params?.productId ?? req.params?.id;
    if (!productId) return true;

    const product = await this.productRepo.findById(productId);
    if (!product || !product.isPublished) {
      throw new ForbiddenException('Product is not published');
    }
    return true;
  }
}

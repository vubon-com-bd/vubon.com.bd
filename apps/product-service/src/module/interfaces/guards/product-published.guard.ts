/**
 * ProductPublishedGuard — only allow published products
 * @module product-service/interfaces/guards
 *
 * Allows:
 *  - Admin (any status)
 *  - Public only if product is published (or out_of_stock)
 */
import {
  ExecutionContext,
  ForbiddenException,
  Inject,
  Injectable,
} from '@nestjs/common';
import { BaseGuard } from '@vubon/shared-kernel/interfaces/guards';
import { HTTP_STATUS, ROLE } from '@vubon/shared-constants/common';
import {
  PRODUCT_REPOSITORY,
  type ProductRepository,
} from '../../domain/repositories/product.repository.interface.js';

@Injectable()
export class ProductPublishedGuard extends BaseGuard {
  constructor(
    @Inject(PRODUCT_REPOSITORY)
    private readonly repo: ProductRepository,
  ) {
    super();
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest<{
      params?: Record<string, string>;
      user?: { userId?: string; roles?: readonly string[] };
    }>();

    const productId = req.params?.['productId'] ?? req.params?.['id'];
    if (!productId) return true;

    const user = req.user;
    const isAdmin =
      user?.roles?.includes(ROLE.ADMIN) ||
      user?.roles?.includes(ROLE.SUPER_ADMIN);
    if (isAdmin) return true;

    const product = await this.repo.findById(productId);
    if (!product) {
      throw new ForbiddenException({
        statusCode: HTTP_STATUS.FORBIDDEN,
        message: 'Product not found',
      });
    }

    if (!product.status.isVisible()) {
      throw new ForbiddenException({
        statusCode: HTTP_STATUS.FORBIDDEN,
        message: `Product is not available (status: ${product.status.value})`,
      });
    }

    return true;
  }
}

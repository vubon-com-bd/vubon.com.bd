/**
 * VendorProductGuard — vendor-scoped authorization
 * @module product-service/interfaces/guards
 *
 * Allows:
 *  - Admin / Super Admin
 *  - Vendor whose ID matches product.vendorId
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
export class VendorProductGuard extends BaseGuard {
  constructor(
    @Inject(PRODUCT_REPOSITORY)
    private readonly repo: ProductRepository,
  ) {
    super();
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest<{
      params?: Record<string, string>;
      user?: {
        userId?: string;
        vendorId?: string;
        roles?: readonly string[];
      };
    }>();

    const productId = req.params?.['productId'] ?? req.params?.['id'];
    if (!productId) return true;

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

    if (!user.vendorId) {
      throw new ForbiddenException({
        statusCode: HTTP_STATUS.FORBIDDEN,
        message: 'Vendor context required',
      });
    }

    const product = await this.repo.findById(productId);
    if (!product) {
      throw new ForbiddenException({
        statusCode: HTTP_STATUS.FORBIDDEN,
        message: 'Product not found',
      });
    }

    if (product.vo.vendorId?.value !== user.vendorId) {
      throw new ForbiddenException({
        statusCode: HTTP_STATUS.FORBIDDEN,
        message: 'You do not own this product as a vendor',
      });
    }

    return true;
  }
}

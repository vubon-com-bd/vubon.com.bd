/**
 * OwnProductGuard — resource-level authorization
 * @module product-service/interfaces/guards
 *
 * Allows:
 *  - Admin / Super Admin (always)
 *  - Owner (vendorId or userId matches)
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
import { VendorClient } from '../../infrastructure/services/external/vendor.client.js';


@Injectable()
export class OwnProductGuard extends BaseGuard {
  constructor(
    @Inject(PRODUCT_REPOSITORY)
    private readonly repo: ProductRepository,
    private readonly vendorClient: VendorClient,
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

    const product = await this.repo.findById(productId);
    if (!product) {
      throw new ForbiddenException({
        statusCode: HTTP_STATUS.FORBIDDEN,
        message: 'Product not found',
      });
    }

    const ownerVendorId = product.vo.vendorId?.value;
    if (!ownerVendorId) {
      throw new ForbiddenException({
        statusCode: HTTP_STATUS.FORBIDDEN,
        message: 'Product has no vendor',
      });
    }

    // Resolve user's vendor profile
    const vendor = await this.vendorClient.getByUserId(user.userId);
    if (!vendor || vendor.id !== ownerVendorId) {
      throw new ForbiddenException({
        statusCode: HTTP_STATUS.FORBIDDEN,
        message: 'You do not own this product',
      });
    }

    return true;
  }
}

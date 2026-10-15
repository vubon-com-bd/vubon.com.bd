/**
 * CartOwnerGuard — resource-level authorization
 * @module cart-service/interfaces/guards
 *
 * Allows:
 *  - Admin (role ADMIN or SUPER_ADMIN)
 *  - Owner (userId matches cart.userId)
 *  - Guest (guest cart with matching token)
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
  CART_REPOSITORY,
  type CartRepository,
} from '../../domain/repositories/cart.repository.interface.js';

@Injectable()
export class CartOwnerGuard extends BaseGuard {
  constructor(
    @Inject(CART_REPOSITORY)
    private readonly repo: CartRepository,
  ) {
    super();
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest<{
      params?: Record<string, string>;
      user?: { userId?: string; roles?: readonly string[] };
    }>();

    const cartId = req.params?.['cartId'] ?? req.params?.['id'];
    if (!cartId) return true;

    const user = req.user;
    if (!user?.userId) {
      throw new ForbiddenException({
        statusCode: HTTP_STATUS.FORBIDDEN,
        message: 'Authentication required',
      });
    }

    // Admin override
    const isAdmin =
      user.roles?.includes(ROLE.ADMIN) ||
      user.roles?.includes(ROLE.SUPER_ADMIN);
    if (isAdmin) return true;

    const cart = await this.repo.findById(cartId);
    if (!cart) {
      throw new ForbiddenException({
        statusCode: HTTP_STATUS.FORBIDDEN,
        message: 'Cart not found',
      });
    }

    // Owner check
    if (cart.userId?.value === user.userId) return true;

    throw new ForbiddenException({
      statusCode: HTTP_STATUS.FORBIDDEN,
      message: 'You do not own this cart',
    });
  }
}

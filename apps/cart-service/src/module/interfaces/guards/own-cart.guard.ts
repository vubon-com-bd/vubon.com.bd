/**
 * OwnCartGuard — ensures current user owns the target cart
 * @module cart-service/interfaces/guards
 *
 * Stricter than CartOwnerGuard — no admin override, no guest.
 */
import {
  ExecutionContext,
  ForbiddenException,
  Inject,
  Injectable,
} from '@nestjs/common';
import { BaseGuard } from '@vubon/shared-kernel/interfaces/guards';
import { HTTP_STATUS } from '@vubon/shared-constants/common';
import {
  CART_REPOSITORY,
  type CartRepository,
} from '../../domain/repositories/cart.repository.interface.js';

@Injectable()
export class OwnCartGuard extends BaseGuard {
  constructor(
    @Inject(CART_REPOSITORY)
    private readonly repo: CartRepository,
  ) {
    super();
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest<{
      params?: Record<string, string>;
      user?: { userId?: string };
    }>();

    const cartId = req.params?.['cartId'] ?? req.params?.['id'];
    if (!cartId) return true;

    const userId = req.user?.userId;
    if (!userId) {
      throw new ForbiddenException({
        statusCode: HTTP_STATUS.FORBIDDEN,
        message: 'Authentication required',
      });
    }

    const cart = await this.repo.findById(cartId);
    if (!cart) {
      throw new ForbiddenException({
        statusCode: HTTP_STATUS.FORBIDDEN,
        message: 'Cart not found',
      });
    }

    if (cart.userId?.value !== userId) {
      throw new ForbiddenException({
        statusCode: HTTP_STATUS.FORBIDDEN,
        message: 'You do not own this cart',
      });
    }

    return true;
  }
}

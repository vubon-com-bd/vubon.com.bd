/**
 * OwnCartGuard — verifies caller owns the cart
 * @module cart-service/interfaces/guards
 */
import { ExecutionContext, ForbiddenException, Inject, Injectable } from '@nestjs/common';
import { BaseGuard } from '@vubon/shared-kernel/interfaces/guards';
import { HTTP_STATUS } from '@vubon/shared-constants/common';
import { CART_REPOSITORY, type CartRepository } from '../../domain/repositories/cart.repository.interface.js';

@Injectable()
export class OwnCartGuard extends BaseGuard {
  constructor(
    @Inject(CART_REPOSITORY) private readonly cartRepo: CartRepository,
  ) { super(); }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest<{
      params?: Record<string, string>;
      user?: { userId?: string; role?: string };
    }>();

    const cartId = req.params?.cartId ?? req.params?.id;
    if (!cartId) return true;

    const user = req.user;
    if (!user?.userId) {
      throw new ForbiddenException({
        statusCode: HTTP_STATUS.FORBIDDEN,
        message: 'Authentication required',
      });
    }
    if (user.role === 'admin') return true;

    const cart = await this.cartRepo.findById(cartId);
    if (!cart) {
      throw new ForbiddenException({
        statusCode: HTTP_STATUS.FORBIDDEN,
        message: 'Cart not found',
      });
    }

    if (cart.userId?.value && cart.userId.value !== user.userId) {
      throw new ForbiddenException({
        statusCode: HTTP_STATUS.FORBIDDEN,
        message: 'You do not own this cart',
      });
    }
    return true;
  }
}

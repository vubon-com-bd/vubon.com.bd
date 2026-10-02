/**
 * CartNotEmptyGuard — blocks checkout on empty carts
 * @module cart-service/interfaces/guards
 */
import { BadRequestException, ExecutionContext, Inject, Injectable } from '@nestjs/common';
import { BaseGuard } from '@vubon/shared-kernel/interfaces/guards';
import { HTTP_STATUS } from '@vubon/shared-constants/common';
import { CART_REPOSITORY, type CartRepository } from '../../domain/repositories/cart.repository.interface.js';

@Injectable()
export class CartNotEmptyGuard extends BaseGuard {
  constructor(
    @Inject(CART_REPOSITORY) private readonly cartRepo: CartRepository,
  ) { super(); }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest<{
      params?: Record<string, string>;
    }>();
    const cartId = req.params?.cartId ?? req.params?.id;
    if (!cartId) return true;

    const cart = await this.cartRepo.findById(cartId);
    if (!cart || cart.isEmpty) {
      throw new BadRequestException({
        statusCode: HTTP_STATUS.BAD_REQUEST,
        message: 'Cart is empty',
      });
    }
    return true;
  }
}

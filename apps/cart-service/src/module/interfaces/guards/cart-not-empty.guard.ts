/**
 * CartNotEmptyGuard — ensures cart has items before checkout
 * @module cart-service/interfaces/guards
 */
import {
  BadRequestException,
  ExecutionContext,
  Inject,
  Injectable,
} from '@nestjs/common';
import { BaseGuard } from '@vubon/shared-kernel/interfaces/guards';
import { ERROR_CODE, HTTP_STATUS } from '@vubon/shared-constants/common';
import {
  CART_REPOSITORY,
  type CartRepository,
} from '../../domain/repositories/cart.repository.interface.js';

@Injectable()
export class CartNotEmptyGuard extends BaseGuard {
  constructor(
    @Inject(CART_REPOSITORY)
    private readonly repo: CartRepository,
  ) {
    super();
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest<{
      params?: Record<string, string>;
    }>();

    const cartId = req.params?.['cartId'] ?? req.params?.['id'];
    if (!cartId) return true;

    const cart = await this.repo.findById(cartId);
    if (!cart) {
      throw new BadRequestException({
        statusCode: HTTP_STATUS.BAD_REQUEST,
        code: ERROR_CODE.CART_EMPTY,
        message: 'Cart not found',
      });
    }

    if (cart.isEmpty()) {
      throw new BadRequestException({
        statusCode: HTTP_STATUS.BAD_REQUEST,
        code: ERROR_CODE.CART_EMPTY,
        message: 'Cart is empty',
      });
    }

    return true;
  }
}

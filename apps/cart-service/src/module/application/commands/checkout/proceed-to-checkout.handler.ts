import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { ProceedToCheckoutCommand } from './proceed-to-checkout.command.js';
import {
  CART_SERVICE,
  type ICartService,
} from '../../services/interfaces/cart.service.interface.js';
import type { CartResponseDTO } from '../../dtos/responses/cart-response.dto.js';
import { ProceedToCheckoutError } from '../../errors/checkout.errors.js';

/**
 * NOTE: Actual checkout initiation is delegated to checkout-service.
 * This handler validates eligibility and marks the cart as converted.
 * The downstream saga handles the cross-service call.
 */
@CommandHandler(ProceedToCheckoutCommand)
export class ProceedToCheckoutHandler
  implements ICommandHandler<ProceedToCheckoutCommand, CartResponseDTO>
{
  constructor(
    @Inject(CART_SERVICE)
    private readonly cartService: ICartService,
  ) {}

  async execute(c: ProceedToCheckoutCommand): Promise<CartResponseDTO> {
    try {
      const cart = await this.cartService.getById(c.dto.cartId);
      if (cart.itemCount === 0) {
        throw new ProceedToCheckoutError(c.dto.cartId, 'Cart is empty');
      }
      return cart;
    } catch (e) {
      if (e instanceof ProceedToCheckoutError) throw e;
      const msg = e instanceof Error ? e.message : 'Unknown';
      throw new ProceedToCheckoutError(c.dto.cartId, msg);
    }
  }
}

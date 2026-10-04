import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { ProceedToCheckoutCommand } from './proceed-to-checkout.command.js';
import { CART_SERVICE, type ICartService } from '../../services/interfaces/cart.service.interface.js';
import type { CartResponseDTO } from '../../dtos/responses/cart-response.dto.js';

@CommandHandler(ProceedToCheckoutCommand)
export class ProceedToCheckoutHandler implements ICommandHandler<ProceedToCheckoutCommand, CartResponseDTO> {
  constructor(@Inject(CART_SERVICE) private readonly service: ICartService) {}
  async execute(c: ProceedToCheckoutCommand): Promise<CartResponseDTO> {
    return this.service.getById(c.dto.cartId);
  }
}

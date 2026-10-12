import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { InitiateCartCheckoutCommand } from './initiate-checkout.command.js';
import { CART_SERVICE, type ICartService } from '../../services/interfaces/cart.service.interface.js';
import type { CartResponseDTO } from '../../dtos/responses/cart-response.dto.js';

@CommandHandler(InitiateCartCheckoutCommand)
export class InitiateCartCheckoutHandler implements ICommandHandler<InitiateCartCheckoutCommand, CartResponseDTO> {
  constructor(@Inject(CART_SERVICE) private readonly service: ICartService) {}
  async execute(c: InitiateCartCheckoutCommand): Promise<CartResponseDTO> {
    return this.service.initiateCheckout(c.dto, c.actorId);
  }
}

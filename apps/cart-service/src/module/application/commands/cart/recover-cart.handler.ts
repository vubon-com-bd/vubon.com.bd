import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { RecoverCartCommand } from './recover-cart.command.js';
import { CART_SERVICE, type ICartService } from '../../services/interfaces/cart.service.interface.js';
import type { CartResponseDTO } from '../../dtos/responses/cart-response.dto.js';

@CommandHandler(RecoverCartCommand)
export class RecoverCartHandler implements ICommandHandler<RecoverCartCommand, CartResponseDTO> {
  constructor(@Inject(CART_SERVICE) private readonly service: ICartService) {}
  async execute(c: RecoverCartCommand): Promise<CartResponseDTO> {
    // Recover = fetch cart; real recovery in saga
    return this.service.getById(c.dto.cartId);
  }
}

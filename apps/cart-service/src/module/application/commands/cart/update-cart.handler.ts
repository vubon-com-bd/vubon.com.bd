import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { UpdateCartCommand } from './update-cart.command.js';
import { CART_SERVICE, type ICartService } from '../../services/interfaces/cart.service.interface.js';
import type { CartResponseDTO } from '../../dtos/responses/cart-response.dto.js';

@CommandHandler(UpdateCartCommand)
export class UpdateCartHandler implements ICommandHandler<UpdateCartCommand, CartResponseDTO> {
  constructor(@Inject(CART_SERVICE) private readonly service: ICartService) {}
  async execute(c: UpdateCartCommand): Promise<CartResponseDTO> {
    return this.service.update(c.dto, c.cartId);
  }
}

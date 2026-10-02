import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { CreateCartCommand } from './create-cart.command.js';
import { CART_SERVICE, type ICartService } from '../../services/interfaces/cart.service.interface.js';
import type { CartResponseDTO } from '../../dtos/responses/cart-response.dto.js';

@CommandHandler(CreateCartCommand)
export class CreateCartHandler implements ICommandHandler<CreateCartCommand, CartResponseDTO> {
  constructor(@Inject(CART_SERVICE) private readonly service: ICartService) {}
  async execute(c: CreateCartCommand): Promise<CartResponseDTO> {
    return this.service.create(c.dto, c.actorId);
  }
}

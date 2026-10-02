import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { ClearCartCommand } from './clear-cart.command.js';
import { CART_SERVICE, type ICartService } from '../../services/interfaces/cart.service.interface.js';
import type { CartResponseDTO } from '../../dtos/responses/cart-response.dto.js';

@CommandHandler(ClearCartCommand)
export class ClearCartHandler implements ICommandHandler<ClearCartCommand, CartResponseDTO> {
  constructor(@Inject(CART_SERVICE) private readonly service: ICartService) {}
  async execute(c: ClearCartCommand): Promise<CartResponseDTO> {
    return this.service.clear(c.dto);
  }
}

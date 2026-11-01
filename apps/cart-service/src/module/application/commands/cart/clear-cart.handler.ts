import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { ClearCartCommand } from './clear-cart.command.js';
import {
  CART_SERVICE,
  type ICartService,
} from '../../services/interfaces/cart.service.interface.js';
import type { CartActionResponseDTO } from '../../dtos/responses/cart-response.dto.js';

@CommandHandler(ClearCartCommand)
export class ClearCartHandler
  implements ICommandHandler<ClearCartCommand, CartActionResponseDTO>
{
  constructor(
    @Inject(CART_SERVICE)
    private readonly service: ICartService,
  ) {}

  async execute(c: ClearCartCommand): Promise<CartActionResponseDTO> {
    return this.service.clear(c.dto, c.actorId);
  }
}

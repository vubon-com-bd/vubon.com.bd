import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { DeleteCartCommand } from './delete-cart.command.js';
import {
  CART_SERVICE,
  type ICartService,
} from '../../services/interfaces/cart.service.interface.js';
import type { CartActionResponseDTO } from '../../dtos/responses/cart-response.dto.js';

@CommandHandler(DeleteCartCommand)
export class DeleteCartHandler
  implements ICommandHandler<DeleteCartCommand, CartActionResponseDTO>
{
  constructor(
    @Inject(CART_SERVICE)
    private readonly service: ICartService,
  ) {}

  async execute(c: DeleteCartCommand): Promise<CartActionResponseDTO> {
    return this.service.delete(c.dto, c.actorId);
  }
}

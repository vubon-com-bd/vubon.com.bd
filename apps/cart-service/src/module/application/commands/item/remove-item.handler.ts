import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { RemoveItemCommand } from './remove-item.command.js';
import {
  CART_ITEM_SERVICE,
  type ICartItemService,
} from '../../services/interfaces/cart-item.service.interface.js';
import type { CartActionResponseDTO } from '../../dtos/responses/cart-response.dto.js';

@CommandHandler(RemoveItemCommand)
export class RemoveItemHandler
  implements ICommandHandler<RemoveItemCommand, CartActionResponseDTO>
{
  constructor(
    @Inject(CART_ITEM_SERVICE)
    private readonly service: ICartItemService,
  ) {}

  async execute(c: RemoveItemCommand): Promise<CartActionResponseDTO> {
    return this.service.remove(c.dto, c.actorId);
  }
}

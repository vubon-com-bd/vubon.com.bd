import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { UpdateQuantityCommand } from './update-quantity.command.js';
import {
  CART_ITEM_SERVICE,
  type ICartItemService,
} from '../../services/interfaces/cart-item.service.interface.js';
import type { CartItemResponseDTO } from '../../dtos/responses/cart-item-response.dto.js';

@CommandHandler(UpdateQuantityCommand)
export class UpdateQuantityHandler
  implements ICommandHandler<UpdateQuantityCommand, CartItemResponseDTO>
{
  constructor(
    @Inject(CART_ITEM_SERVICE)
    private readonly service: ICartItemService,
  ) {}

  async execute(c: UpdateQuantityCommand): Promise<CartItemResponseDTO> {
    return this.service.updateQuantity(c.dto, c.actorId);
  }
}

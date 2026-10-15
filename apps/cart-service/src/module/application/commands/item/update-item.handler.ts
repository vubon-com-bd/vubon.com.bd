import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { UpdateItemCommand } from './update-item.command.js';
import {
  CART_ITEM_SERVICE,
  type ICartItemService,
} from '../../services/interfaces/cart-item.service.interface.js';
import type { CartItemResponseDTO } from '../../dtos/responses/cart-item-response.dto.js';

@CommandHandler(UpdateItemCommand)
export class UpdateItemHandler
  implements ICommandHandler<UpdateItemCommand, CartItemResponseDTO>
{
  constructor(
    @Inject(CART_ITEM_SERVICE)
    private readonly service: ICartItemService,
  ) {}

  async execute(c: UpdateItemCommand): Promise<CartItemResponseDTO> {
    return this.service.update(c.dto, c.actorId);
  }
}

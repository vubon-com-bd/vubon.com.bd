import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { AddItemCommand } from './add-item.command.js';
import { CART_ITEM_SERVICE, type ICartItemService } from '../../services/interfaces/cart-item.service.interface.js';
import type { CartResponseDTO } from '../../dtos/responses/cart-response.dto.js';

@CommandHandler(AddItemCommand)
export class AddItemHandler implements ICommandHandler<AddItemCommand, CartResponseDTO> {
  constructor(@Inject(CART_ITEM_SERVICE) private readonly service: ICartItemService) {}
  async execute(c: AddItemCommand): Promise<CartResponseDTO> {
    return this.service.add(c.dto);
  }
}

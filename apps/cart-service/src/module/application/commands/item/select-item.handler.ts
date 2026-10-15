import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { SelectItemCommand } from './select-item.command.js';
import {
  CART_ITEM_SERVICE,
  type ICartItemService,
} from '../../services/interfaces/cart-item.service.interface.js';
import type { CartActionResponseDTO } from '../../dtos/responses/cart-response.dto.js';

@CommandHandler(SelectItemCommand)
export class SelectItemHandler
  implements ICommandHandler<SelectItemCommand, CartActionResponseDTO>
{
  constructor(
    @Inject(CART_ITEM_SERVICE)
    private readonly service: ICartItemService,
  ) {}

  async execute(c: SelectItemCommand): Promise<CartActionResponseDTO> {
    return this.service.select(c.dto, c.actorId);
  }
}

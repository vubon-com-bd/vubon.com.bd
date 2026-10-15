import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { MoveToSavedCommand } from './move-to-saved.command.js';
import {
  CART_ITEM_SERVICE,
  type ICartItemService,
} from '../../services/interfaces/cart-item.service.interface.js';
import type { CartActionResponseDTO } from '../../dtos/responses/cart-response.dto.js';

@CommandHandler(MoveToSavedCommand)
export class MoveToSavedHandler
  implements ICommandHandler<MoveToSavedCommand, CartActionResponseDTO>
{
  constructor(
    @Inject(CART_ITEM_SERVICE)
    private readonly service: ICartItemService,
  ) {}

  async execute(c: MoveToSavedCommand): Promise<CartActionResponseDTO> {
    return this.service.moveToSaved(c.dto, c.actorId);
  }
}

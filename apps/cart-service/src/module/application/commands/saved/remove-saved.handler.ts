import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { RemoveSavedCommand } from './remove-saved.command.js';
import {
  SAVED_FOR_LATER_SERVICE,
  type ISavedForLaterService,
} from '../../services/interfaces/saved-for-later.service.interface.js';
import type { CartActionResponseDTO } from '../../dtos/responses/cart-response.dto.js';

@CommandHandler(RemoveSavedCommand)
export class RemoveSavedHandler
  implements ICommandHandler<RemoveSavedCommand, CartActionResponseDTO>
{
  constructor(
    @Inject(SAVED_FOR_LATER_SERVICE)
    private readonly service: ISavedForLaterService,
  ) {}

  async execute(c: RemoveSavedCommand): Promise<CartActionResponseDTO> {
    return this.service.remove(c.dto, c.actorId);
  }
}

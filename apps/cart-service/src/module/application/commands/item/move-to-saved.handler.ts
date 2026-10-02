import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { MoveToSavedCommand } from './move-to-saved.command.js';
import {
  SAVED_FOR_LATER_SERVICE,
  type ISavedForLaterService,
} from '../../services/interfaces/saved-for-later.service.interface.js';
import type { SavedForLaterResponseDTO } from '../../dtos/responses/saved-for-later-response.dto.js';

@CommandHandler(MoveToSavedCommand)
export class MoveToSavedHandler implements ICommandHandler<MoveToSavedCommand, SavedForLaterResponseDTO> {
  constructor(@Inject(SAVED_FOR_LATER_SERVICE) private readonly service: ISavedForLaterService) {}
  async execute(c: MoveToSavedCommand): Promise<SavedForLaterResponseDTO> {
    return this.service.save({
      cartId: c.dto.cartId,
      itemId: c.dto.itemId,
      userId: c.dto.userId,
    });
  }
}

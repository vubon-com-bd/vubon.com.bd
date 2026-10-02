import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { SaveForLaterCommand } from './save-for-later.command.js';
import { SAVED_FOR_LATER_SERVICE, type ISavedForLaterService } from '../../services/interfaces/saved-for-later.service.interface.js';
import type { SavedForLaterResponseDTO } from '../../dtos/responses/saved-for-later-response.dto.js';

@CommandHandler(SaveForLaterCommand)
export class SaveForLaterHandler implements ICommandHandler<SaveForLaterCommand, SavedForLaterResponseDTO> {
  constructor(@Inject(SAVED_FOR_LATER_SERVICE) private readonly service: ISavedForLaterService) {}
  async execute(c: SaveForLaterCommand): Promise<SavedForLaterResponseDTO> {
    return this.service.save(c.dto);
  }
}

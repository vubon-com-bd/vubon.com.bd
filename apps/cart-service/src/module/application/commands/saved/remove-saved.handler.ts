import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { RemoveSavedCommand } from './remove-saved.command.js';
import { SAVED_FOR_LATER_SERVICE, type ISavedForLaterService } from '../../services/interfaces/saved-for-later.service.interface.js';

@CommandHandler(RemoveSavedCommand)
export class RemoveSavedHandler implements ICommandHandler<RemoveSavedCommand, void> {
  constructor(@Inject(SAVED_FOR_LATER_SERVICE) private readonly service: ISavedForLaterService) {}
  async execute(c: RemoveSavedCommand): Promise<void> {
    return this.service.remove(c.dto);
  }
}

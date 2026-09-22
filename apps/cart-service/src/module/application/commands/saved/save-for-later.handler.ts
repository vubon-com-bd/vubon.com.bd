import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { SaveForLaterCommand } from './save-for-later.command';
import type { SavedForLaterRepository } from '../../../domain/repositories/saved-for-later.repository.interface';
import { CartOperationFailedError } from '../../errors/cart.errors';

@CommandHandler(SaveForLaterCommand)
export class SaveForLaterHandler
  extends BaseCommandHandler<SaveForLaterCommand, void>
  implements ICommandHandler<SaveForLaterCommand>
{
  readonly commandType = 'cart.saved.save';

  constructor(
    @Inject('SavedForLaterRepository')
    private readonly savedRepo: SavedForLaterRepository,
    private readonly eventBus: EventBus,
  ) {
    super();
  }

  async execute(command: SaveForLaterCommand): Promise<void> {
    void this.savedRepo;
    void this.eventBus;
    void command;
    throw new CartOperationFailedError('not yet wired');
  }
}

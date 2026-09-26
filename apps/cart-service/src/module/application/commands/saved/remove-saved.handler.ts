import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { RemoveSavedCommand } from './remove-saved.command';
import type { SavedForLaterRepository } from '../../../domain/repositories/saved-for-later.repository.interface';
import { SavedItemIdVO } from '../../../domain/value-objects/primitives/saved-item-id.vo';

@CommandHandler(RemoveSavedCommand)
export class RemoveSavedHandler
  extends BaseCommandHandler<RemoveSavedCommand, void>
  implements ICommandHandler<RemoveSavedCommand>
{
  readonly commandType = 'cart.saved.remove';

  constructor(
    @Inject('SavedForLaterRepository')
    private readonly savedRepo: SavedForLaterRepository,
  ) {
    super();
  }

  async execute(command: RemoveSavedCommand): Promise<void> {
    await this.savedRepo.delete(SavedItemIdVO.create(command.savedItemId));
  }
}

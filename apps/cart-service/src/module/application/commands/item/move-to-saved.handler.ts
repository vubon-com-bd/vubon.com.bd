import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { MoveToSavedCommand } from './move-to-saved.command';
import type { CartItemRepository } from '../../../domain/repositories/cart-item.repository.interface';
import type { SavedForLaterRepository } from '../../../domain/repositories/saved-for-later.repository.interface';
import { CartItemIdVO } from '../../../domain/value-objects/primitives/cart-item-id.vo';
import { CartItemOperationFailedError } from '../../errors/cart-item.errors';

@CommandHandler(MoveToSavedCommand)
export class MoveToSavedHandler
  extends BaseCommandHandler<MoveToSavedCommand, void>
  implements ICommandHandler<MoveToSavedCommand>
{
  readonly commandType = 'cart.item.move_to_saved';

  constructor(
    @Inject('CartItemRepository')
    private readonly itemRepo: CartItemRepository,
    @Inject('SavedForLaterRepository')
    private readonly savedRepo: SavedForLaterRepository,
    private readonly eventBus: EventBus,
  ) {
    super();
  }

  async execute(command: MoveToSavedCommand): Promise<void> {
    const item = await this.itemRepo.findById(CartItemIdVO.create(command.itemId));
    if (!item) {
      throw new CartItemOperationFailedError('item not found');
    }
    void this.savedRepo;
    void this.eventBus;
    throw new CartItemOperationFailedError('not yet wired');
  }
}

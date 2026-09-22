import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { MoveToCartCommand } from './move-to-cart.command';
import type { SavedForLaterRepository } from '../../../domain/repositories/saved-for-later.repository.interface';
import { SavedItemIdVO } from '../../../domain/value-objects/primitives/saved-item-id.vo';
import { CartOperationFailedError } from '../../errors/cart.errors';

@CommandHandler(MoveToCartCommand)
export class MoveToCartHandler
  extends BaseCommandHandler<MoveToCartCommand, void>
  implements ICommandHandler<MoveToCartCommand>
{
  readonly commandType = 'cart.saved.move_to_cart';

  constructor(
    @Inject('SavedForLaterRepository')
    private readonly savedRepo: SavedForLaterRepository,
    private readonly eventBus: EventBus,
  ) {
    super();
  }

  async execute(command: MoveToCartCommand): Promise<void> {
    const saved = await this.savedRepo.findById(
      SavedItemIdVO.create(command.savedItemId),
    );
    if (!saved) {
      throw new CartOperationFailedError('saved item not found');
    }
    const moved = saved.moveToCart();
    await this.savedRepo.save(moved);
    const events = moved.pullDomainEvents();
    for (const event of events) {
      this.eventBus.publish(event as never);
    }
  }
}

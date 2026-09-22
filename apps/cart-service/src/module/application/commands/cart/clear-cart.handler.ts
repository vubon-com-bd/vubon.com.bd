import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { ClearCartCommand } from './clear-cart.command';
import type { CartRepository } from '../../../domain/repositories/cart.repository.interface';
import { CartIdVO } from '../../../domain/value-objects/primitives/cart-id.vo';
import { CartOperationFailedError } from '../../errors/cart.errors';

@CommandHandler(ClearCartCommand)
export class ClearCartHandler
  extends BaseCommandHandler<ClearCartCommand, void>
  implements ICommandHandler<ClearCartCommand>
{
  readonly commandType = 'cart.clear';

  constructor(
    @Inject('CartRepository')
    private readonly cartRepo: CartRepository,
    private readonly eventBus: EventBus,
  ) {
    super();
  }

  async execute(command: ClearCartCommand): Promise<void> {
    const entity = await this.cartRepo.findById(CartIdVO.create(command.cartId));
    if (!entity) {
      throw new CartOperationFailedError('cart not found');
    }
    const cleared = entity.clear();
    await this.cartRepo.save(cleared);
    const events = cleared.pullDomainEvents();
    for (const event of events) {
      this.eventBus.publish(event as never);
    }
  }
}

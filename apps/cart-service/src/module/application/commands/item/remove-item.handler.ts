import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { RemoveItemCommand } from './remove-item.command';
import type { CartRepository } from '../../../domain/repositories/cart.repository.interface';
import { CartIdVO } from '../../../domain/value-objects/primitives/cart-id.vo';
import { CartItemOperationFailedError } from '../../errors/cart-item.errors';

@CommandHandler(RemoveItemCommand)
export class RemoveItemHandler
  extends BaseCommandHandler<RemoveItemCommand, void>
  implements ICommandHandler<RemoveItemCommand>
{
  readonly commandType = 'cart.item.remove';

  constructor(
    @Inject('CartRepository')
    private readonly cartRepo: CartRepository,
    private readonly eventBus: EventBus,
  ) {
    super();
  }

  async execute(command: RemoveItemCommand): Promise<void> {
    const cart = await this.cartRepo.findById(CartIdVO.create(command.cartId));
    if (!cart) {
      throw new CartItemOperationFailedError('cart not found');
    }
    void this.eventBus;
    throw new CartItemOperationFailedError('not yet wired');
  }
}

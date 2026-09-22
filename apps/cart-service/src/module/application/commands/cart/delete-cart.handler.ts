import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { DeleteCartCommand } from './delete-cart.command';
import type { CartRepository } from '../../../domain/repositories/cart.repository.interface';
import { CartIdVO } from '../../../domain/value-objects/primitives/cart-id.vo';
import { CartOperationFailedError } from '../../errors/cart.errors';

@CommandHandler(DeleteCartCommand)
export class DeleteCartHandler
  extends BaseCommandHandler<DeleteCartCommand, void>
  implements ICommandHandler<DeleteCartCommand>
{
  readonly commandType = 'cart.delete';

  constructor(
    @Inject('CartRepository')
    private readonly cartRepo: CartRepository,
    private readonly eventBus: EventBus,
  ) {
    super();
  }

  async execute(command: DeleteCartCommand): Promise<void> {
    const existing = await this.cartRepo.findById(CartIdVO.create(command.cartId));
    if (!existing) {
      throw new CartOperationFailedError('cart not found');
    }
    await this.cartRepo.delete(CartIdVO.create(command.cartId));
    void this.eventBus;
  }
}

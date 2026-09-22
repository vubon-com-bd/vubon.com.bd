import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { SetShippingMethodCommand } from './set-shipping-method.command';
import type { CartShippingRepository } from '../../../domain/repositories/cart-shipping.repository.interface';
import { CartIdVO } from '../../../domain/value-objects/primitives/cart-id.vo';
import { CartOperationFailedError } from '../../errors/cart.errors';

@CommandHandler(SetShippingMethodCommand)
export class SetShippingMethodHandler
  extends BaseCommandHandler<SetShippingMethodCommand, void>
  implements ICommandHandler<SetShippingMethodCommand>
{
  readonly commandType = 'cart.shipping.set';

  constructor(
    @Inject('CartShippingRepository')
    private readonly shippingRepo: CartShippingRepository,
    private readonly eventBus: EventBus,
  ) {
    super();
  }

  async execute(command: SetShippingMethodCommand): Promise<void> {
    const existing = await this.shippingRepo.findByCartId(
      CartIdVO.create(command.cartId),
    );
    if (!existing) {
      throw new CartOperationFailedError('shipping record not found');
    }
    void this.eventBus;
    throw new CartOperationFailedError('not yet wired');
  }
}

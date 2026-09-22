import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { ProceedToCheckoutCommand } from './proceed-to-checkout.command';
import type { CartRepository } from '../../../domain/repositories/cart.repository.interface';
import { CartIdVO } from '../../../domain/value-objects/primitives/cart-id.vo';
import { CanCheckoutSpecification } from '../../../domain/specifications/can-checkout.specification';
import { CheckoutFailedError } from '../../errors/checkout.errors';

@CommandHandler(ProceedToCheckoutCommand)
export class ProceedToCheckoutHandler
  extends BaseCommandHandler<ProceedToCheckoutCommand, void>
  implements ICommandHandler<ProceedToCheckoutCommand>
{
  readonly commandType = 'cart.checkout.proceed';

  constructor(
    @Inject('CartRepository')
    private readonly cartRepo: CartRepository,
    private readonly eventBus: EventBus,
  ) {
    super();
  }

  async execute(command: ProceedToCheckoutCommand): Promise<void> {
    const cart = await this.cartRepo.findById(CartIdVO.create(command.cartId));
    if (!cart) {
      throw new CheckoutFailedError('cart not found');
    }
    const spec = new CanCheckoutSpecification();
    if (!spec.isSatisfiedBy(cart)) {
      throw new CheckoutFailedError('cart is not eligible for checkout');
    }
    void this.eventBus;
    throw new CheckoutFailedError('not yet wired');
  }
}

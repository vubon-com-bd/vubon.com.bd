import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { RemoveCouponCommand } from './remove-coupon.command';
import type { CartCouponRepository } from '../../../domain/repositories/cart-coupon.repository.interface';
import { CartIdVO } from '../../../domain/value-objects/primitives/cart-id.vo';
import { CouponOperationFailedError } from '../../errors/coupon.errors';

@CommandHandler(RemoveCouponCommand)
export class RemoveCouponHandler
  extends BaseCommandHandler<RemoveCouponCommand, void>
  implements ICommandHandler<RemoveCouponCommand>
{
  readonly commandType = 'cart.coupon.remove';

  constructor(
    @Inject('CartCouponRepository')
    private readonly couponRepo: CartCouponRepository,
    private readonly eventBus: EventBus,
  ) {
    super();
  }

  async execute(command: RemoveCouponCommand): Promise<void> {
    const existing = await this.couponRepo.findByCartId(CartIdVO.create(command.cartId));
    if (!existing) {
      throw new CouponOperationFailedError('coupon not found');
    }
    const removed = existing.remove();
    await this.couponRepo.save(removed);
    const events = removed.pullDomainEvents();
    for (const event of events) {
      this.eventBus.publish(event as never);
    }
  }
}

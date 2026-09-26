import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { ApplyCouponCommand } from './apply-coupon.command';
import type { CartRepository } from '../../../domain/repositories/cart.repository.interface';
import { CartIdVO } from '../../../domain/value-objects/primitives/cart-id.vo';
import type { CartResponseDTO } from '../../dtos/responses/cart-response.dto';
import { CouponOperationFailedError } from '../../errors/coupon.errors';

@CommandHandler(ApplyCouponCommand)
export class ApplyCouponHandler
  extends BaseCommandHandler<ApplyCouponCommand, CartResponseDTO>
  implements ICommandHandler<ApplyCouponCommand>
{
  readonly commandType = 'cart.coupon.apply';

  constructor(
    @Inject('CartRepository')
    private readonly cartRepo: CartRepository,
    private readonly eventBus: EventBus,
  ) {
    super();
  }

  async execute(command: ApplyCouponCommand): Promise<CartResponseDTO> {
    const cart = await this.cartRepo.findById(CartIdVO.create(command.cartId));
    if (!cart) {
      throw new CouponOperationFailedError('cart not found');
    }
    void this.eventBus;
    throw new CouponOperationFailedError('not yet wired');
  }
}

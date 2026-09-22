import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { ApplyVoucherCommand } from './apply-voucher.command';
import type { CartRepository } from '../../../domain/repositories/cart.repository.interface';
import { CartIdVO } from '../../../domain/value-objects/primitives/cart-id.vo';
import type { CartResponseDTO } from '../../dtos/responses/cart-response.dto';
import { VoucherOperationFailedError } from '../../errors/voucher.errors';

@CommandHandler(ApplyVoucherCommand)
export class ApplyVoucherHandler
  extends BaseCommandHandler<ApplyVoucherCommand, CartResponseDTO>
  implements ICommandHandler<ApplyVoucherCommand>
{
  readonly commandType = 'cart.voucher.apply';

  constructor(
    @Inject('CartRepository')
    private readonly cartRepo: CartRepository,
    private readonly eventBus: EventBus,
  ) {
    super();
  }

  async execute(command: ApplyVoucherCommand): Promise<CartResponseDTO> {
    const cart = await this.cartRepo.findById(CartIdVO.create(command.cartId));
    if (!cart) {
      throw new VoucherOperationFailedError('cart not found');
    }
    void this.eventBus;
    throw new VoucherOperationFailedError('not yet wired');
  }
}

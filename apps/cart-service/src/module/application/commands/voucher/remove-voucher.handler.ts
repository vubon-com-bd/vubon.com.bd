import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { RemoveVoucherCommand } from './remove-voucher.command';
import type { CartVoucherRepository } from '../../../domain/repositories/cart-voucher.repository.interface';
import { CartIdVO } from '../../../domain/value-objects/primitives/cart-id.vo';
import { VoucherOperationFailedError } from '../../errors/voucher.errors';

@CommandHandler(RemoveVoucherCommand)
export class RemoveVoucherHandler
  extends BaseCommandHandler<RemoveVoucherCommand, void>
  implements ICommandHandler<RemoveVoucherCommand>
{
  readonly commandType = 'cart.voucher.remove';

  constructor(
    @Inject('CartVoucherRepository')
    private readonly voucherRepo: CartVoucherRepository,
    private readonly eventBus: EventBus,
  ) {
    super();
  }

  async execute(command: RemoveVoucherCommand): Promise<void> {
    const existing = await this.voucherRepo.findByCartId(CartIdVO.create(command.cartId));
    if (!existing) {
      throw new VoucherOperationFailedError('voucher not found');
    }
    const removed = existing.remove();
    await this.voucherRepo.save(removed);
    const events = removed.pullDomainEvents();
    for (const event of events) {
      this.eventBus.publish(event as never);
    }
  }
}

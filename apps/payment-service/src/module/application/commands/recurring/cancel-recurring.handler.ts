import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { CancelRecurringCommand } from './cancel-recurring.command';
import type { RecurringPaymentRepository } from '../../../domain/repositories/recurring-payment.repository.interface';
import { RecurringIdVO } from '../../../domain/value-objects/primitives/recurring-id.vo';
import type { RecurringResponseDTO } from '../../dtos/responses/recurring-response.dto';
import { PaymentOperationFailedError } from '../../errors/payment.errors';

@CommandHandler(CancelRecurringCommand)
export class CancelRecurringHandler
  extends BaseCommandHandler<CancelRecurringCommand, RecurringResponseDTO>
  implements ICommandHandler<CancelRecurringCommand>
{
  readonly commandType = 'recurring.cancel';

  constructor(
    @Inject('RecurringPaymentRepository')
    private readonly recurringRepo: RecurringPaymentRepository,
    private readonly eventBus: EventBus,
  ) {
    super();
  }

  async execute(command: CancelRecurringCommand): Promise<RecurringResponseDTO> {
    const entity = await this.recurringRepo.findById(
      RecurringIdVO.create(command.recurringId),
    );
    if (!entity) {
      throw new PaymentOperationFailedError('recurring not found');
    }
    const updated = entity.cancel();
    await this.recurringRepo.save(updated);
    return {
      id: updated.id.value,
      paymentId: updated.paymentId.value,
      frequency: updated.frequency.value,
      status: updated.status.value,
      amount: updated.amount.amount,
      currency: updated.currency.value,
      nextRunAt: updated.nextRunAt.toISOString(),
      lastRunAt: updated.lastRunAt?.toISOString(),
      completedCycles: updated.completedCycles,
      createdAt: updated.createdAt,
    };
  }
}

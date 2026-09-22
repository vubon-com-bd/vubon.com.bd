import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { PauseRecurringCommand } from './pause-recurring.command';
import type { RecurringPaymentRepository } from '../../../domain/repositories/recurring-payment.repository.interface';
import { RecurringIdVO } from '../../../domain/value-objects/primitives/recurring-id.vo';
import type { RecurringResponseDTO } from '../../dtos/responses/recurring-response.dto';
import { PaymentOperationFailedError } from '../../errors/payment.errors';

@CommandHandler(PauseRecurringCommand)
export class PauseRecurringHandler
  extends BaseCommandHandler<PauseRecurringCommand, RecurringResponseDTO>
  implements ICommandHandler<PauseRecurringCommand>
{
  readonly commandType = 'recurring.pause';

  constructor(
    @Inject('RecurringPaymentRepository')
    private readonly recurringRepo: RecurringPaymentRepository,
    private readonly eventBus: EventBus,
  ) {
    super();
  }

  async execute(command: PauseRecurringCommand): Promise<RecurringResponseDTO> {
    const entity = await this.recurringRepo.findById(
      RecurringIdVO.create(command.recurringId),
    );
    if (!entity) {
      throw new PaymentOperationFailedError('recurring not found');
    }
    const updated = entity.pause();
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

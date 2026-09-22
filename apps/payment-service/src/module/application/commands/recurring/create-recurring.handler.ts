import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { CreateRecurringCommand } from './create-recurring.command';
import type { RecurringPaymentRepository } from '../../../domain/repositories/recurring-payment.repository.interface';
import { RecurringScheduleService } from '../../../domain/services/recurring-schedule.service';
import type { RecurringResponseDTO } from '../../dtos/responses/recurring-response.dto';
import { PaymentOperationFailedError } from '../../errors/payment.errors';

@CommandHandler(CreateRecurringCommand)
export class CreateRecurringHandler
  extends BaseCommandHandler<CreateRecurringCommand, RecurringResponseDTO>
  implements ICommandHandler<CreateRecurringCommand>
{
  readonly commandType = 'recurring.create';

  constructor(
    @Inject('RecurringPaymentRepository')
    private readonly recurringRepo: RecurringPaymentRepository,
    private readonly scheduleService: RecurringScheduleService,
    private readonly eventBus: EventBus,
  ) {
    super();
  }

  async execute(command: CreateRecurringCommand): Promise<RecurringResponseDTO> {
    void this.recurringRepo;
    void this.scheduleService;
    void command;
    throw new PaymentOperationFailedError('not yet wired');
  }
}

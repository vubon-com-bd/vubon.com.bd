/**
 * CancelRecurringHandler
 * @module payment-service/application/commands/recurring
 */
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { CancelRecurringCommand } from './cancel-recurring.command.js';
import {
  RECURRING_PAYMENT_SERVICE,
  type IRecurringPaymentService,
} from '@application/services/interfaces/recurring-payment.service.interface.js';
import type { RecurringResponseDTO } from '@application/dtos/responses/recurring-response.dto.js';

@CommandHandler(CancelRecurringCommand)
export class CancelRecurringHandler
  implements ICommandHandler<CancelRecurringCommand, RecurringResponseDTO>
{
  constructor(
    @Inject(RECURRING_PAYMENT_SERVICE)
    private readonly service: IRecurringPaymentService,
  ) {}
  async execute(c: CancelRecurringCommand): Promise<RecurringResponseDTO> {
    return this.service.cancel(c.dto, c.actorId);
  }
}

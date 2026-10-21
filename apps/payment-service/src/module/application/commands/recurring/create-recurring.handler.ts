/**
 * CreateRecurringHandler
 * @module payment-service/application/commands/recurring
 */
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { CreateRecurringCommand } from './create-recurring.command.js';
import {
  RECURRING_PAYMENT_SERVICE,
  type IRecurringPaymentService,
} from '@application/services/interfaces/recurring-payment.service.interface.js';
import type { RecurringResponseDTO } from '@application/dtos/responses/recurring-response.dto.js';

@CommandHandler(CreateRecurringCommand)
export class CreateRecurringHandler
  implements ICommandHandler<CreateRecurringCommand, RecurringResponseDTO>
{
  constructor(
    @Inject(RECURRING_PAYMENT_SERVICE)
    private readonly service: IRecurringPaymentService,
  ) {}
  async execute(c: CreateRecurringCommand): Promise<RecurringResponseDTO> {
    return this.service.create(c.dto, c.userId);
  }
}

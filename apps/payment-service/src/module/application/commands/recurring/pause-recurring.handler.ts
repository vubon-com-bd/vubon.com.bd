/**
 * PauseRecurringHandler
 * @module payment-service/application/commands/recurring
 */
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { PauseRecurringCommand } from './pause-recurring.command.js';
import {
  RECURRING_PAYMENT_SERVICE,
  type IRecurringPaymentService,
} from '@application/services/interfaces/recurring-payment.service.interface.js';
import type { RecurringResponseDTO } from '@application/dtos/responses/recurring-response.dto.js';

@CommandHandler(PauseRecurringCommand)
export class PauseRecurringHandler
  implements ICommandHandler<PauseRecurringCommand, RecurringResponseDTO>
{
  constructor(
    @Inject(RECURRING_PAYMENT_SERVICE)
    private readonly service: IRecurringPaymentService,
  ) {}
  async execute(c: PauseRecurringCommand): Promise<RecurringResponseDTO> {
    return this.service.pause(c.dto, c.actorId);
  }
}

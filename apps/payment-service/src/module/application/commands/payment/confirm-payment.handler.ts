/**
 * ConfirmPaymentHandler
 * @module payment-service/application/commands/payment
 */
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';

import { ConfirmPaymentCommand } from './confirm-payment.command.js';
import {
  PAYMENT_SERVICE,
  type IPaymentService,
} from '@application/services/interfaces/payment.service.interface.js';
import type { PaymentResponseDTO } from '@application/dtos/responses/payment-response.dto.js';

@CommandHandler(ConfirmPaymentCommand)
export class ConfirmPaymentHandler
  implements ICommandHandler<ConfirmPaymentCommand, PaymentResponseDTO>
{
  constructor(
    @Inject(PAYMENT_SERVICE)
    private readonly service: IPaymentService,
  ) {}

  async execute(c: ConfirmPaymentCommand): Promise<PaymentResponseDTO> {
    return this.service.confirm(c.dto, c.actorId);
  }
}

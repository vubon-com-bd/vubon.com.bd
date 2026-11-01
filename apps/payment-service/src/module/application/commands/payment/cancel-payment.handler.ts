/**
 * CancelPaymentHandler
 * @module payment-service/application/commands/payment
 */
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';

import { CancelPaymentCommand } from './cancel-payment.command.js';
import {
  PAYMENT_SERVICE,
  type IPaymentService,
} from '@application/services/interfaces/payment.service.interface.js';
import type { PaymentResponseDTO } from '@application/dtos/responses/payment-response.dto.js';

@CommandHandler(CancelPaymentCommand)
export class CancelPaymentHandler
  implements ICommandHandler<CancelPaymentCommand, PaymentResponseDTO>
{
  constructor(
    @Inject(PAYMENT_SERVICE)
    private readonly service: IPaymentService,
  ) {}

  async execute(c: CancelPaymentCommand): Promise<PaymentResponseDTO> {
    return this.service.cancel(c.dto, c.actorId);
  }
}

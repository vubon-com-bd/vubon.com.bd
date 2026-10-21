/**
 * InitiatePaymentHandler
 * @module payment-service/application/commands/payment
 */
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';

import { InitiatePaymentCommand } from './initiate-payment.command.js';
import {
  PAYMENT_SERVICE,
  type IPaymentService,
} from '@application/services/interfaces/payment.service.interface.js';
import type { PaymentInitiateResponseDTO } from '@application/dtos/responses/payment-response.dto.js';

@CommandHandler(InitiatePaymentCommand)
export class InitiatePaymentHandler
  implements ICommandHandler<InitiatePaymentCommand, PaymentInitiateResponseDTO>
{
  constructor(
    @Inject(PAYMENT_SERVICE)
    private readonly service: IPaymentService,
  ) {}

  async execute(c: InitiatePaymentCommand): Promise<PaymentInitiateResponseDTO> {
    return this.service.initiate(c.dto, c.userId);
  }
}

import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { RetryPaymentCommand } from './retry-payment.command.js';
import {
  PAYMENT_SERVICE,
  type IPaymentService,
} from '../../services/interfaces/payment.service.interface.js';
import type { PaymentResponseDTO } from '../../dtos/responses/payment-response.dto.js';

@CommandHandler(RetryPaymentCommand)
export class RetryPaymentHandler
  implements ICommandHandler<RetryPaymentCommand, PaymentResponseDTO>
{
  constructor(@Inject(PAYMENT_SERVICE) private readonly service: IPaymentService) {}

  async execute(c: RetryPaymentCommand): Promise<PaymentResponseDTO> {
    return this.service.retry(c.dto, c.actorId);
  }
}

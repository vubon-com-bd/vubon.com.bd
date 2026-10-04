import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { VerifyPaymentCommand } from './verify-payment.command.js';
import {
  PAYMENT_SERVICE,
  type IPaymentService,
} from '../../services/interfaces/payment.service.interface.js';
import type { PaymentResponseDTO } from '../../dtos/responses/payment-response.dto.js';

@CommandHandler(VerifyPaymentCommand)
export class VerifyPaymentHandler
  implements ICommandHandler<VerifyPaymentCommand, PaymentResponseDTO>
{
  constructor(@Inject(PAYMENT_SERVICE) private readonly service: IPaymentService) {}

  async execute(c: VerifyPaymentCommand): Promise<PaymentResponseDTO> {
    return this.service.verify(c.dto, c.actorId);
  }
}

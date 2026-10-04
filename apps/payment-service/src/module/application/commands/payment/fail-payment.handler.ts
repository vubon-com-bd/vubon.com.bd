import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { FailPaymentCommand } from './fail-payment.command.js';
import {
  PAYMENT_SERVICE,
  type IPaymentService,
} from '../../services/interfaces/payment.service.interface.js';
import type { PaymentResponseDTO } from '../../dtos/responses/payment-response.dto.js';

@CommandHandler(FailPaymentCommand)
export class FailPaymentHandler
  implements ICommandHandler<FailPaymentCommand, PaymentResponseDTO>
{
  constructor(@Inject(PAYMENT_SERVICE) private readonly service: IPaymentService) {}

  async execute(c: FailPaymentCommand): Promise<PaymentResponseDTO> {
    return this.service.fail(c.dto, c.actorId);
  }
}

import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { MarkPaidCommand } from './mark-paid.command.js';
import {
  PAYMENT_SERVICE,
  type IPaymentService,
} from '../../services/interfaces/payment.service.interface.js';
import type { PaymentResponseDTO } from '../../dtos/responses/payment-response.dto.js';

@CommandHandler(MarkPaidCommand)
export class MarkPaidHandler
  implements ICommandHandler<MarkPaidCommand, PaymentResponseDTO>
{
  constructor(@Inject(PAYMENT_SERVICE) private readonly service: IPaymentService) {}

  async execute(c: MarkPaidCommand): Promise<PaymentResponseDTO> {
    return this.service.markPaid(c.paymentId, c.actorId);
  }
}

import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { MarkChargebackCommand } from './mark-chargeback.command.js';
import {
  PAYMENT_SERVICE,
  type IPaymentService,
} from '../../services/interfaces/payment.service.interface.js';
import type { PaymentResponseDTO } from '../../dtos/responses/payment-response.dto.js';

@CommandHandler(MarkChargebackCommand)
export class MarkChargebackHandler
  implements ICommandHandler<MarkChargebackCommand, PaymentResponseDTO>
{
  constructor(@Inject(PAYMENT_SERVICE) private readonly service: IPaymentService) {}

  async execute(c: MarkChargebackCommand): Promise<PaymentResponseDTO> {
    return this.service.chargeback(c.dto, c.actorId);
  }
}

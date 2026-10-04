import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { CapturePaymentCommand } from './capture-payment.command.js';
import {
  PAYMENT_SERVICE,
  type IPaymentService,
} from '../../services/interfaces/payment.service.interface.js';
import type { PaymentResponseDTO } from '../../dtos/responses/payment-response.dto.js';

@CommandHandler(CapturePaymentCommand)
export class CapturePaymentHandler
  implements ICommandHandler<CapturePaymentCommand, PaymentResponseDTO>
{
  constructor(@Inject(PAYMENT_SERVICE) private readonly service: IPaymentService) {}

  async execute(c: CapturePaymentCommand): Promise<PaymentResponseDTO> {
    return this.service.capture(c.dto, c.actorId);
  }
}

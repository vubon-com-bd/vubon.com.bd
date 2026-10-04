import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { InitiatePaymentCommand } from './initiate-payment.command.js';
import {
  PAYMENT_SERVICE,
  type IPaymentService,
} from '../../services/interfaces/payment.service.interface.js';
import type { PaymentInitiateResponseDTO } from '../../dtos/responses/payment-response.dto.js';

@CommandHandler(InitiatePaymentCommand)
export class InitiatePaymentHandler
  implements ICommandHandler<InitiatePaymentCommand, PaymentInitiateResponseDTO>
{
  constructor(@Inject(PAYMENT_SERVICE) private readonly service: IPaymentService) {}

  async execute(c: InitiatePaymentCommand): Promise<PaymentInitiateResponseDTO> {
    return this.service.initiate(c.dto, c.userId, c.actorId);
  }
}

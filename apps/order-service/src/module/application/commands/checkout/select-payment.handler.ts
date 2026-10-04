import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { SelectPaymentCommand } from './select-payment.command.js';
import { CHECKOUT_SERVICE, type ICheckoutService } from '../../services/interfaces/checkout.service.interface.js';
import type { CheckoutResponseDTO } from '../../dtos/responses/checkout-response.dto.js';

@CommandHandler(SelectPaymentCommand)
export class SelectPaymentHandler implements ICommandHandler<SelectPaymentCommand, CheckoutResponseDTO> {
  constructor(@Inject(CHECKOUT_SERVICE) private readonly service: ICheckoutService) {}
  async execute(c: SelectPaymentCommand): Promise<CheckoutResponseDTO> {
    return this.service.selectPayment(c.dto, c.actorId);
  }
}

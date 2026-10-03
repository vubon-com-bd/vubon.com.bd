import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { ConfirmCheckoutCommand } from './confirm-checkout.command.js';
import { CHECKOUT_SERVICE, type ICheckoutService } from '../../services/interfaces/checkout.service.interface.js';
import type { CheckoutResponseDTO } from '../../dtos/responses/checkout-response.dto.js';

@CommandHandler(ConfirmCheckoutCommand)
export class ConfirmCheckoutHandler implements ICommandHandler<ConfirmCheckoutCommand, CheckoutResponseDTO> {
  constructor(@Inject(CHECKOUT_SERVICE) private readonly service: ICheckoutService) {}
  async execute(c: ConfirmCheckoutCommand): Promise<CheckoutResponseDTO> {
    return this.service.confirm(c.dto, c.actorId);
  }
}

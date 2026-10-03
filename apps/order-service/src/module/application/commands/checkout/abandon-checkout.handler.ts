import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { AbandonCheckoutCommand } from './abandon-checkout.command.js';
import { CHECKOUT_SERVICE, type ICheckoutService } from '../../services/interfaces/checkout.service.interface.js';
import type { CheckoutResponseDTO } from '../../dtos/responses/checkout-response.dto.js';

@CommandHandler(AbandonCheckoutCommand)
export class AbandonCheckoutHandler implements ICommandHandler<AbandonCheckoutCommand, CheckoutResponseDTO> {
  constructor(@Inject(CHECKOUT_SERVICE) private readonly service: ICheckoutService) {}
  async execute(c: AbandonCheckoutCommand): Promise<CheckoutResponseDTO> {
    return this.service.abandon(c.dto, c.actorId);
  }
}

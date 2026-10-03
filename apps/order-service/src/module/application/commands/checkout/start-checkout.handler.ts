import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { StartCheckoutCommand } from './start-checkout.command.js';
import { CHECKOUT_SERVICE, type ICheckoutService } from '../../services/interfaces/checkout.service.interface.js';
import type { CheckoutResponseDTO } from '../../dtos/responses/checkout-response.dto.js';

@CommandHandler(StartCheckoutCommand)
export class StartCheckoutHandler implements ICommandHandler<StartCheckoutCommand, CheckoutResponseDTO> {
  constructor(@Inject(CHECKOUT_SERVICE) private readonly service: ICheckoutService) {}
  async execute(c: StartCheckoutCommand): Promise<CheckoutResponseDTO> {
    return this.service.start(c.dto, c.actorId);
  }
}

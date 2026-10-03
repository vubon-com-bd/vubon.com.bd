import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { SelectShippingCommand } from './select-shipping.command.js';
import { CHECKOUT_SERVICE, type ICheckoutService } from '../../services/interfaces/checkout.service.interface.js';
import type { CheckoutResponseDTO } from '../../dtos/responses/checkout-response.dto.js';

@CommandHandler(SelectShippingCommand)
export class SelectShippingHandler implements ICommandHandler<SelectShippingCommand, CheckoutResponseDTO> {
  constructor(@Inject(CHECKOUT_SERVICE) private readonly service: ICheckoutService) {}
  async execute(c: SelectShippingCommand): Promise<CheckoutResponseDTO> {
    return this.service.selectShipping(c.dto, c.actorId);
  }
}

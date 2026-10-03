import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { SelectAddressCommand } from './select-address.command.js';
import { CHECKOUT_SERVICE, type ICheckoutService } from '../../services/interfaces/checkout.service.interface.js';
import type { CheckoutResponseDTO } from '../../dtos/responses/checkout-response.dto.js';

@CommandHandler(SelectAddressCommand)
export class SelectAddressHandler implements ICommandHandler<SelectAddressCommand, CheckoutResponseDTO> {
  constructor(@Inject(CHECKOUT_SERVICE) private readonly service: ICheckoutService) {}
  async execute(c: SelectAddressCommand): Promise<CheckoutResponseDTO> {
    return this.service.selectAddress(c.dto, c.actorId);
  }
}

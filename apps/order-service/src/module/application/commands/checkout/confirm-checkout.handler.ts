/**
 * ConfirmCheckoutHandler
 * @module order-service/application/commands/checkout
 */
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { ConfirmCheckoutCommand } from './confirm-checkout.command.js';
import {
  CHECKOUT_SERVICE,
  type ICheckoutService,
} from '../../services/interfaces/checkout.service.interface.js';
import type { CheckoutConfirmResponseDTO } from '../../dtos/responses/checkout-response.dto.js';

@CommandHandler(ConfirmCheckoutCommand)
export class ConfirmCheckoutHandler
  implements ICommandHandler<ConfirmCheckoutCommand, CheckoutConfirmResponseDTO>
{
  constructor(
    @Inject(CHECKOUT_SERVICE)
    private readonly service: ICheckoutService,
  ) {}

  async execute(c: ConfirmCheckoutCommand): Promise<CheckoutConfirmResponseDTO> {
    return this.service.confirm(c.dto, c.actorId);
  }
}

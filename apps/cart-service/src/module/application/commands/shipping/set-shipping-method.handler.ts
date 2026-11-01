import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { SetShippingMethodCommand } from './set-shipping-method.command.js';
import {
  CART_SHIPPING_SERVICE,
  type ICartShippingService,
} from '../../services/interfaces/cart-shipping.service.interface.js';
import type { CartTotalsResponseDTO } from '../../dtos/responses/cart-totals-response.dto.js';

@CommandHandler(SetShippingMethodCommand)
export class SetShippingMethodHandler
  implements ICommandHandler<SetShippingMethodCommand, CartTotalsResponseDTO>
{
  constructor(
    @Inject(CART_SHIPPING_SERVICE)
    private readonly service: ICartShippingService,
  ) {}

  async execute(c: SetShippingMethodCommand): Promise<CartTotalsResponseDTO> {
    return this.service.setMethod(c.dto, c.actorId);
  }
}

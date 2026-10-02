import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { SetShippingMethodCommand } from './set-shipping-method.command.js';
import { CART_SHIPPING_SERVICE, type ICartShippingService } from '../../services/interfaces/cart-shipping.service.interface.js';
import type { CartResponseDTO } from '../../dtos/responses/cart-response.dto.js';

@CommandHandler(SetShippingMethodCommand)
export class SetShippingMethodHandler implements ICommandHandler<SetShippingMethodCommand, CartResponseDTO> {
  constructor(@Inject(CART_SHIPPING_SERVICE) private readonly service: ICartShippingService) {}
  async execute(c: SetShippingMethodCommand): Promise<CartResponseDTO> {
    return this.service.setMethod(c.dto);
  }
}

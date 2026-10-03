import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { CalculateShippingCommand } from './calculate-shipping.command.js';
import { CART_SHIPPING_SERVICE, type ICartShippingService } from '../../services/interfaces/cart-shipping.service.interface.js';
import type { CartTotalsResponseDTO } from '../../dtos/responses/cart-totals-response.dto.js';

@CommandHandler(CalculateShippingCommand)
export class CalculateShippingHandler implements ICommandHandler<CalculateShippingCommand, CartTotalsResponseDTO> {
  constructor(@Inject(CART_SHIPPING_SERVICE) private readonly service: ICartShippingService) {}
  async execute(c: CalculateShippingCommand): Promise<CartTotalsResponseDTO> {
    return this.service.calculate(c.dto);
  }
}

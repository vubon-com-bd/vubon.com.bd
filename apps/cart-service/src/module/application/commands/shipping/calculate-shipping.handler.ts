import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { CalculateShippingCommand } from './calculate-shipping.command.js';
import {
  CART_SHIPPING_SERVICE,
  type ICartShippingService,
  type ShippingCalculationResponseDTO,
} from '../../services/interfaces/cart-shipping.service.interface.js';

@CommandHandler(CalculateShippingCommand)
export class CalculateShippingHandler
  implements ICommandHandler<CalculateShippingCommand, ShippingCalculationResponseDTO>
{
  constructor(
    @Inject(CART_SHIPPING_SERVICE)
    private readonly service: ICartShippingService,
  ) {}

  async execute(c: CalculateShippingCommand): Promise<ShippingCalculationResponseDTO> {
    return this.service.calculate(c.dto);
  }
}

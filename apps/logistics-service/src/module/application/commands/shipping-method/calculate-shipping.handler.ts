import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { CalculateShippingCommand } from './calculate-shipping.command.js';
import { SHIPPING_METHOD_SERVICE, type IShippingMethodService } from '../../services/interfaces/shipping-method.service.interface.js';
import type { CalculateShippingResponseDTO } from '../../dtos/responses/shipping-method/shipping-method-response.dto.js';

@CommandHandler(CalculateShippingCommand)
export class CalculateShippingHandler implements ICommandHandler<CalculateShippingCommand, CalculateShippingResponseDTO> {
  constructor(@Inject(SHIPPING_METHOD_SERVICE) private readonly service: IShippingMethodService) {}
  async execute(c: CalculateShippingCommand): Promise<CalculateShippingResponseDTO> { return this.service.calculateShipping(c.dto); }
}

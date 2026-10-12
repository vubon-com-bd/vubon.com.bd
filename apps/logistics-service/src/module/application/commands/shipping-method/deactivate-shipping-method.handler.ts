import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { DeactivateShippingMethodCommand } from './deactivate-shipping-method.command.js';
import { SHIPPING_METHOD_SERVICE, type IShippingMethodService } from '../../services/interfaces/shipping-method.service.interface.js';
import type { ShippingMethodResponseDTO } from '../../dtos/responses/shipping-method/shipping-method-response.dto.js';

@CommandHandler(DeactivateShippingMethodCommand)
export class DeactivateShippingMethodHandler implements ICommandHandler<DeactivateShippingMethodCommand, ShippingMethodResponseDTO> {
  constructor(@Inject(SHIPPING_METHOD_SERVICE) private readonly service: IShippingMethodService) {}
  async execute(c: DeactivateShippingMethodCommand): Promise<ShippingMethodResponseDTO> { return this.service.deactivate(c.dto, c.actorId); }
}

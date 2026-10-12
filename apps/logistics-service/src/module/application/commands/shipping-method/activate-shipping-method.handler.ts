import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { ActivateShippingMethodCommand } from './activate-shipping-method.command.js';
import { SHIPPING_METHOD_SERVICE, type IShippingMethodService } from '../../services/interfaces/shipping-method.service.interface.js';
import type { ShippingMethodResponseDTO } from '../../dtos/responses/shipping-method/shipping-method-response.dto.js';

@CommandHandler(ActivateShippingMethodCommand)
export class ActivateShippingMethodHandler implements ICommandHandler<ActivateShippingMethodCommand, ShippingMethodResponseDTO> {
  constructor(@Inject(SHIPPING_METHOD_SERVICE) private readonly service: IShippingMethodService) {}
  async execute(c: ActivateShippingMethodCommand): Promise<ShippingMethodResponseDTO> { return this.service.activate(c.dto, c.actorId); }
}

import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { ActivateShippingMethodCommand } from './activate.command.js';
import { SHIPPING_METHOD_SERVICE, type IShippingMethodService } from '@application/services/interfaces/shipping-method.service.interface';
import type { ShippingMethodResponseDTO } from '@application/dtos/responses/shipping-method/index.js';

@CommandHandler(ActivateShippingMethodCommand)
export class ActivateShippingMethodHandler implements ICommandHandler<ActivateShippingMethodCommand, ShippingMethodResponseDTO> {
  constructor(@Inject(SHIPPING_METHOD_SERVICE) private readonly service: IShippingMethodService) {}
  async execute(c: ActivateShippingMethodCommand): Promise<ShippingMethodResponseDTO> { return this.service.activate(c.dto, c.actorId); }
}

import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { DeactivateShippingMethodCommand } from './deactivate.command.js';
import { SHIPPING_METHOD_SERVICE, type IShippingMethodService } from '@application/services/interfaces/shipping-method.service.interface';
import type { ShippingMethodResponseDTO } from '@application/dtos/responses/shipping-method/index.js';

@CommandHandler(DeactivateShippingMethodCommand)
export class DeactivateShippingMethodHandler implements ICommandHandler<DeactivateShippingMethodCommand, ShippingMethodResponseDTO> {
  constructor(@Inject(SHIPPING_METHOD_SERVICE) private readonly service: IShippingMethodService) {}
  async execute(c: DeactivateShippingMethodCommand): Promise<ShippingMethodResponseDTO> { return this.service.deactivate(c.dto, c.actorId); }
}

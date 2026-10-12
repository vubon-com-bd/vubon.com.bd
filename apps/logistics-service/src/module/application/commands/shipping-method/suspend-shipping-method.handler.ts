import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { SuspendShippingMethodCommand } from './suspend-shipping-method.command.js';
import { SHIPPING_METHOD_SERVICE, type IShippingMethodService } from '../../services/interfaces/shipping-method.service.interface.js';
import type { ShippingMethodResponseDTO } from '../../dtos/responses/shipping-method/shipping-method-response.dto.js';

@CommandHandler(SuspendShippingMethodCommand)
export class SuspendShippingMethodHandler implements ICommandHandler<SuspendShippingMethodCommand, ShippingMethodResponseDTO> {
  constructor(@Inject(SHIPPING_METHOD_SERVICE) private readonly service: IShippingMethodService) {}
  async execute(c: SuspendShippingMethodCommand): Promise<ShippingMethodResponseDTO> { return this.service.suspend(c.dto, c.actorId); }
}

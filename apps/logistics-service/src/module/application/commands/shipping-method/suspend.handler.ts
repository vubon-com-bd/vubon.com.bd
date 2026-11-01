import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { SuspendShippingMethodCommand } from './suspend.command.js';
import { SHIPPING_METHOD_SERVICE, type IShippingMethodService } from '@application/services/interfaces/shipping-method.service.interface';
import type { ShippingMethodResponseDTO } from '@application/dtos/responses/shipping-method/index.js';

@CommandHandler(SuspendShippingMethodCommand)
export class SuspendShippingMethodHandler implements ICommandHandler<SuspendShippingMethodCommand, ShippingMethodResponseDTO> {
  constructor(@Inject(SHIPPING_METHOD_SERVICE) private readonly service: IShippingMethodService) {}
  async execute(c: SuspendShippingMethodCommand): Promise<ShippingMethodResponseDTO> { return this.service.suspend(c.dto, c.actorId); }
}

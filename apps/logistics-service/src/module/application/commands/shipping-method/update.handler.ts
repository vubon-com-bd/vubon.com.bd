import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { UpdateShippingMethodCommand } from './update.command.js';
import { SHIPPING_METHOD_SERVICE, type IShippingMethodService } from '@application/services/interfaces/shipping-method.service.interface';
import type { ShippingMethodResponseDTO } from '@application/dtos/responses/shipping-method/index.js';

@CommandHandler(UpdateShippingMethodCommand)
export class UpdateShippingMethodHandler implements ICommandHandler<UpdateShippingMethodCommand, ShippingMethodResponseDTO> {
  constructor(@Inject(SHIPPING_METHOD_SERVICE) private readonly service: IShippingMethodService) {}
  async execute(c: UpdateShippingMethodCommand): Promise<ShippingMethodResponseDTO> { return this.service.update(c.dto, c.actorId); }
}

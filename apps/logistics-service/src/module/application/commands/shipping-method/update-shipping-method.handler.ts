import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { UpdateShippingMethodCommand } from './update-shipping-method.command.js';
import { SHIPPING_METHOD_SERVICE, type IShippingMethodService } from '../../services/interfaces/shipping-method.service.interface.js';
import type { ShippingMethodResponseDTO } from '../../dtos/responses/shipping-method/shipping-method-response.dto.js';

@CommandHandler(UpdateShippingMethodCommand)
export class UpdateShippingMethodHandler implements ICommandHandler<UpdateShippingMethodCommand, ShippingMethodResponseDTO> {
  constructor(@Inject(SHIPPING_METHOD_SERVICE) private readonly service: IShippingMethodService) {}
  async execute(c: UpdateShippingMethodCommand): Promise<ShippingMethodResponseDTO> { return this.service.update(c.dto, c.actorId); }
}

import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { CreateShippingMethodCommand } from './create-shipping-method.command.js';
import { SHIPPING_METHOD_SERVICE, type IShippingMethodService } from '@application/services/interfaces/shipping-method.service.interface';
import type { ShippingMethodResponseDTO } from '@application/dtos/responses/shipping-method/index.js';

@CommandHandler(CreateShippingMethodCommand)
export class CreateShippingMethodHandler implements ICommandHandler<CreateShippingMethodCommand, ShippingMethodResponseDTO> {
  constructor(@Inject(SHIPPING_METHOD_SERVICE) private readonly service: IShippingMethodService) {}
  async execute(c: CreateShippingMethodCommand): Promise<ShippingMethodResponseDTO> { return this.service.create(c.dto, c.actorId); }
}

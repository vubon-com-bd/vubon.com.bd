import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { UpdateShippingCommand } from './update-shipping.command.js';
import {
  VENDOR_SHIPPING_SERVICE,
  type IVendorShippingService,
  type ShippingConfigDTO,
} from '../../services/interfaces/vendor-shipping.service.interface.js';

@CommandHandler(UpdateShippingCommand)
export class UpdateShippingHandler
  implements ICommandHandler<UpdateShippingCommand, ShippingConfigDTO>
{
  constructor(
    @Inject(VENDOR_SHIPPING_SERVICE)
    private readonly service: IVendorShippingService,
  ) {}

  async execute(c: UpdateShippingCommand): Promise<ShippingConfigDTO> {
    return this.service.update(c.dto, c.actorId);
  }
}

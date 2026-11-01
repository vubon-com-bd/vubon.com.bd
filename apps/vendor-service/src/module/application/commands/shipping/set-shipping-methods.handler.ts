import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { SetShippingMethodsCommand } from './set-shipping-methods.command.js';
import {
  VENDOR_SHIPPING_SERVICE,
  type IVendorShippingService,
  type ShippingConfigDTO,
} from '../../services/interfaces/vendor-shipping.service.interface.js';

@CommandHandler(SetShippingMethodsCommand)
export class SetShippingMethodsHandler
  implements ICommandHandler<SetShippingMethodsCommand, ShippingConfigDTO>
{
  constructor(
    @Inject(VENDOR_SHIPPING_SERVICE)
    private readonly service: IVendorShippingService,
  ) {}

  async execute(c: SetShippingMethodsCommand): Promise<ShippingConfigDTO> {
    return this.service.setMethods(c.dto, c.actorId);
  }
}

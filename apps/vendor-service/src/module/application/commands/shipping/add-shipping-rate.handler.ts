import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { AddShippingRateCommand } from './add-shipping-rate.command.js';
import {
  VENDOR_SHIPPING_SERVICE,
  type IVendorShippingService,
  type VendorShippingResponseDto,
} from '../../services/interfaces/vendor-shipping.service.interface.js';

@CommandHandler(AddShippingRateCommand)
export class AddShippingRateHandler
  implements ICommandHandler<AddShippingRateCommand, VendorShippingResponseDto>
{
  constructor(@Inject(VENDOR_SHIPPING_SERVICE) private readonly service: IVendorShippingService) {}
  async execute(cmd: AddShippingRateCommand): Promise<VendorShippingResponseDto> {
    return this.service.addRate(cmd.input, cmd.actorId);
  }
}

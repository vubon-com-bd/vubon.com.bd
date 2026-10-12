import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { RemoveShippingRateCommand } from './remove-shipping-rate.command.js';
import {
  VENDOR_SHIPPING_SERVICE,
  type IVendorShippingService,
  type VendorShippingResponseDto,
} from '../../services/interfaces/vendor-shipping.service.interface.js';

@CommandHandler(RemoveShippingRateCommand)
export class RemoveShippingRateHandler
  implements ICommandHandler<RemoveShippingRateCommand, VendorShippingResponseDto>
{
  constructor(@Inject(VENDOR_SHIPPING_SERVICE) private readonly service: IVendorShippingService) {}
  async execute(cmd: RemoveShippingRateCommand): Promise<VendorShippingResponseDto> {
    return this.service.removeRate(cmd.vendorId, cmd.method, cmd.zone, cmd.actorId);
  }
}

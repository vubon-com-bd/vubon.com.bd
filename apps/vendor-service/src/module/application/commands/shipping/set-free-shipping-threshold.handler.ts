import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { SetFreeShippingThresholdCommand } from './set-free-shipping-threshold.command.js';
import {
  VENDOR_SHIPPING_SERVICE,
  type IVendorShippingService,
  type VendorShippingResponseDto,
} from '../../services/interfaces/vendor-shipping.service.interface.js';

@CommandHandler(SetFreeShippingThresholdCommand)
export class SetFreeShippingThresholdHandler
  implements ICommandHandler<SetFreeShippingThresholdCommand, VendorShippingResponseDto>
{
  constructor(@Inject(VENDOR_SHIPPING_SERVICE) private readonly service: IVendorShippingService) {}
  async execute(cmd: SetFreeShippingThresholdCommand): Promise<VendorShippingResponseDto> {
    return this.service.setFreeShippingThreshold(cmd.vendorId, cmd.amount, cmd.actorId);
  }
}

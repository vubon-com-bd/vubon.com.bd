import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { InitializeShippingCommand } from './initialize-shipping.command.js';
import {
  VENDOR_SHIPPING_SERVICE,
  type IVendorShippingService,
  type VendorShippingResponseDto,
} from '../../services/interfaces/vendor-shipping.service.interface.js';

@CommandHandler(InitializeShippingCommand)
export class InitializeShippingHandler
  implements ICommandHandler<InitializeShippingCommand, VendorShippingResponseDto>
{
  constructor(@Inject(VENDOR_SHIPPING_SERVICE) private readonly service: IVendorShippingService) {}
  async execute(cmd: InitializeShippingCommand): Promise<VendorShippingResponseDto> {
    return this.service.initialize(cmd.vendorId, cmd.defaultMethod, cmd.actorId);
  }
}

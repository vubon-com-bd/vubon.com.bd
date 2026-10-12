import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { InitializeWarrantyCommand } from './initialize-warranty.command.js';
import {
  VENDOR_WARRANTY_SERVICE,
  type IVendorWarrantyService,
  type VendorWarrantyResponseDto,
} from '../../services/interfaces/vendor-warranty.service.interface.js';

@CommandHandler(InitializeWarrantyCommand)
export class InitializeWarrantyHandler
  implements ICommandHandler<InitializeWarrantyCommand, VendorWarrantyResponseDto>
{
  constructor(@Inject(VENDOR_WARRANTY_SERVICE) private readonly service: IVendorWarrantyService) {}
  async execute(cmd: InitializeWarrantyCommand): Promise<VendorWarrantyResponseDto> {
    return this.service.initialize(cmd.vendorId, cmd.actorId);
  }
}

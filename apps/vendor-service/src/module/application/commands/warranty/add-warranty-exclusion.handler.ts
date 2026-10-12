import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { AddWarrantyExclusionCommand } from './add-warranty-exclusion.command.js';
import {
  VENDOR_WARRANTY_SERVICE,
  type IVendorWarrantyService,
  type VendorWarrantyResponseDto,
} from '../../services/interfaces/vendor-warranty.service.interface.js';

@CommandHandler(AddWarrantyExclusionCommand)
export class AddWarrantyExclusionHandler
  implements ICommandHandler<AddWarrantyExclusionCommand, VendorWarrantyResponseDto>
{
  constructor(@Inject(VENDOR_WARRANTY_SERVICE) private readonly service: IVendorWarrantyService) {}
  async execute(cmd: AddWarrantyExclusionCommand): Promise<VendorWarrantyResponseDto> {
    return this.service.addExclusion(cmd.vendorId, cmd.term, cmd.actorId);
  }
}

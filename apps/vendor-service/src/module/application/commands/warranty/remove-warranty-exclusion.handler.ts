import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { RemoveWarrantyExclusionCommand } from './remove-warranty-exclusion.command.js';
import {
  VENDOR_WARRANTY_SERVICE,
  type IVendorWarrantyService,
  type VendorWarrantyResponseDto,
} from '../../services/interfaces/vendor-warranty.service.interface.js';

@CommandHandler(RemoveWarrantyExclusionCommand)
export class RemoveWarrantyExclusionHandler
  implements ICommandHandler<RemoveWarrantyExclusionCommand, VendorWarrantyResponseDto>
{
  constructor(@Inject(VENDOR_WARRANTY_SERVICE) private readonly service: IVendorWarrantyService) {}
  async execute(cmd: RemoveWarrantyExclusionCommand): Promise<VendorWarrantyResponseDto> {
    return this.service.removeExclusion(cmd.vendorId, cmd.term, cmd.actorId);
  }
}

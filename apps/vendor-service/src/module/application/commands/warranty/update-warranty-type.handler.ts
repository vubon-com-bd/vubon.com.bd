import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { UpdateWarrantyTypeCommand } from './update-warranty-type.command.js';
import {
  VENDOR_WARRANTY_SERVICE,
  type IVendorWarrantyService,
  type VendorWarrantyResponseDto,
} from '../../services/interfaces/vendor-warranty.service.interface.js';

@CommandHandler(UpdateWarrantyTypeCommand)
export class UpdateWarrantyTypeHandler
  implements ICommandHandler<UpdateWarrantyTypeCommand, VendorWarrantyResponseDto>
{
  constructor(@Inject(VENDOR_WARRANTY_SERVICE) private readonly service: IVendorWarrantyService) {}
  async execute(cmd: UpdateWarrantyTypeCommand): Promise<VendorWarrantyResponseDto> {
    return this.service.updateType(cmd.vendorId, cmd.warrantyType, cmd.actorId);
  }
}

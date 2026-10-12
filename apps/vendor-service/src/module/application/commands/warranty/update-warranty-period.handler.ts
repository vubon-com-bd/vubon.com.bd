import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { UpdateWarrantyPeriodCommand } from './update-warranty-period.command.js';
import {
  VENDOR_WARRANTY_SERVICE,
  type IVendorWarrantyService,
  type VendorWarrantyResponseDto,
} from '../../services/interfaces/vendor-warranty.service.interface.js';

@CommandHandler(UpdateWarrantyPeriodCommand)
export class UpdateWarrantyPeriodHandler
  implements ICommandHandler<UpdateWarrantyPeriodCommand, VendorWarrantyResponseDto>
{
  constructor(@Inject(VENDOR_WARRANTY_SERVICE) private readonly service: IVendorWarrantyService) {}
  async execute(cmd: UpdateWarrantyPeriodCommand): Promise<VendorWarrantyResponseDto> {
    return this.service.updatePeriod(cmd.vendorId, cmd.days, cmd.actorId);
  }
}

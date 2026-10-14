import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { UpdateWarrantyCommand } from './update-warranty.command.js';
import {
  VENDOR_WARRANTY_SERVICE,
  type IVendorWarrantyService,
  type WarrantyDTO,
} from '../../services/interfaces/vendor-warranty.service.interface.js';

@CommandHandler(UpdateWarrantyCommand)
export class UpdateWarrantyHandler
  implements ICommandHandler<UpdateWarrantyCommand, WarrantyDTO>
{
  constructor(
    @Inject(VENDOR_WARRANTY_SERVICE)
    private readonly service: IVendorWarrantyService,
  ) {}

  async execute(c: UpdateWarrantyCommand): Promise<WarrantyDTO> {
    return this.service.update(c.dto, c.actorId);
  }
}

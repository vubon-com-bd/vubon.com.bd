import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { UpdateVendorCommand } from './update-vendor.command.js';
import {
  VENDOR_SERVICE,
  type IVendorService,
} from '../../services/interfaces/vendor.service.interface.js';
import type { VendorResponseDTO } from '../../dtos/responses/vendor-response.dto.js';

@CommandHandler(UpdateVendorCommand)
export class UpdateVendorHandler
  implements ICommandHandler<UpdateVendorCommand, VendorResponseDTO>
{
  constructor(
    @Inject(VENDOR_SERVICE)
    private readonly service: IVendorService,
  ) {}

  async execute(c: UpdateVendorCommand): Promise<VendorResponseDTO> {
    return this.service.update(c.dto, c.actorId);
  }
}

import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { UpdateBusinessCommand } from './update-business.command.js';
import {
  VENDOR_SERVICE,
  type IVendorService,
} from '../../services/interfaces/vendor.service.interface.js';
import type { VendorResponseDTO } from '../../dtos/responses/vendor-response.dto.js';

@CommandHandler(UpdateBusinessCommand)
export class UpdateBusinessHandler
  implements ICommandHandler<UpdateBusinessCommand, VendorResponseDTO>
{
  constructor(
    @Inject(VENDOR_SERVICE)
    private readonly service: IVendorService,
  ) {}

  async execute(c: UpdateBusinessCommand): Promise<VendorResponseDTO> {
    return this.service.updateBusiness(c.dto, c.actorId);
  }
}

/**
 * UpdateVendorBusinessHandler
 * @module vendor-service/application/commands/vendor
 */
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { UpdateVendorBusinessCommand } from './update-vendor-business.command.js';
import {
  VENDOR_SERVICE,
  type IVendorService,
} from '../../services/interfaces/vendor.service.interface.js';
import type { VendorResponseDto } from '../../dtos/responses/vendor-response.dto.js';

@CommandHandler(UpdateVendorBusinessCommand)
export class UpdateVendorBusinessHandler
  implements ICommandHandler<UpdateVendorBusinessCommand, VendorResponseDto>
{
  constructor(
    @Inject(VENDOR_SERVICE) private readonly service: IVendorService,
  ) {}

  async execute(cmd: UpdateVendorBusinessCommand): Promise<VendorResponseDto> {
    return this.service.updateBusiness(cmd.dto, cmd.actorId);
  }
}

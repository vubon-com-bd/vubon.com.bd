/**
 * UpdateVendorProfileHandler
 * @module vendor-service/application/commands/vendor
 */
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { UpdateVendorProfileCommand } from './update-vendor-profile.command.js';
import {
  VENDOR_SERVICE,
  type IVendorService,
} from '../../services/interfaces/vendor.service.interface.js';
import type { VendorResponseDto } from '../../dtos/responses/vendor-response.dto.js';

@CommandHandler(UpdateVendorProfileCommand)
export class UpdateVendorProfileHandler
  implements ICommandHandler<UpdateVendorProfileCommand, VendorResponseDto>
{
  constructor(
    @Inject(VENDOR_SERVICE) private readonly service: IVendorService,
  ) {}

  async execute(cmd: UpdateVendorProfileCommand): Promise<VendorResponseDto> {
    return this.service.updateProfile(cmd.dto, cmd.actorId);
  }
}

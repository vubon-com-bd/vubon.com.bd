import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { UpdateProfileCommand } from './update-profile.command.js';
import {
  VENDOR_SERVICE,
  type IVendorService,
} from '../../services/interfaces/vendor.service.interface.js';
import type { VendorResponseDTO } from '../../dtos/responses/vendor-response.dto.js';

@CommandHandler(UpdateProfileCommand)
export class UpdateProfileHandler
  implements ICommandHandler<UpdateProfileCommand, VendorResponseDTO>
{
  constructor(
    @Inject(VENDOR_SERVICE)
    private readonly service: IVendorService,
  ) {}

  async execute(c: UpdateProfileCommand): Promise<VendorResponseDTO> {
    return this.service.updateProfile(c.dto, c.actorId);
  }
}

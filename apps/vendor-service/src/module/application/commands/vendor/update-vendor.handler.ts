/**
 * UpdateVendorHandler
 * @module vendor-service/application/commands/vendor
 */
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { UpdateVendorCommand } from './update-vendor.command.js';
import {
  VENDOR_SERVICE,
  type IVendorService,
} from '../../services/interfaces/vendor.service.interface.js';
import type { VendorResponseDto } from '../../dtos/responses/vendor-response.dto.js';

@CommandHandler(UpdateVendorCommand)
export class UpdateVendorHandler
  implements ICommandHandler<UpdateVendorCommand, VendorResponseDto>
{
  constructor(
    @Inject(VENDOR_SERVICE) private readonly service: IVendorService,
  ) {}

  async execute(cmd: UpdateVendorCommand): Promise<VendorResponseDto> {
    return this.service.update(cmd.dto, cmd.actorId);
  }
}

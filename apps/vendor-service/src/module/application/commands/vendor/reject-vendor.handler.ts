/**
 * RejectVendorHandler
 * @module vendor-service/application/commands/vendor
 */
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { RejectVendorCommand } from './reject-vendor.command.js';
import {
  VENDOR_SERVICE,
  type IVendorService,
} from '../../services/interfaces/vendor.service.interface.js';
import type { VendorResponseDto } from '../../dtos/responses/vendor-response.dto.js';

@CommandHandler(RejectVendorCommand)
export class RejectVendorHandler
  implements ICommandHandler<RejectVendorCommand, VendorResponseDto>
{
  constructor(
    @Inject(VENDOR_SERVICE) private readonly service: IVendorService,
  ) {}

  async execute(cmd: RejectVendorCommand): Promise<VendorResponseDto> {
    return this.service.reject(cmd.dto, cmd.actorId);
  }
}

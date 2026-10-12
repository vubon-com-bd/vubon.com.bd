/**
 * SuspendVendorHandler
 * @module vendor-service/application/commands/lifecycle
 */
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { SuspendVendorCommand } from './suspend-vendor.command.js';
import {
  VENDOR_SERVICE,
  type IVendorService,
} from '../../services/interfaces/vendor.service.interface.js';
import type { VendorResponseDto } from '../../dtos/responses/vendor-response.dto.js';

@CommandHandler(SuspendVendorCommand)
export class SuspendVendorHandler
  implements ICommandHandler<SuspendVendorCommand, VendorResponseDto>
{
  constructor(
    @Inject(VENDOR_SERVICE) private readonly service: IVendorService,
  ) {}

  async execute(cmd: SuspendVendorCommand): Promise<VendorResponseDto> {
    return this.service.suspend(cmd.dto, cmd.actorId);
  }
}

/**
 * DeactivateVendorHandler
 * @module vendor-service/application/commands/lifecycle
 */
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { DeactivateVendorCommand } from './deactivate-vendor.command.js';
import {
  VENDOR_SERVICE,
  type IVendorService,
} from '../../services/interfaces/vendor.service.interface.js';
import type { VendorResponseDto } from '../../dtos/responses/vendor-response.dto.js';

@CommandHandler(DeactivateVendorCommand)
export class DeactivateVendorHandler
  implements ICommandHandler<DeactivateVendorCommand, VendorResponseDto>
{
  constructor(
    @Inject(VENDOR_SERVICE) private readonly service: IVendorService,
  ) {}

  async execute(cmd: DeactivateVendorCommand): Promise<VendorResponseDto> {
    return this.service.deactivate(cmd.dto, cmd.actorId);
  }
}

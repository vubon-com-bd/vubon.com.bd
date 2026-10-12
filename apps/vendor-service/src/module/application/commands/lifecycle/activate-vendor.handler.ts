/**
 * ActivateVendorHandler
 * @module vendor-service/application/commands/lifecycle
 */
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { ActivateVendorCommand } from './activate-vendor.command.js';
import {
  VENDOR_SERVICE,
  type IVendorService,
} from '../../services/interfaces/vendor.service.interface.js';
import type { VendorResponseDto } from '../../dtos/responses/vendor-response.dto.js';

@CommandHandler(ActivateVendorCommand)
export class ActivateVendorHandler
  implements ICommandHandler<ActivateVendorCommand, VendorResponseDto>
{
  constructor(
    @Inject(VENDOR_SERVICE) private readonly service: IVendorService,
  ) {}

  async execute(cmd: ActivateVendorCommand): Promise<VendorResponseDto> {
    return this.service.activate(cmd.dto, cmd.actorId);
  }
}

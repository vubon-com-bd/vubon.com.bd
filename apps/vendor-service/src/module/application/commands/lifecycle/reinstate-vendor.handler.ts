/**
 * ReinstateVendorHandler
 * @module vendor-service/application/commands/lifecycle
 */
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { ReinstateVendorCommand } from './reinstate-vendor.command.js';
import {
  VENDOR_SERVICE,
  type IVendorService,
} from '../../services/interfaces/vendor.service.interface.js';
import type { VendorResponseDto } from '../../dtos/responses/vendor-response.dto.js';

@CommandHandler(ReinstateVendorCommand)
export class ReinstateVendorHandler
  implements ICommandHandler<ReinstateVendorCommand, VendorResponseDto>
{
  constructor(
    @Inject(VENDOR_SERVICE) private readonly service: IVendorService,
  ) {}

  async execute(cmd: ReinstateVendorCommand): Promise<VendorResponseDto> {
    return this.service.reinstate(cmd.dto, cmd.actorId);
  }
}

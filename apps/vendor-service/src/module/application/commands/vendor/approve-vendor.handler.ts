/**
 * ApproveVendorHandler
 * @module vendor-service/application/commands/vendor
 */
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { ApproveVendorCommand } from './approve-vendor.command.js';
import {
  VENDOR_SERVICE,
  type IVendorService,
} from '../../services/interfaces/vendor.service.interface.js';
import type { VendorResponseDto } from '../../dtos/responses/vendor-response.dto.js';

@CommandHandler(ApproveVendorCommand)
export class ApproveVendorHandler
  implements ICommandHandler<ApproveVendorCommand, VendorResponseDto>
{
  constructor(
    @Inject(VENDOR_SERVICE) private readonly service: IVendorService,
  ) {}

  async execute(cmd: ApproveVendorCommand): Promise<VendorResponseDto> {
    return this.service.approve(cmd.dto, cmd.actorId);
  }
}

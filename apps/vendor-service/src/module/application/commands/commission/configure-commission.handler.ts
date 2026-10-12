/**
 * ConfigureCommissionHandler
 * @module vendor-service/application/commands/commission
 */
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { ConfigureCommissionCommand } from './configure-commission.command.js';
import {
  VENDOR_COMMISSION_SERVICE,
  type IVendorCommissionService,
} from '../../services/interfaces/vendor-commission.service.interface.js';
import type { VendorCommissionResponseDto } from '../../dtos/responses/vendor-commission-response.dto.js';

@CommandHandler(ConfigureCommissionCommand)
export class ConfigureCommissionHandler
  implements ICommandHandler<ConfigureCommissionCommand, VendorCommissionResponseDto>
{
  constructor(
    @Inject(VENDOR_COMMISSION_SERVICE) private readonly service: IVendorCommissionService,
  ) {}

  async execute(cmd: ConfigureCommissionCommand): Promise<VendorCommissionResponseDto> {
    return this.service.configure(cmd.dto, cmd.actorId);
  }
}

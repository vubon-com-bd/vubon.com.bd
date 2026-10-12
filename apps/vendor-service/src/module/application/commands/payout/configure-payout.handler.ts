/**
 * ConfigurePayoutHandler
 * @module vendor-service/application/commands/payout
 */
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { ConfigurePayoutCommand } from './configure-payout.command.js';
import {
  VENDOR_PAYOUT_SERVICE,
  type IVendorPayoutService,
} from '../../services/interfaces/vendor-payout.service.interface.js';
import type { VendorPayoutResponseDto } from '../../dtos/responses/vendor-payout-response.dto.js';

@CommandHandler(ConfigurePayoutCommand)
export class ConfigurePayoutHandler
  implements ICommandHandler<ConfigurePayoutCommand, VendorPayoutResponseDto>
{
  constructor(@Inject(VENDOR_PAYOUT_SERVICE) private readonly service: IVendorPayoutService) {}
  async execute(cmd: ConfigurePayoutCommand): Promise<VendorPayoutResponseDto> {
    return this.service.configure(cmd.dto, cmd.actorId);
  }
}

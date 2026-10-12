/**
 * FailPayoutHandler
 * @module vendor-service/application/commands/payout
 */
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { FailPayoutCommand } from './fail-payout.command.js';
import {
  VENDOR_PAYOUT_SERVICE,
  type IVendorPayoutService,
} from '../../services/interfaces/vendor-payout.service.interface.js';
import type { VendorPayoutResponseDto } from '../../dtos/responses/vendor-payout-response.dto.js';

@CommandHandler(FailPayoutCommand)
export class FailPayoutHandler
  implements ICommandHandler<FailPayoutCommand, VendorPayoutResponseDto>
{
  constructor(@Inject(VENDOR_PAYOUT_SERVICE) private readonly service: IVendorPayoutService) {}
  async execute(cmd: FailPayoutCommand): Promise<VendorPayoutResponseDto> {
    return this.service.fail(cmd.dto, cmd.actorId);
  }
}

/**
 * MarkPayoutPaidHandler
 * @module vendor-service/application/commands/payout
 */
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { MarkPayoutPaidCommand } from './mark-payout-paid.command.js';
import {
  VENDOR_PAYOUT_SERVICE,
  type IVendorPayoutService,
} from '../../services/interfaces/vendor-payout.service.interface.js';
import type { VendorPayoutResponseDto } from '../../dtos/responses/vendor-payout-response.dto.js';

@CommandHandler(MarkPayoutPaidCommand)
export class MarkPayoutPaidHandler
  implements ICommandHandler<MarkPayoutPaidCommand, VendorPayoutResponseDto>
{
  constructor(@Inject(VENDOR_PAYOUT_SERVICE) private readonly service: IVendorPayoutService) {}
  async execute(cmd: MarkPayoutPaidCommand): Promise<VendorPayoutResponseDto> {
    return this.service.markPaid(cmd.dto, cmd.actorId);
  }
}

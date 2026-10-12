/**
 * CancelPayoutHandler
 * @module vendor-service/application/commands/payout
 */
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { CancelPayoutCommand } from './cancel-payout.command.js';
import {
  VENDOR_PAYOUT_SERVICE,
  type IVendorPayoutService,
} from '../../services/interfaces/vendor-payout.service.interface.js';
import type { VendorPayoutResponseDto } from '../../dtos/responses/vendor-payout-response.dto.js';

@CommandHandler(CancelPayoutCommand)
export class CancelPayoutHandler
  implements ICommandHandler<CancelPayoutCommand, VendorPayoutResponseDto>
{
  constructor(@Inject(VENDOR_PAYOUT_SERVICE) private readonly service: IVendorPayoutService) {}
  async execute(cmd: CancelPayoutCommand): Promise<VendorPayoutResponseDto> {
    return this.service.cancel(cmd.dto, cmd.actorId);
  }
}

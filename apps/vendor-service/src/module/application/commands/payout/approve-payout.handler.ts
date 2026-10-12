/**
 * ApprovePayoutHandler
 * @module vendor-service/application/commands/payout
 */
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { ApprovePayoutCommand } from './approve-payout.command.js';
import {
  VENDOR_PAYOUT_SERVICE,
  type IVendorPayoutService,
} from '../../services/interfaces/vendor-payout.service.interface.js';
import type { VendorPayoutResponseDto } from '../../dtos/responses/vendor-payout-response.dto.js';

@CommandHandler(ApprovePayoutCommand)
export class ApprovePayoutHandler
  implements ICommandHandler<ApprovePayoutCommand, VendorPayoutResponseDto>
{
  constructor(@Inject(VENDOR_PAYOUT_SERVICE) private readonly service: IVendorPayoutService) {}
  async execute(cmd: ApprovePayoutCommand): Promise<VendorPayoutResponseDto> {
    return this.service.approve(cmd.dto, cmd.actorId);
  }
}

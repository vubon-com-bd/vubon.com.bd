import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { ApprovePayoutCommand } from './approve-payout.command.js';
import {
  VENDOR_PAYOUT_SERVICE,
  type IVendorPayoutService,
} from '../../services/interfaces/vendor-payout.service.interface.js';
import type { PayoutResponseDTO } from '../../dtos/responses/payout-response.dto.js';

@CommandHandler(ApprovePayoutCommand)
export class ApprovePayoutHandler
  implements ICommandHandler<ApprovePayoutCommand, PayoutResponseDTO>
{
  constructor(
    @Inject(VENDOR_PAYOUT_SERVICE)
    private readonly service: IVendorPayoutService,
  ) {}

  async execute(c: ApprovePayoutCommand): Promise<PayoutResponseDTO> {
    return this.service.approve(c.dto, c.actorId);
  }
}

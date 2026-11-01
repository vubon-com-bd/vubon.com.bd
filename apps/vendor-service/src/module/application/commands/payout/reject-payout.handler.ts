import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { RejectPayoutCommand } from './reject-payout.command.js';
import {
  VENDOR_PAYOUT_SERVICE,
  type IVendorPayoutService,
} from '../../services/interfaces/vendor-payout.service.interface.js';
import type { PayoutResponseDTO } from '../../dtos/responses/payout-response.dto.js';

@CommandHandler(RejectPayoutCommand)
export class RejectPayoutHandler
  implements ICommandHandler<RejectPayoutCommand, PayoutResponseDTO>
{
  constructor(
    @Inject(VENDOR_PAYOUT_SERVICE)
    private readonly service: IVendorPayoutService,
  ) {}

  async execute(c: RejectPayoutCommand): Promise<PayoutResponseDTO> {
    return this.service.reject(c.dto, c.actorId);
  }
}

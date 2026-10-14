import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { RequestPayoutCommand } from './request-payout.command.js';
import {
  VENDOR_PAYOUT_SERVICE,
  type IVendorPayoutService,
} from '../../services/interfaces/vendor-payout.service.interface.js';
import type { PayoutInitiateResponseDTO } from '../../dtos/responses/payout-response.dto.js';

@CommandHandler(RequestPayoutCommand)
export class RequestPayoutHandler
  implements ICommandHandler<RequestPayoutCommand, PayoutInitiateResponseDTO>
{
  constructor(
    @Inject(VENDOR_PAYOUT_SERVICE)
    private readonly service: IVendorPayoutService,
  ) {}

  async execute(c: RequestPayoutCommand): Promise<PayoutInitiateResponseDTO> {
    return this.service.request(c.dto, c.actorId);
  }
}

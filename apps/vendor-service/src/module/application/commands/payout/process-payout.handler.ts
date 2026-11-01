import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { ProcessPayoutCommand } from './process-payout.command.js';
import {
  VENDOR_PAYOUT_SERVICE,
  type IVendorPayoutService,
} from '../../services/interfaces/vendor-payout.service.interface.js';
import type { PayoutResponseDTO } from '../../dtos/responses/payout-response.dto.js';

@CommandHandler(ProcessPayoutCommand)
export class ProcessPayoutHandler
  implements ICommandHandler<ProcessPayoutCommand, PayoutResponseDTO>
{
  constructor(
    @Inject(VENDOR_PAYOUT_SERVICE)
    private readonly service: IVendorPayoutService,
  ) {}

  async execute(c: ProcessPayoutCommand): Promise<PayoutResponseDTO> {
    return this.service.process(c.dto, c.actorId);
  }
}

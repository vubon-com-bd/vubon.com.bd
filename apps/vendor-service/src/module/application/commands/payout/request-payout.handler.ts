/**
 * RequestPayoutHandler
 * @module vendor-service/application/commands/payout
 */
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { RequestPayoutCommand } from './request-payout.command.js';
import {
  VENDOR_PAYOUT_SERVICE,
  type IVendorPayoutService,
} from '../../services/interfaces/vendor-payout.service.interface.js';
import type { VendorPayoutResponseDto } from '../../dtos/responses/vendor-payout-response.dto.js';

@CommandHandler(RequestPayoutCommand)
export class RequestPayoutHandler
  implements ICommandHandler<RequestPayoutCommand, VendorPayoutResponseDto>
{
  constructor(@Inject(VENDOR_PAYOUT_SERVICE) private readonly service: IVendorPayoutService) {}
  async execute(cmd: RequestPayoutCommand): Promise<VendorPayoutResponseDto> {
    return this.service.request(cmd.dto, cmd.actorId);
  }
}

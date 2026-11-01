import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { GetPayoutQuery } from './get-payout.query.js';
import {
  VENDOR_PAYOUT_SERVICE,
  type IVendorPayoutService,
} from '../../services/interfaces/vendor-payout.service.interface.js';
import type { PayoutResponseDTO } from '../../dtos/responses/payout-response.dto.js';

@QueryHandler(GetPayoutQuery)
export class GetPayoutHandler
  implements IQueryHandler<GetPayoutQuery, PayoutResponseDTO>
{
  constructor(
    @Inject(VENDOR_PAYOUT_SERVICE)
    private readonly service: IVendorPayoutService,
  ) {}

  async execute(q: GetPayoutQuery): Promise<PayoutResponseDTO> {
    return this.service.getById(q.payoutId);
  }
}

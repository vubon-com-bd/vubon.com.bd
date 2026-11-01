import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { GetPayoutSummaryQuery } from './get-payout-summary.query.js';
import {
  VENDOR_PAYOUT_SERVICE,
  type IVendorPayoutService,
} from '../../services/interfaces/vendor-payout.service.interface.js';
import type { PayoutStatsResponseDTO } from '../../dtos/responses/payout-response.dto.js';

@QueryHandler(GetPayoutSummaryQuery)
export class GetPayoutSummaryHandler
  implements IQueryHandler<GetPayoutSummaryQuery, PayoutStatsResponseDTO>
{
  constructor(
    @Inject(VENDOR_PAYOUT_SERVICE)
    private readonly service: IVendorPayoutService,
  ) {}

  async execute(q: GetPayoutSummaryQuery): Promise<PayoutStatsResponseDTO> {
    return this.service.getStats(q.vendorId);
  }
}

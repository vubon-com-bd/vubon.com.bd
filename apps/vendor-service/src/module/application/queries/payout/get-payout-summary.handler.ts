import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { GetPayoutSummaryQuery } from './get-payout-summary.query.js';
import {
  VENDOR_PAYOUT_SERVICE,
  type IVendorPayoutService,
} from '../../services/interfaces/vendor-payout.service.interface.js';
import type { VendorPayoutSummaryDto } from '../../dtos/responses/vendor-payout-response.dto.js';

@QueryHandler(GetPayoutSummaryQuery)
export class GetPayoutSummaryHandler
  implements IQueryHandler<GetPayoutSummaryQuery, VendorPayoutSummaryDto>
{
  constructor(@Inject(VENDOR_PAYOUT_SERVICE) private readonly service: IVendorPayoutService) {}
  async execute(query: GetPayoutSummaryQuery): Promise<VendorPayoutSummaryDto> {
    return this.service.getSummary(query.vendorId);
  }
}

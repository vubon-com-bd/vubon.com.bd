import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { GetCommissionSummaryQuery } from './get-commission-summary.query.js';
import {
  VENDOR_COMMISSION_SERVICE,
  type IVendorCommissionService,
} from '../../services/interfaces/vendor-commission.service.interface.js';
import type { CommissionStatsResponseDTO } from '../../dtos/responses/commission-response.dto.js';

@QueryHandler(GetCommissionSummaryQuery)
export class GetCommissionSummaryHandler
  implements IQueryHandler<GetCommissionSummaryQuery, CommissionStatsResponseDTO>
{
  constructor(
    @Inject(VENDOR_COMMISSION_SERVICE)
    private readonly service: IVendorCommissionService,
  ) {}

  async execute(q: GetCommissionSummaryQuery): Promise<CommissionStatsResponseDTO> {
    return this.service.getStats(q.vendorId);
  }
}

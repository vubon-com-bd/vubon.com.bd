import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { BaseQueryHandler } from '@vubon/shared-kernel/application/queries/base.query-handler';
import { GetCommissionSummaryQuery } from './get-commission-summary.query';
import type { VendorCommissionRepository } from '../../../domain/repositories/vendor-commission.repository.interface';
import { VendorIdVO } from '../../../domain/value-objects/primitives/vendor-id.vo';

export interface CommissionSummaryDto {
  readonly vendorId: string;
  readonly totalCommission: number;
  readonly settledCommission: number;
  readonly unsettledCommission: number;
  readonly count: number;
}

@QueryHandler(GetCommissionSummaryQuery)
export class GetCommissionSummaryHandler
  extends BaseQueryHandler<GetCommissionSummaryQuery, CommissionSummaryDto>
  implements IQueryHandler<GetCommissionSummaryQuery>
{
  readonly queryType = 'vendor.commission.summary';

  constructor(private readonly commissionRepo: VendorCommissionRepository) {
    super();
  }

  async execute(query: GetCommissionSummaryQuery): Promise<CommissionSummaryDto> {
    const items = await this.commissionRepo.findByVendorId(
      VendorIdVO.create(query.vendorId),
    );
    const total = items.reduce((sum, c) => sum + c.commissionAmount.amount, 0);
    const settled = items
      .filter((c) => c.isSettled)
      .reduce((s, c) => s + c.commissionAmount.amount, 0);

    return {
      vendorId: query.vendorId,
      totalCommission: total,
      settledCommission: settled,
      unsettledCommission: total - settled,
      count: items.length,
    };
  }
}

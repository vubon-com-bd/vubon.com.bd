import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { BaseQueryHandler } from '@vubon/shared-kernel/application/queries/base.query-handler';
import { GetPayoutSummaryQuery } from './get-payout-summary.query';
import type { VendorPayoutRepository } from '../../../domain/repositories/vendor-payout.repository.interface';
import { VendorIdVO } from '../../../domain/value-objects/primitives/vendor-id.vo';

export interface PayoutSummaryDto {
  readonly vendorId: string;
  readonly totalPayout: number;
  readonly paidPayout: number;
  readonly pendingPayout: number;
  readonly count: number;
}

@QueryHandler(GetPayoutSummaryQuery)
export class GetPayoutSummaryHandler
  extends BaseQueryHandler<GetPayoutSummaryQuery, PayoutSummaryDto>
  implements IQueryHandler<GetPayoutSummaryQuery>
{
  readonly queryType = 'vendor.payout.summary';

  constructor(private readonly payoutRepo: VendorPayoutRepository) {
    super();
  }

  async execute(query: GetPayoutSummaryQuery): Promise<PayoutSummaryDto> {
    const items = await this.payoutRepo.findByVendorId(
      VendorIdVO.create(query.vendorId),
    );
    const total = items.reduce((sum, p) => sum + p.amount.amount, 0);
    const paid = items
      .filter((p) => p.status.value === 'processed')
      .reduce((s, p) => s + p.amount.amount, 0);

    return {
      vendorId: query.vendorId,
      totalPayout: total,
      paidPayout: paid,
      pendingPayout: total - paid,
      count: items.length,
    };
  }
}

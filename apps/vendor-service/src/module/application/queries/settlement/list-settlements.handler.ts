import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { BaseQueryHandler } from '@vubon/shared-kernel/application/queries/base.query-handler';
import { ListSettlementsQuery } from './list-settlements.query';
import type { VendorSettlementRepository } from '../../../domain/repositories/vendor-settlement.repository.interface';
import { VendorIdVO } from '../../../domain/value-objects/primitives/vendor-id.vo';
import type { SettlementResponseDto } from '../../dtos/responses/settlement-response.dto';

@QueryHandler(ListSettlementsQuery)
export class ListSettlementsHandler
  extends BaseQueryHandler<ListSettlementsQuery, readonly SettlementResponseDto[]>
  implements IQueryHandler<ListSettlementsQuery>
{
  readonly queryType = 'vendor.settlement.list';

  constructor(private readonly settlementRepo: VendorSettlementRepository) {
    super();
  }

  async execute(query: ListSettlementsQuery): Promise<readonly SettlementResponseDto[]> {
    void query.limit;
    const items = await this.settlementRepo.findByVendorId(
      VendorIdVO.create(query.vendorId),
    );
    return items.map((s) => ({
      id: s.id.value,
      vendorId: s.vendorId.value,
      status: s.status.value,
      totalAmount: s.totalAmount.amount,
      commissionAmount: s.commissionAmount.amount,
      netAmount: s.netAmount.amount,
      currency: s.totalAmount.currency,
      periodStart: s.periodStart.toISOString(),
      periodEnd: s.periodEnd.toISOString(),
      settledAt: s.settledAt?.toISOString() ?? null,
    }));
  }
}

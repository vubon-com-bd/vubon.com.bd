import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { BaseQueryHandler } from '@vubon/shared-kernel/application/queries/base.query-handler';
import { ListPayoutsQuery } from './list-payouts.query';
import type { VendorPayoutRepository } from '../../../domain/repositories/vendor-payout.repository.interface';
import { VendorIdVO } from '../../../domain/value-objects/primitives/vendor-id.vo';
import type { PayoutResponseDto } from '../../dtos/responses/payout-response.dto';

@QueryHandler(ListPayoutsQuery)
export class ListPayoutsHandler
  extends BaseQueryHandler<ListPayoutsQuery, readonly PayoutResponseDto[]>
  implements IQueryHandler<ListPayoutsQuery>
{
  readonly queryType = 'vendor.payout.list';

  constructor(private readonly payoutRepo: VendorPayoutRepository) {
    super();
  }

  async execute(query: ListPayoutsQuery): Promise<readonly PayoutResponseDto[]> {
    void query.limit;
    const items = await this.payoutRepo.findByVendorId(
      VendorIdVO.create(query.vendorId),
    );
    return items.map((p) => ({
      id: p.id.value,
      vendorId: p.vendorId.value,
      bankAccountId: p.bankAccountId.value,
      amount: p.amount.amount,
      currency: p.amount.currency,
      status: p.status.value,
      requestedAt: p.requestedAt.toISOString(),
      processedAt: p.processedAt?.toISOString() ?? null,
      failureReason: p.failureReason,
    }));
  }
}

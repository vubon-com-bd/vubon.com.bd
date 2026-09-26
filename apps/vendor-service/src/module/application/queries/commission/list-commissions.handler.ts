import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { BaseQueryHandler } from '@vubon/shared-kernel/application/queries/base.query-handler';
import { ListCommissionsQuery } from './list-commissions.query';
import type { VendorCommissionRepository } from '../../../domain/repositories/vendor-commission.repository.interface';
import { VendorIdVO } from '../../../domain/value-objects/primitives/vendor-id.vo';
import type { CommissionResponseDto } from '../../dtos/responses/commission-response.dto';

@QueryHandler(ListCommissionsQuery)
export class ListCommissionsHandler
  extends BaseQueryHandler<ListCommissionsQuery, readonly CommissionResponseDto[]>
  implements IQueryHandler<ListCommissionsQuery>
{
  readonly queryType = 'vendor.commission.list';

  constructor(private readonly commissionRepo: VendorCommissionRepository) {
    super();
  }

  async execute(query: ListCommissionsQuery): Promise<readonly CommissionResponseDto[]> {
    void query.limit;
    const items = await this.commissionRepo.findByVendorId(
      VendorIdVO.create(query.vendorId),
    );
    return items.map((c) => ({
      id: c.id.value,
      vendorId: c.vendorId.value,
      orderId: c.orderId.value,
      rate: c.rate.numeric,
      type: c.type.value,
      orderAmount: c.orderAmount.amount,
      commissionAmount: c.commissionAmount.amount,
      currency: c.orderAmount.currency,
      isSettled: c.isSettled,
      calculatedAt: c.createdAt,
    }));
  }
}

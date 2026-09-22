import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { BaseQueryHandler } from '@vubon/shared-kernel/application/queries/base.query-handler';
import { GetCommissionQuery } from './get-commission.query';
import type { VendorCommissionRepository } from '../../../domain/repositories/vendor-commission.repository.interface';
import { CommissionIdVO } from '../../../domain/value-objects/primitives/commission-id.vo';
import { VendorNotFoundAppError } from '../../errors/vendor.errors';
import type { CommissionResponseDto } from '../../dtos/responses/commission-response.dto';

@QueryHandler(GetCommissionQuery)
export class GetCommissionHandler
  extends BaseQueryHandler<GetCommissionQuery, CommissionResponseDto>
  implements IQueryHandler<GetCommissionQuery>
{
  readonly queryType = 'vendor.commission.get';

  constructor(private readonly commissionRepo: VendorCommissionRepository) {
    super();
  }

  async execute(query: GetCommissionQuery): Promise<CommissionResponseDto> {
    const c = await this.commissionRepo.findById(CommissionIdVO.create(query.commissionId));
    if (!c) throw new VendorNotFoundAppError(query.commissionId);

    return {
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
    };
  }
}

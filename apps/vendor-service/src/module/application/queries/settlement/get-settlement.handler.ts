import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { BaseQueryHandler } from '@vubon/shared-kernel/application/queries/base.query-handler';
import { GetSettlementQuery } from './get-settlement.query';
import type { VendorSettlementRepository } from '../../../domain/repositories/vendor-settlement.repository.interface';
import { SettlementIdVO } from '../../../domain/value-objects/primitives/settlement-id.vo';
import { VendorNotFoundAppError } from '../../errors/vendor.errors';
import type { SettlementResponseDto } from '../../dtos/responses/settlement-response.dto';

@QueryHandler(GetSettlementQuery)
export class GetSettlementHandler
  extends BaseQueryHandler<GetSettlementQuery, SettlementResponseDto>
  implements IQueryHandler<GetSettlementQuery>
{
  readonly queryType = 'vendor.settlement.get';

  constructor(private readonly settlementRepo: VendorSettlementRepository) {
    super();
  }

  async execute(query: GetSettlementQuery): Promise<SettlementResponseDto> {
    const s = await this.settlementRepo.findById(SettlementIdVO.create(query.settlementId));
    if (!s) throw new VendorNotFoundAppError(query.settlementId);

    return {
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
    };
  }
}

import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { BaseQueryHandler } from '@vubon/shared-kernel/application/queries/base.query-handler';
import { GetPayoutQuery } from './get-payout.query';
import type { VendorPayoutRepository } from '../../../domain/repositories/vendor-payout.repository.interface';
import { PayoutIdVO } from '../../../domain/value-objects/primitives/payout-id.vo';
import { VendorNotFoundAppError } from '../../errors/vendor.errors';
import type { PayoutResponseDto } from '../../dtos/responses/payout-response.dto';

@QueryHandler(GetPayoutQuery)
export class GetPayoutHandler
  extends BaseQueryHandler<GetPayoutQuery, PayoutResponseDto>
  implements IQueryHandler<GetPayoutQuery>
{
  readonly queryType = 'vendor.payout.get';

  constructor(private readonly payoutRepo: VendorPayoutRepository) {
    super();
  }

  async execute(query: GetPayoutQuery): Promise<PayoutResponseDto> {
    const p = await this.payoutRepo.findById(PayoutIdVO.create(query.payoutId));
    if (!p) throw new VendorNotFoundAppError(query.payoutId);

    return {
      id: p.id.value,
      vendorId: p.vendorId.value,
      bankAccountId: p.bankAccountId.value,
      amount: p.amount.amount,
      currency: p.amount.currency,
      status: p.status.value,
      requestedAt: p.requestedAt.toISOString(),
      processedAt: p.processedAt?.toISOString() ?? null,
      failureReason: p.failureReason,
    };
  }
}

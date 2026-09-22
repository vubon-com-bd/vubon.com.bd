import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { BaseQueryHandler } from '@vubon/shared-kernel/application/queries/base.query-handler';
import { GetSubscriptionQuery } from './get-subscription.query';
import type { VendorSubscriptionRepository } from '../../../domain/repositories/vendor-subscription.repository.interface';
import { VendorIdVO } from '../../../domain/value-objects/primitives/vendor-id.vo';
import type { SubscriptionResponseDto } from '../../dtos/responses/subscription-response.dto';

@QueryHandler(GetSubscriptionQuery)
export class GetSubscriptionHandler
  extends BaseQueryHandler<GetSubscriptionQuery, SubscriptionResponseDto | null>
  implements IQueryHandler<GetSubscriptionQuery>
{
  readonly queryType = 'vendor.subscription.get';

  constructor(private readonly subscriptionRepo: VendorSubscriptionRepository) {
    super();
  }

  async execute(query: GetSubscriptionQuery): Promise<SubscriptionResponseDto | null> {
    const s = await this.subscriptionRepo.findActive(
      VendorIdVO.create(query.vendorId),
    );
    if (!s) return null;

    return {
      id: s.id.value,
      vendorId: s.vendorId.value,
      plan: s.plan.value,
      price: s.price.amount,          // ✅ .amount
      currency: s.price.currency,     // ✅ .currency
      startedAt: s.startedAt.toISOString(),
      expiresAt: s.expiresAt.toISOString(),
      autoRenew: s.autoRenew,
      cancelledAt: s.cancelledAt?.toISOString() ?? null,
      isActive: s.isActive,
    };
  }
}

import {
  BaseDomainEvent,
  type DomainEventMetadata,
} from '@vubon/shared-kernel/domain/base/base.event';
import { toTimestamp } from '@vubon/shared-types/common';

export class AffiliatePayoutProcessedEvent extends BaseDomainEvent<
  'marketing.affiliate_payout.processed',
  { payoutId: string; affiliateId: string; amount: number }
> {
  constructor(
    aggregateId: string,
    affiliateId: string,
    amount: number,
    version: number,
    metadata?: DomainEventMetadata,
  ) {
    super({
      id: crypto.randomUUID(),
      type: 'marketing.affiliate_payout.processed',
      aggregateId,
      aggregateType: 'AffiliatePayout',
      payload: { payoutId: aggregateId, affiliateId, amount },
      occurredAt: toTimestamp(Date.now()),
      version,
      metadata,
    });
  }
}

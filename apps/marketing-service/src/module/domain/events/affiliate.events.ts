import {
  BaseDomainEvent,
  type DomainEventMetadata,
} from '@vubon/shared-kernel/domain/base/base.event';
import { toTimestamp } from '@vubon/shared-types/common';

const AGGREGATE_TYPE = 'Affiliate';

export class AffiliateRegisteredEvent extends BaseDomainEvent<
  'marketing.affiliate.registered',
  { affiliateId: string; userId: string }
> {
  constructor(aggregateId: string, userId: string, version: number, metadata?: DomainEventMetadata) {
    super({
      id: crypto.randomUUID(),
      type: 'marketing.affiliate.registered',
      aggregateId,
      aggregateType: AGGREGATE_TYPE,
      payload: { affiliateId: aggregateId, userId },
      occurredAt: toTimestamp(Date.now()),
      version,
      metadata,
    });
  }
}

export class AffiliateApprovedEvent extends BaseDomainEvent<
  'marketing.affiliate.approved',
  { affiliateId: string }
> {
  constructor(aggregateId: string, version: number, metadata?: DomainEventMetadata) {
    super({
      id: crypto.randomUUID(),
      type: 'marketing.affiliate.approved',
      aggregateId,
      aggregateType: AGGREGATE_TYPE,
      payload: { affiliateId: aggregateId },
      occurredAt: toTimestamp(Date.now()),
      version,
      metadata,
    });
  }
}

export class AffiliateCommissionEarnedEvent extends BaseDomainEvent<
  'marketing.affiliate.commission_earned',
  { affiliateId: string; orderId: string; amount: number }
> {
  constructor(
    aggregateId: string,
    orderId: string,
    amount: number,
    version: number,
    metadata?: DomainEventMetadata,
  ) {
    super({
      id: crypto.randomUUID(),
      type: 'marketing.affiliate.commission_earned',
      aggregateId,
      aggregateType: AGGREGATE_TYPE,
      payload: { affiliateId: aggregateId, orderId, amount },
      occurredAt: toTimestamp(Date.now()),
      version,
      metadata,
    });
  }
}

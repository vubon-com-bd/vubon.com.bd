import {
  BaseDomainEvent,
  type DomainEventMetadata,
} from '@vubon/shared-kernel/domain/base/base.event';
import { toTimestamp } from '@vubon/shared-types/common';

const AGGREGATE_TYPE = 'Promotion';

export class PromotionCreatedEvent extends BaseDomainEvent<
  'marketing.promotion.created',
  { promotionId: string; code: string }
> {
  constructor(aggregateId: string, code: string, version: number, metadata?: DomainEventMetadata) {
    super({
      id: crypto.randomUUID(),
      type: 'marketing.promotion.created',
      aggregateId,
      aggregateType: AGGREGATE_TYPE,
      payload: { promotionId: aggregateId, code },
      occurredAt: toTimestamp(Date.now()),
      version,
      metadata,
    });
  }
}

export class PromotionAppliedEvent extends BaseDomainEvent<
  'marketing.promotion.applied',
  { promotionId: string; userId: string }
> {
  constructor(aggregateId: string, userId: string, version: number, metadata?: DomainEventMetadata) {
    super({
      id: crypto.randomUUID(),
      type: 'marketing.promotion.applied',
      aggregateId,
      aggregateType: AGGREGATE_TYPE,
      payload: { promotionId: aggregateId, userId },
      occurredAt: toTimestamp(Date.now()),
      version,
      metadata,
    });
  }
}

export class PromotionExpiredEvent extends BaseDomainEvent<
  'marketing.promotion.expired',
  { promotionId: string }
> {
  constructor(aggregateId: string, version: number, metadata?: DomainEventMetadata) {
    super({
      id: crypto.randomUUID(),
      type: 'marketing.promotion.expired',
      aggregateId,
      aggregateType: AGGREGATE_TYPE,
      payload: { promotionId: aggregateId },
      occurredAt: toTimestamp(Date.now()),
      version,
      metadata,
    });
  }
}

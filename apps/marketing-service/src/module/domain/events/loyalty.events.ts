import {
  BaseDomainEvent,
  type DomainEventMetadata,
} from '@vubon/shared-kernel/domain/base/base.event';
import { toTimestamp } from '@vubon/shared-types/common';

const AGGREGATE_TYPE = 'Loyalty';

export class LoyaltyPointsEarnedEvent extends BaseDomainEvent<
  'marketing.loyalty.points_earned',
  { loyaltyId: string; points: number }
> {
  constructor(aggregateId: string, points: number, version: number, metadata?: DomainEventMetadata) {
    super({
      id: crypto.randomUUID(),
      type: 'marketing.loyalty.points_earned',
      aggregateId,
      aggregateType: AGGREGATE_TYPE,
      payload: { loyaltyId: aggregateId, points },
      occurredAt: toTimestamp(Date.now()),
      version,
      metadata,
    });
  }
}

export class LoyaltyPointsRedeemedEvent extends BaseDomainEvent<
  'marketing.loyalty.points_redeemed',
  { loyaltyId: string; points: number }
> {
  constructor(aggregateId: string, points: number, version: number, metadata?: DomainEventMetadata) {
    super({
      id: crypto.randomUUID(),
      type: 'marketing.loyalty.points_redeemed',
      aggregateId,
      aggregateType: AGGREGATE_TYPE,
      payload: { loyaltyId: aggregateId, points },
      occurredAt: toTimestamp(Date.now()),
      version,
      metadata,
    });
  }
}

export class LoyaltyTierUpgradedEvent extends BaseDomainEvent<
  'marketing.loyalty.tier_upgraded',
  { loyaltyId: string; newTier: string }
> {
  constructor(aggregateId: string, newTier: string, version: number, metadata?: DomainEventMetadata) {
    super({
      id: crypto.randomUUID(),
      type: 'marketing.loyalty.tier_upgraded',
      aggregateId,
      aggregateType: AGGREGATE_TYPE,
      payload: { loyaltyId: aggregateId, newTier },
      occurredAt: toTimestamp(Date.now()),
      version,
      metadata,
    });
  }
}

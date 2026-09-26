import {
  BaseDomainEvent,
  type DomainEventMetadata,
} from '@vubon/shared-kernel/domain/base/base.event';
import { toTimestamp } from '@vubon/shared-types/common';

const AGGREGATE_TYPE = 'Referral';

export class ReferralCreatedEvent extends BaseDomainEvent<
  'marketing.referral.created',
  { referralId: string; referrerId: string }
> {
  constructor(aggregateId: string, referrerId: string, version: number, metadata?: DomainEventMetadata) {
    super({
      id: crypto.randomUUID(),
      type: 'marketing.referral.created',
      aggregateId,
      aggregateType: AGGREGATE_TYPE,
      payload: { referralId: aggregateId, referrerId },
      occurredAt: toTimestamp(Date.now()),
      version,
      metadata,
    });
  }
}

export class ReferralConvertedEvent extends BaseDomainEvent<
  'marketing.referral.converted',
  { referralId: string; refereeId: string }
> {
  constructor(aggregateId: string, refereeId: string, version: number, metadata?: DomainEventMetadata) {
    super({
      id: crypto.randomUUID(),
      type: 'marketing.referral.converted',
      aggregateId,
      aggregateType: AGGREGATE_TYPE,
      payload: { referralId: aggregateId, refereeId },
      occurredAt: toTimestamp(Date.now()),
      version,
      metadata,
    });
  }
}

export class ReferralRewardedEvent extends BaseDomainEvent<
  'marketing.referral.rewarded',
  { referralId: string; reward: number }
> {
  constructor(aggregateId: string, reward: number, version: number, metadata?: DomainEventMetadata) {
    super({
      id: crypto.randomUUID(),
      type: 'marketing.referral.rewarded',
      aggregateId,
      aggregateType: AGGREGATE_TYPE,
      payload: { referralId: aggregateId, reward },
      occurredAt: toTimestamp(Date.now()),
      version,
      metadata,
    });
  }
}

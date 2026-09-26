import {
  BaseDomainEvent,
  type DomainEventMetadata,
} from '@vubon/shared-kernel/domain/base/base.event';
import { toTimestamp } from '@vubon/shared-types/common';

const AGGREGATE_TYPE = 'VendorSubscription';

export class SubscriptionCreatedEvent extends BaseDomainEvent<
  'vendor.subscription.created',
  { subscriptionId: string; vendorId: string; plan: string }
> {
  constructor(
    aggregateId: string,
    subscriptionId: string,
    vendorId: string,
    plan: string,
    version: number,
    metadata?: DomainEventMetadata,
  ) {
    super({
      id: crypto.randomUUID(),
      type: 'vendor.subscription.created',
      aggregateId,
      aggregateType: AGGREGATE_TYPE,
      payload: { subscriptionId, vendorId, plan },
      occurredAt: toTimestamp(Date.now()),
      version,
      metadata,
    });
  }
}

export class SubscriptionChangedEvent extends BaseDomainEvent<
  'vendor.subscription.changed',
  { subscriptionId: string; vendorId: string; fromPlan: string; toPlan: string }
> {
  constructor(
    aggregateId: string,
    subscriptionId: string,
    vendorId: string,
    fromPlan: string,
    toPlan: string,
    version: number,
    metadata?: DomainEventMetadata,
  ) {
    super({
      id: crypto.randomUUID(),
      type: 'vendor.subscription.changed',
      aggregateId,
      aggregateType: AGGREGATE_TYPE,
      payload: { subscriptionId, vendorId, fromPlan, toPlan },
      occurredAt: toTimestamp(Date.now()),
      version,
      metadata,
    });
  }
}

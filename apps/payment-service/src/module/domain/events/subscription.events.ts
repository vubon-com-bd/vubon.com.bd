import { BaseDomainEvent, type DomainEventMetadata } from '@vubon/shared-kernel/domain/base/base.event';
import { toTimestamp } from '@vubon/shared-types/common';

export class SubscriptionCreatedEvent extends BaseDomainEvent<'subscription.created', { subscriptionId: string; userId: string; plan: string }> {
  constructor(subscriptionId: string, userId: string, plan: string, version: number, metadata?: DomainEventMetadata) {
    super({ id: crypto.randomUUID(), type: 'subscription.created', aggregateId: subscriptionId, aggregateType: 'Subscription', payload: { subscriptionId, userId, plan }, occurredAt: toTimestamp(Date.now()), version, metadata });
  }
}

export class SubscriptionRenewedEvent extends BaseDomainEvent<'subscription.renewed', { subscriptionId: string; userId: string }> {
  constructor(subscriptionId: string, userId: string, version: number, metadata?: DomainEventMetadata) {
    super({ id: crypto.randomUUID(), type: 'subscription.renewed', aggregateId: subscriptionId, aggregateType: 'Subscription', payload: { subscriptionId, userId }, occurredAt: toTimestamp(Date.now()), version, metadata });
  }
}

export class SubscriptionCancelledEvent extends BaseDomainEvent<'subscription.cancelled', { subscriptionId: string; userId: string }> {
  constructor(subscriptionId: string, userId: string, version: number, metadata?: DomainEventMetadata) {
    super({ id: crypto.randomUUID(), type: 'subscription.cancelled', aggregateId: subscriptionId, aggregateType: 'Subscription', payload: { subscriptionId, userId }, occurredAt: toTimestamp(Date.now()), version, metadata });
  }
}

import { BaseDomainEvent, type DomainEventMetadata } from '@vubon/shared-kernel/domain/base/base.event';
import { toTimestamp } from '@vubon/shared-types/common';

const AGG = 'AbandonedCart';

export class CartAbandonedEvent extends BaseDomainEvent<'cart.abandoned', { abandonedId: string; cartId: string; userId: string | null; itemCount: number }> {
  constructor(abandonedId: string, cartId: string, userId: string | null, itemCount: number, version: number, metadata?: DomainEventMetadata) {
    super({ id: crypto.randomUUID(), type: 'cart.abandoned', aggregateId: abandonedId, aggregateType: AGG, payload: { abandonedId, cartId, userId, itemCount }, occurredAt: toTimestamp(Date.now()), version, metadata });
  }
}

export class CartRecoveredEvent extends BaseDomainEvent<'cart.recovered', { abandonedId: string; cartId: string }> {
  constructor(abandonedId: string, cartId: string, version: number, metadata?: DomainEventMetadata) {
    super({ id: crypto.randomUUID(), type: 'cart.recovered', aggregateId: abandonedId, aggregateType: AGG, payload: { abandonedId, cartId }, occurredAt: toTimestamp(Date.now()), version, metadata });
  }
}

export class ReminderSentEvent extends BaseDomainEvent<'cart.reminder_sent', { abandonedId: string; channel: string }> {
  constructor(abandonedId: string, channel: string, version: number, metadata?: DomainEventMetadata) {
    super({ id: crypto.randomUUID(), type: 'cart.reminder_sent', aggregateId: abandonedId, aggregateType: AGG, payload: { abandonedId, channel }, occurredAt: toTimestamp(Date.now()), version, metadata });
  }
}

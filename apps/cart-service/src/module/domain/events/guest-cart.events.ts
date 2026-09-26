import { BaseDomainEvent, type DomainEventMetadata } from '@vubon/shared-kernel/domain/base/base.event';
import { toTimestamp } from '@vubon/shared-types/common';

const AGG = 'GuestCart';

export class GuestCartCreatedEvent extends BaseDomainEvent<'cart.guest.created', { guestCartId: string; cartId: string }> {
  constructor(guestCartId: string, cartId: string, version: number, metadata?: DomainEventMetadata) {
    super({ id: crypto.randomUUID(), type: 'cart.guest.created', aggregateId: guestCartId, aggregateType: AGG, payload: { guestCartId, cartId }, occurredAt: toTimestamp(Date.now()), version, metadata });
  }
}

export class GuestCartMergedEvent extends BaseDomainEvent<'cart.guest.merged', { guestCartId: string; cartId: string; userId: string }> {
  constructor(guestCartId: string, cartId: string, userId: string, version: number, metadata?: DomainEventMetadata) {
    super({ id: crypto.randomUUID(), type: 'cart.guest.merged', aggregateId: guestCartId, aggregateType: AGG, payload: { guestCartId, cartId, userId }, occurredAt: toTimestamp(Date.now()), version, metadata });
  }
}

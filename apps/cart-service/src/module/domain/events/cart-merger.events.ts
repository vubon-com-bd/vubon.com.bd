/**
 * Cart merger domain events
 * @module cart-service/domain/events
 */
import { BaseDomainEvent } from '@vubon/shared-kernel/domain/base/base.event';
import type { DomainEventMetadata } from '@vubon/shared-kernel/domain/base/base.event';
import type { Timestamp } from '@vubon/shared-types/common';
import { CART_MERGER_AGGREGATE_TYPE, newEventId, now } from './event.helpers.js';

export const CART_MERGER_EVENT_TYPE = {
  MERGED: 'cart.merged',
  CONFLICT: 'cart.merge.conflict',
} as const;

export interface CartMergedPayload {
  readonly mergerId: string;
  readonly sourceCartId: string;
  readonly targetCartId: string;
  readonly strategy: string;
  readonly itemsMerged: number;
  readonly conflicts: number;
  readonly userId: string;
}

export interface CartMergeConflictPayload {
  readonly mergerId: string;
  readonly sourceCartId: string;
  readonly targetCartId: string;
  readonly productId: string;
  readonly reason: string;
}

type EventParams<TPayload> = {
  id?: string;
  aggregateId: string;
  payload: TPayload;
  occurredAt?: Timestamp;
  version?: number;
  metadata?: DomainEventMetadata;
};

export class CartMergedEvent extends BaseDomainEvent<
  typeof CART_MERGER_EVENT_TYPE.MERGED,
  CartMergedPayload
> {
  constructor(p: EventParams<CartMergedPayload>) {
    super({
      id: p.id ?? newEventId(),
      type: CART_MERGER_EVENT_TYPE.MERGED,
      aggregateId: p.aggregateId,
      aggregateType: CART_MERGER_AGGREGATE_TYPE,
      payload: p.payload,
      occurredAt: p.occurredAt ?? now(),
      version: p.version ?? 1,
      metadata: p.metadata,
    });
  }
}

export class CartMergeConflictEvent extends BaseDomainEvent<
  typeof CART_MERGER_EVENT_TYPE.CONFLICT,
  CartMergeConflictPayload
> {
  constructor(p: EventParams<CartMergeConflictPayload>) {
    super({
      id: p.id ?? newEventId(),
      type: CART_MERGER_EVENT_TYPE.CONFLICT,
      aggregateId: p.aggregateId,
      aggregateType: CART_MERGER_AGGREGATE_TYPE,
      payload: p.payload,
      occurredAt: p.occurredAt ?? now(),
      version: p.version ?? 1,
      metadata: p.metadata,
    });
  }
}

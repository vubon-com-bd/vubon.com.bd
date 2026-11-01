/**
 * CartMerger Domain Events
 * @module cart-service/domain/events
 */
import { BaseDomainEvent } from '@vubon/shared-kernel/domain/base/base.event';
import type { DomainEventMetadata } from '@vubon/shared-kernel/domain/base/base.event';
import type { Timestamp } from '@vubon/shared-types/common';
import { CART_AGGREGATE_TYPE, newEventId, nowTimestamp } from './event.helpers.js';

export const CART_MERGER_EVENT_TYPE = {
  STARTED: 'cart.cart_merger.started',
  COMPLETED: 'cart.cart_merger.completed',
  FAILED: 'cart.cart_merger.failed',
  CONFLICT_RESOLVED: 'cart.cart_merger.conflict_resolved',
} as const;

type EventParams<TPayload> = {
  id?: string;
  aggregateId: string;
  payload: TPayload;
  occurredAt?: Timestamp;
  version?: number;
  metadata?: DomainEventMetadata;
};

function buildParams<TType extends string, TPayload>(
  type: TType,
  p: EventParams<TPayload>,
) {
  return {
    id: p.id ?? newEventId(),
    type,
    aggregateId: p.aggregateId,
    aggregateType: CART_AGGREGATE_TYPE.CART_MERGER,
    payload: p.payload,
    occurredAt: p.occurredAt ?? nowTimestamp(),
    version: p.version ?? 1,
    metadata: p.metadata,
  };
}

export class CartMergerStartedEvent extends BaseDomainEvent<
  typeof CART_MERGER_EVENT_TYPE.STARTED,
  { mergerId: string; sourceCartId: string; targetCartId: string; strategy: string }
> {
  constructor(
    p: EventParams<{
      mergerId: string;
      sourceCartId: string;
      targetCartId: string;
      strategy: string;
    }>,
  ) {
    super(buildParams(CART_MERGER_EVENT_TYPE.STARTED, p));
  }
}

export class CartMergerCompletedEvent extends BaseDomainEvent<
  typeof CART_MERGER_EVENT_TYPE.COMPLETED,
  { mergerId: string; itemsMerged: number; conflicts: number; mergedAt: string }
> {
  constructor(
    p: EventParams<{
      mergerId: string;
      itemsMerged: number;
      conflicts: number;
      mergedAt: string;
    }>,
  ) {
    super(buildParams(CART_MERGER_EVENT_TYPE.COMPLETED, p));
  }
}

export class CartMergerFailedEvent extends BaseDomainEvent<
  typeof CART_MERGER_EVENT_TYPE.FAILED,
  { mergerId: string; reason: string; failedAt: string }
> {
  constructor(
    p: EventParams<{ mergerId: string; reason: string; failedAt: string }>,
  ) {
    super(buildParams(CART_MERGER_EVENT_TYPE.FAILED, p));
  }
}

export class CartMergerConflictResolvedEvent extends BaseDomainEvent<
  typeof CART_MERGER_EVENT_TYPE.CONFLICT_RESOLVED,
  { mergerId: string; productId: string; resolution: string }
> {
  constructor(
    p: EventParams<{ mergerId: string; productId: string; resolution: string }>,
  ) {
    super(buildParams(CART_MERGER_EVENT_TYPE.CONFLICT_RESOLVED, p));
  }
}

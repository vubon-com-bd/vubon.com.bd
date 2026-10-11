/**
 * Broadcast domain events
 * @module notification-service/domain/events
 */
import { BaseDomainEvent } from '@vubon/shared-kernel/domain/base/base.event';
import type { DomainEventMetadata } from '@vubon/shared-kernel/domain/base/base.event';
import type { Timestamp } from '@vubon/shared-types/common';
import { BROADCAST_AGGREGATE_TYPE, newEventId, now } from './event.helpers.js';

export const BROADCAST_EVENT_TYPE = {
  CREATED: 'broadcast.created',
  SCHEDULED: 'broadcast.scheduled',
  STARTED: 'broadcast.started',
  PROGRESS: 'broadcast.progress',
  COMPLETED: 'broadcast.completed',
  PARTIALLY_COMPLETED: 'broadcast.partially_completed',
  FAILED: 'broadcast.failed',
  CANCELLED: 'broadcast.cancelled',
} as const;

export interface BroadcastCreatedPayload {
  readonly broadcastId: string;
  readonly type: string;
  readonly target: string;
  readonly createdBy: string;
  readonly estimatedRecipients?: number;
}

export interface BroadcastScheduledPayload {
  readonly broadcastId: string;
  readonly scheduledAt: string;
}

export interface BroadcastStartedPayload {
  readonly broadcastId: string;
  readonly startedAt: string;
  readonly totalRecipients: number;
  readonly batchSize: number;
}

export interface BroadcastProgressPayload {
  readonly broadcastId: string;
  readonly processed: number;
  readonly total: number;
  readonly succeeded: number;
  readonly failed: number;
}

export interface BroadcastCompletedPayload {
  readonly broadcastId: string;
  readonly completedAt: string;
  readonly totalRecipients: number;
  readonly succeeded: number;
  readonly failed: number;
}

export interface BroadcastPartiallyCompletedPayload {
  readonly broadcastId: string;
  readonly completedAt: string;
  readonly totalRecipients: number;
  readonly succeeded: number;
  readonly failed: number;
  readonly failureReasons?: readonly string[];
}

export interface BroadcastFailedPayload {
  readonly broadcastId: string;
  readonly failedAt: string;
  readonly reason: string;
  readonly processedBeforeFailure: number;
}

export interface BroadcastCancelledPayload {
  readonly broadcastId: string;
  readonly cancelledAt: string;
  readonly cancelledBy?: string;
  readonly reason?: string;
}

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
    aggregateType: BROADCAST_AGGREGATE_TYPE,
    payload: p.payload,
    occurredAt: p.occurredAt ?? now(),
    version: p.version ?? 1,
    metadata: p.metadata,
  };
}

export class BroadcastCreatedEvent extends BaseDomainEvent<
  typeof BROADCAST_EVENT_TYPE.CREATED,
  BroadcastCreatedPayload
> {
  constructor(p: EventParams<BroadcastCreatedPayload>) {
    super(buildParams(BROADCAST_EVENT_TYPE.CREATED, p));
  }
}

export class BroadcastScheduledEvent extends BaseDomainEvent<
  typeof BROADCAST_EVENT_TYPE.SCHEDULED,
  BroadcastScheduledPayload
> {
  constructor(p: EventParams<BroadcastScheduledPayload>) {
    super(buildParams(BROADCAST_EVENT_TYPE.SCHEDULED, p));
  }
}

export class BroadcastStartedEvent extends BaseDomainEvent<
  typeof BROADCAST_EVENT_TYPE.STARTED,
  BroadcastStartedPayload
> {
  constructor(p: EventParams<BroadcastStartedPayload>) {
    super(buildParams(BROADCAST_EVENT_TYPE.STARTED, p));
  }
}

export class BroadcastProgressEvent extends BaseDomainEvent<
  typeof BROADCAST_EVENT_TYPE.PROGRESS,
  BroadcastProgressPayload
> {
  constructor(p: EventParams<BroadcastProgressPayload>) {
    super(buildParams(BROADCAST_EVENT_TYPE.PROGRESS, p));
  }
}

export class BroadcastCompletedEvent extends BaseDomainEvent<
  typeof BROADCAST_EVENT_TYPE.COMPLETED,
  BroadcastCompletedPayload
> {
  constructor(p: EventParams<BroadcastCompletedPayload>) {
    super(buildParams(BROADCAST_EVENT_TYPE.COMPLETED, p));
  }
}

export class BroadcastPartiallyCompletedEvent extends BaseDomainEvent<
  typeof BROADCAST_EVENT_TYPE.PARTIALLY_COMPLETED,
  BroadcastPartiallyCompletedPayload
> {
  constructor(p: EventParams<BroadcastPartiallyCompletedPayload>) {
    super(buildParams(BROADCAST_EVENT_TYPE.PARTIALLY_COMPLETED, p));
  }
}

export class BroadcastFailedEvent extends BaseDomainEvent<
  typeof BROADCAST_EVENT_TYPE.FAILED,
  BroadcastFailedPayload
> {
  constructor(p: EventParams<BroadcastFailedPayload>) {
    super(buildParams(BROADCAST_EVENT_TYPE.FAILED, p));
  }
}

export class BroadcastCancelledEvent extends BaseDomainEvent<
  typeof BROADCAST_EVENT_TYPE.CANCELLED,
  BroadcastCancelledPayload
> {
  constructor(p: EventParams<BroadcastCancelledPayload>) {
    super(buildParams(BROADCAST_EVENT_TYPE.CANCELLED, p));
  }
}

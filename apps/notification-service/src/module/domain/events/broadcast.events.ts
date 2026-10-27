/* istanbul ignore file -- pure event declarations */
/**
 * Broadcast Domain Events
 * @module notification-service/domain/events
 */
import { BaseDomainEvent } from '@vubon/shared-kernel/domain/base/base.event';
import type { DomainEventMetadata } from '@vubon/shared-kernel/domain/base/base.event';
import type { Timestamp } from '@vubon/shared-types/common';
import { NOTIFICATION_AGGREGATE_TYPE, newEventId, nowTimestamp } from './event.helpers.js';

export const BROADCAST_EVENT_TYPE = {
  CREATED: 'notification.broadcast.created',
  SCHEDULED: 'notification.broadcast.scheduled',
  APPROVED: 'notification.broadcast.approved',
  STARTED: 'notification.broadcast.started',
  COMPLETED: 'notification.broadcast.completed',
  FAILED: 'notification.broadcast.failed',
  CANCELLED: 'notification.broadcast.cancelled',
} as const;

export interface BroadcastCreatedPayload {
  readonly broadcastId: string;
  readonly name: string;
  readonly type: string;
  readonly target: string;
  readonly channels: readonly string[];
  readonly createdBy: string;
  readonly createdAt: string;
}

export interface BroadcastScheduledPayload {
  readonly broadcastId: string;
  readonly scheduledAt: string;
  readonly recipientCount: number;
}

export interface BroadcastApprovedPayload {
  readonly broadcastId: string;
  readonly approvedBy: string;
  readonly approvedAt: string;
}

export interface BroadcastStartedPayload {
  readonly broadcastId: string;
  readonly startedAt: string;
  readonly recipientCount: number;
}

export interface BroadcastCompletedPayload {
  readonly broadcastId: string;
  readonly completedAt: string;
  readonly recipientCount: number;
  readonly sentCount: number;
  readonly failedCount: number;
}

export interface BroadcastFailedPayload {
  readonly broadcastId: string;
  readonly reason: string;
  readonly failedAt: string;
  readonly sentCount: number;
  readonly failedCount: number;
}

export interface BroadcastCancelledPayload {
  readonly broadcastId: string;
  readonly reason?: string;
  readonly cancelledBy?: string;
  readonly cancelledAt: string;
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
    aggregateType: NOTIFICATION_AGGREGATE_TYPE.BROADCAST,
    payload: p.payload,
    occurredAt: p.occurredAt ?? nowTimestamp(),
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

export class BroadcastApprovedEvent extends BaseDomainEvent<
  typeof BROADCAST_EVENT_TYPE.APPROVED,
  BroadcastApprovedPayload
> {
  constructor(p: EventParams<BroadcastApprovedPayload>) {
    super(buildParams(BROADCAST_EVENT_TYPE.APPROVED, p));
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

export class BroadcastCompletedEvent extends BaseDomainEvent<
  typeof BROADCAST_EVENT_TYPE.COMPLETED,
  BroadcastCompletedPayload
> {
  constructor(p: EventParams<BroadcastCompletedPayload>) {
    super(buildParams(BROADCAST_EVENT_TYPE.COMPLETED, p));
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

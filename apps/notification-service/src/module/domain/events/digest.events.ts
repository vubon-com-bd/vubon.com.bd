/**
 * Digest domain events
 * @module notification-service/domain/events
 */
import { BaseDomainEvent } from '@vubon/shared-kernel/domain/base/base.event';
import type { DomainEventMetadata } from '@vubon/shared-kernel/domain/base/base.event';
import type { Timestamp } from '@vubon/shared-types/common';
import { DIGEST_AGGREGATE_TYPE, newEventId, now } from './event.helpers.js';

export const DIGEST_EVENT_TYPE = {
  CREATED: 'digest.created',
  GENERATING: 'digest.generating',
  READY: 'digest.ready',
  SENT: 'digest.sent',
  FAILED: 'digest.failed',
  CANCELLED: 'digest.cancelled',
} as const;

export interface DigestCreatedPayload {
  readonly digestId: string;
  readonly userId: string;
  readonly frequency: string;
  readonly type: string;
  readonly periodStart: string;
  readonly periodEnd: string;
}

export interface DigestGeneratingPayload {
  readonly digestId: string;
  readonly startedAt: string;
}

export interface DigestReadyPayload {
  readonly digestId: string;
  readonly readyAt: string;
  readonly itemCount: number;
}

export interface DigestSentPayload {
  readonly digestId: string;
  readonly sentAt: string;
  readonly channel: string;
  readonly itemCount: number;
}

export interface DigestFailedPayload {
  readonly digestId: string;
  readonly failedAt: string;
  readonly reason: string;
}

export interface DigestCancelledPayload {
  readonly digestId: string;
  readonly cancelledAt: string;
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
    aggregateType: DIGEST_AGGREGATE_TYPE,
    payload: p.payload,
    occurredAt: p.occurredAt ?? now(),
    version: p.version ?? 1,
    metadata: p.metadata,
  };
}

export class DigestCreatedEvent extends BaseDomainEvent<
  typeof DIGEST_EVENT_TYPE.CREATED,
  DigestCreatedPayload
> {
  constructor(p: EventParams<DigestCreatedPayload>) {
    super(buildParams(DIGEST_EVENT_TYPE.CREATED, p));
  }
}

export class DigestGeneratingEvent extends BaseDomainEvent<
  typeof DIGEST_EVENT_TYPE.GENERATING,
  DigestGeneratingPayload
> {
  constructor(p: EventParams<DigestGeneratingPayload>) {
    super(buildParams(DIGEST_EVENT_TYPE.GENERATING, p));
  }
}

export class DigestReadyEvent extends BaseDomainEvent<
  typeof DIGEST_EVENT_TYPE.READY,
  DigestReadyPayload
> {
  constructor(p: EventParams<DigestReadyPayload>) {
    super(buildParams(DIGEST_EVENT_TYPE.READY, p));
  }
}

export class DigestSentEvent extends BaseDomainEvent<
  typeof DIGEST_EVENT_TYPE.SENT,
  DigestSentPayload
> {
  constructor(p: EventParams<DigestSentPayload>) {
    super(buildParams(DIGEST_EVENT_TYPE.SENT, p));
  }
}

export class DigestFailedEvent extends BaseDomainEvent<
  typeof DIGEST_EVENT_TYPE.FAILED,
  DigestFailedPayload
> {
  constructor(p: EventParams<DigestFailedPayload>) {
    super(buildParams(DIGEST_EVENT_TYPE.FAILED, p));
  }
}

export class DigestCancelledEvent extends BaseDomainEvent<
  typeof DIGEST_EVENT_TYPE.CANCELLED,
  DigestCancelledPayload
> {
  constructor(p: EventParams<DigestCancelledPayload>) {
    super(buildParams(DIGEST_EVENT_TYPE.CANCELLED, p));
  }
}

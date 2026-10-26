/* istanbul ignore file -- pure event declarations */
/**
 * Digest Domain Events
 * @module notification-service/domain/events
 */
import { BaseDomainEvent } from '@vubon/shared-kernel/domain/base/base.event';
import type { DomainEventMetadata } from '@vubon/shared-kernel/domain/base/base.event';
import type { Timestamp } from '@vubon/shared-types/common';
import { NOTIFICATION_AGGREGATE_TYPE, newEventId, nowTimestamp } from './event.helpers.js';

export const DIGEST_EVENT_TYPE = {
  CREATED: 'digest.created',
  GENERATED: 'digest.generated',
  SENT: 'digest.sent',
  FAILED: 'digest.failed',
  CANCELLED: 'digest.cancelled',
} as const;

export interface DigestCreatedPayload {
  readonly digestId: string;
  readonly userId: string;
  readonly frequency: string;
  readonly type: string;
  readonly createdAt: string;
}

export interface DigestGeneratedPayload {
  readonly digestId: string;
  readonly userId: string;
  readonly itemCount: number;
  readonly generatedAt: string;
}

export interface DigestSentPayload {
  readonly digestId: string;
  readonly userId: string;
  readonly itemCount: number;
  readonly sentAt: string;
}

export interface DigestFailedPayload {
  readonly digestId: string;
  readonly userId: string;
  readonly reason: string;
  readonly failedAt: string;
}

export interface DigestCancelledPayload {
  readonly digestId: string;
  readonly userId: string;
  readonly reason?: string;
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
    aggregateType: NOTIFICATION_AGGREGATE_TYPE.DIGEST,
    payload: p.payload,
    occurredAt: p.occurredAt ?? nowTimestamp(),
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

export class DigestGeneratedEvent extends BaseDomainEvent<
  typeof DIGEST_EVENT_TYPE.GENERATED,
  DigestGeneratedPayload
> {
  constructor(p: EventParams<DigestGeneratedPayload>) {
    super(buildParams(DIGEST_EVENT_TYPE.GENERATED, p));
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

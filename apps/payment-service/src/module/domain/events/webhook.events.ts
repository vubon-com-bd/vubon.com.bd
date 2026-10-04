/**
 * Webhook domain events
 * @module payment-service/domain/events
 */
import { BaseDomainEvent } from '@vubon/shared-kernel/domain/base/base.event';
import type { DomainEventMetadata } from '@vubon/shared-kernel/domain/base/base.event';
import type { Timestamp } from '@vubon/shared-types/common';
import { WEBHOOK_EVENT_AGGREGATE_TYPE, newEventId, now } from './event.helpers.js';

export const WEBHOOK_EVENT_TYPE = {
  RECEIVED: 'webhook.received',
  VERIFIED: 'webhook.verified',
  PROCESSED: 'webhook.processed',
  FAILED: 'webhook.failed',
  DUPLICATE: 'webhook.duplicate',
} as const;

export interface WebhookReceivedPayload {
  readonly webhookId: string;
  readonly gateway: string;
  readonly gatewayEventId: string;
  readonly eventType: string;
  readonly receivedAt: string;
}

export interface WebhookVerifiedPayload {
  readonly webhookId: string;
  readonly gateway: string;
  readonly verifiedAt: string;
}

export interface WebhookProcessedPayload {
  readonly webhookId: string;
  readonly gateway: string;
  readonly processedAt: string;
  readonly paymentId?: string;
}

export interface WebhookFailedPayload {
  readonly webhookId: string;
  readonly gateway: string;
  readonly reason: string;
  readonly attempts: number;
}

export interface WebhookDuplicatePayload {
  readonly webhookId: string;
  readonly gateway: string;
  readonly gatewayEventId: string;
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
    aggregateType: WEBHOOK_EVENT_AGGREGATE_TYPE,
    payload: p.payload,
    occurredAt: p.occurredAt ?? now(),
    version: p.version ?? 1,
    metadata: p.metadata,
  };
}

export class WebhookReceivedEvent extends BaseDomainEvent<
  typeof WEBHOOK_EVENT_TYPE.RECEIVED,
  WebhookReceivedPayload
> {
  constructor(p: EventParams<WebhookReceivedPayload>) {
    super(buildParams(WEBHOOK_EVENT_TYPE.RECEIVED, p));
  }
}

export class WebhookVerifiedEvent extends BaseDomainEvent<
  typeof WEBHOOK_EVENT_TYPE.VERIFIED,
  WebhookVerifiedPayload
> {
  constructor(p: EventParams<WebhookVerifiedPayload>) {
    super(buildParams(WEBHOOK_EVENT_TYPE.VERIFIED, p));
  }
}

export class WebhookProcessedEvent extends BaseDomainEvent<
  typeof WEBHOOK_EVENT_TYPE.PROCESSED,
  WebhookProcessedPayload
> {
  constructor(p: EventParams<WebhookProcessedPayload>) {
    super(buildParams(WEBHOOK_EVENT_TYPE.PROCESSED, p));
  }
}

export class WebhookFailedEvent extends BaseDomainEvent<
  typeof WEBHOOK_EVENT_TYPE.FAILED,
  WebhookFailedPayload
> {
  constructor(p: EventParams<WebhookFailedPayload>) {
    super(buildParams(WEBHOOK_EVENT_TYPE.FAILED, p));
  }
}

export class WebhookDuplicateEvent extends BaseDomainEvent<
  typeof WEBHOOK_EVENT_TYPE.DUPLICATE,
  WebhookDuplicatePayload
> {
  constructor(p: EventParams<WebhookDuplicatePayload>) {
    super(buildParams(WEBHOOK_EVENT_TYPE.DUPLICATE, p));
  }
}

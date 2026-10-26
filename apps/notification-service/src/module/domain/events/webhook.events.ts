/* istanbul ignore file -- pure event declarations */
/**
 * Webhook Domain Events
 * @module notification-service/domain/events
 */
import { BaseDomainEvent } from '@vubon/shared-kernel/domain/base/base.event';
import type { DomainEventMetadata } from '@vubon/shared-kernel/domain/base/base.event';
import type { Timestamp } from '@vubon/shared-types/common';
import { NOTIFICATION_AGGREGATE_TYPE, newEventId, nowTimestamp } from './event.helpers.js';

export const WEBHOOK_EVENT_TYPE = {
  REGISTERED: 'webhook.registered',
  UPDATED: 'webhook.updated',
  ACTIVATED: 'webhook.activated',
  PAUSED: 'webhook.paused',
  DISABLED: 'webhook.disabled',
  DELIVERED: 'webhook.delivered',
  DELIVERY_FAILED: 'webhook.delivery_failed',
} as const;

export interface WebhookRegisteredPayload {
  readonly webhookId: string;
  readonly name: string;
  readonly type: string;
  readonly url: string;
  readonly events: readonly string[];
  readonly registeredAt: string;
}

export interface WebhookUpdatedPayload {
  readonly webhookId: string;
  readonly changedFields: readonly string[];
  readonly updatedAt: string;
}

export interface WebhookActivatedPayload {
  readonly webhookId: string;
  readonly activatedAt: string;
}

export interface WebhookPausedPayload {
  readonly webhookId: string;
  readonly reason?: string;
  readonly pausedAt: string;
}

export interface WebhookDisabledPayload {
  readonly webhookId: string;
  readonly reason?: string;
  readonly disabledAt: string;
}

export interface WebhookDeliveredPayload {
  readonly webhookId: string;
  readonly deliveryId: string;
  readonly event: string;
  readonly responseStatus: number;
  readonly durationMs: number;
  readonly deliveredAt: string;
}

export interface WebhookDeliveryFailedPayload {
  readonly webhookId: string;
  readonly deliveryId: string;
  readonly event: string;
  readonly attemptNumber: number;
  readonly reason: string;
  readonly responseStatus?: number;
  readonly failedAt: string;
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
    aggregateType: NOTIFICATION_AGGREGATE_TYPE.WEBHOOK,
    payload: p.payload,
    occurredAt: p.occurredAt ?? nowTimestamp(),
    version: p.version ?? 1,
    metadata: p.metadata,
  };
}

export class WebhookRegisteredEvent extends BaseDomainEvent<
  typeof WEBHOOK_EVENT_TYPE.REGISTERED,
  WebhookRegisteredPayload
> {
  constructor(p: EventParams<WebhookRegisteredPayload>) {
    super(buildParams(WEBHOOK_EVENT_TYPE.REGISTERED, p));
  }
}

export class WebhookUpdatedEvent extends BaseDomainEvent<
  typeof WEBHOOK_EVENT_TYPE.UPDATED,
  WebhookUpdatedPayload
> {
  constructor(p: EventParams<WebhookUpdatedPayload>) {
    super(buildParams(WEBHOOK_EVENT_TYPE.UPDATED, p));
  }
}

export class WebhookActivatedEvent extends BaseDomainEvent<
  typeof WEBHOOK_EVENT_TYPE.ACTIVATED,
  WebhookActivatedPayload
> {
  constructor(p: EventParams<WebhookActivatedPayload>) {
    super(buildParams(WEBHOOK_EVENT_TYPE.ACTIVATED, p));
  }
}

export class WebhookPausedEvent extends BaseDomainEvent<
  typeof WEBHOOK_EVENT_TYPE.PAUSED,
  WebhookPausedPayload
> {
  constructor(p: EventParams<WebhookPausedPayload>) {
    super(buildParams(WEBHOOK_EVENT_TYPE.PAUSED, p));
  }
}

export class WebhookDisabledEvent extends BaseDomainEvent<
  typeof WEBHOOK_EVENT_TYPE.DISABLED,
  WebhookDisabledPayload
> {
  constructor(p: EventParams<WebhookDisabledPayload>) {
    super(buildParams(WEBHOOK_EVENT_TYPE.DISABLED, p));
  }
}

export class WebhookDeliveredEvent extends BaseDomainEvent<
  typeof WEBHOOK_EVENT_TYPE.DELIVERED,
  WebhookDeliveredPayload
> {
  constructor(p: EventParams<WebhookDeliveredPayload>) {
    super(buildParams(WEBHOOK_EVENT_TYPE.DELIVERED, p));
  }
}

export class WebhookDeliveryFailedEvent extends BaseDomainEvent<
  typeof WEBHOOK_EVENT_TYPE.DELIVERY_FAILED,
  WebhookDeliveryFailedPayload
> {
  constructor(p: EventParams<WebhookDeliveryFailedPayload>) {
    super(buildParams(WEBHOOK_EVENT_TYPE.DELIVERY_FAILED, p));
  }
}

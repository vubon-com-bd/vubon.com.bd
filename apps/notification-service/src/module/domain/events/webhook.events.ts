/**
 * Webhook (notification outbound) domain events
 * @module notification-service/domain/events
 */
import { BaseDomainEvent } from '@vubon/shared-kernel/domain/base/base.event';
import type { DomainEventMetadata } from '@vubon/shared-kernel/domain/base/base.event';
import type { Timestamp } from '@vubon/shared-types/common';
import { WEBHOOK_AGGREGATE_TYPE, newEventId, now } from './event.helpers.js';

export const WEBHOOK_EVENT_TYPE = {
  CREATED: 'notification_webhook.created',
  UPDATED: 'notification_webhook.updated',
  ACTIVATED: 'notification_webhook.activated',
  DEACTIVATED: 'notification_webhook.deactivated',
  DISABLED: 'notification_webhook.disabled',
  DELIVERY_SUCCEEDED: 'notification_webhook.delivery_succeeded',
  DELIVERY_FAILED: 'notification_webhook.delivery_failed',
  DELIVERY_RETRIED: 'notification_webhook.delivery_retried',
} as const;

export interface WebhookCreatedPayload {
  readonly webhookId: string;
  readonly url: string;
  readonly method: string;
  readonly eventCount: number;
  readonly createdBy: string;
}

export interface WebhookUpdatedPayload {
  readonly webhookId: string;
  readonly changedFields: readonly string[];
  readonly updatedBy: string;
}

export interface WebhookActivatedPayload {
  readonly webhookId: string;
  readonly activatedAt: string;
  readonly activatedBy?: string;
}

export interface WebhookDeactivatedPayload {
  readonly webhookId: string;
  readonly deactivatedAt: string;
  readonly deactivatedBy?: string;
  readonly reason?: string;
}

export interface WebhookDisabledPayload {
  readonly webhookId: string;
  readonly disabledAt: string;
  readonly reason: string;
}

export interface WebhookDeliverySucceededPayload {
  readonly webhookId: string;
  readonly event: string;
  readonly deliveredAt: string;
  readonly httpStatus: number;
  readonly durationMs: number;
}

export interface WebhookDeliveryFailedPayload {
  readonly webhookId: string;
  readonly event: string;
  readonly failedAt: string;
  readonly attempt: number;
  readonly reason: string;
  readonly httpStatus?: number;
}

export interface WebhookDeliveryRetriedPayload {
  readonly webhookId: string;
  readonly event: string;
  readonly attempt: number;
  readonly nextAttemptAt: string;
  readonly delayMs: number;
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
    aggregateType: WEBHOOK_AGGREGATE_TYPE,
    payload: p.payload,
    occurredAt: p.occurredAt ?? now(),
    version: p.version ?? 1,
    metadata: p.metadata,
  };
}

export class WebhookCreatedEvent extends BaseDomainEvent<
  typeof WEBHOOK_EVENT_TYPE.CREATED,
  WebhookCreatedPayload
> {
  constructor(p: EventParams<WebhookCreatedPayload>) {
    super(buildParams(WEBHOOK_EVENT_TYPE.CREATED, p));
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

export class WebhookDeactivatedEvent extends BaseDomainEvent<
  typeof WEBHOOK_EVENT_TYPE.DEACTIVATED,
  WebhookDeactivatedPayload
> {
  constructor(p: EventParams<WebhookDeactivatedPayload>) {
    super(buildParams(WEBHOOK_EVENT_TYPE.DEACTIVATED, p));
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

export class WebhookDeliverySucceededEvent extends BaseDomainEvent<
  typeof WEBHOOK_EVENT_TYPE.DELIVERY_SUCCEEDED,
  WebhookDeliverySucceededPayload
> {
  constructor(p: EventParams<WebhookDeliverySucceededPayload>) {
    super(buildParams(WEBHOOK_EVENT_TYPE.DELIVERY_SUCCEEDED, p));
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

export class WebhookDeliveryRetriedEvent extends BaseDomainEvent<
  typeof WEBHOOK_EVENT_TYPE.DELIVERY_RETRIED,
  WebhookDeliveryRetriedPayload
> {
  constructor(p: EventParams<WebhookDeliveryRetriedPayload>) {
    super(buildParams(WEBHOOK_EVENT_TYPE.DELIVERY_RETRIED, p));
  }
}

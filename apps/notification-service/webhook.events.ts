import {
  BaseDomainEvent,
  type DomainEventMetadata,
} from '@vubon/shared-kernel/domain/base/base.event';
import { toTimestamp } from '@vubon/shared-types/common';
import { WebhookIdVO } from '../value-objects/primitives/webhook-id.vo';

const AGGREGATE_TYPE = 'Webhook';

export class WebhookDeliveredEvent extends BaseDomainEvent<
  'webhook.delivered',
  { webhookId: string; event: string; statusCode: number }
> {
  constructor(
    aggregateId: string,
    webhookId: WebhookIdVO,
    event: string,
    statusCode: number,
    version = 0,
    metadata?: DomainEventMetadata,
  ) {
    super({
      id: crypto.randomUUID(),
      type: 'webhook.delivered',
      aggregateId,
      aggregateType: AGGREGATE_TYPE,
      payload: { webhookId: webhookId.value, event, statusCode },
      occurredAt: toTimestamp(Date.now()),
      version,
      metadata,
    });
  }
}

export class WebhookFailedEvent extends BaseDomainEvent<
  'webhook.failed',
  { webhookId: string; event: string; error: string }
> {
  constructor(
    aggregateId: string,
    webhookId: WebhookIdVO,
    event: string,
    error: string,
    version = 0,
    metadata?: DomainEventMetadata,
  ) {
    super({
      id: crypto.randomUUID(),
      type: 'webhook.failed',
      aggregateId,
      aggregateType: AGGREGATE_TYPE,
      payload: { webhookId: webhookId.value, event, error },
      occurredAt: toTimestamp(Date.now()),
      version,
      metadata,
    });
  }
}

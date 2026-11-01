/**
 * WebhookPayloadVO — Composite Value Object
 * @module notification-service/domain/value-objects/composites
 *
 * Signed webhook delivery payload।
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { WEBHOOK } from '@vubon/shared-constants/platform';

import { WebhookEventValue } from '@domain/composites/webhook.vo.js';
import { WebhookIdVO } from '@domain/primitives/webhook-id.vo.js';

export interface WebhookPayloadVOProps {
  readonly event: WebhookEventValue;
  readonly webhookId: WebhookIdVO;
  readonly deliveryId: string;
  readonly payload: Readonly<Record<string, unknown>>;
  readonly signature: string;
  readonly timestamp: string;
}

const MAX_PAYLOAD_BYTES = WEBHOOK.MAX_PAYLOAD_SIZE_KB * 1024;

export class WebhookPayloadVO extends BaseVO<WebhookPayloadVOProps> {
  private constructor(props: WebhookPayloadVOProps) {
    super(Object.freeze(props));
  }

  static create(props: WebhookPayloadVOProps): WebhookPayloadVO {
    const vo = new WebhookPayloadVO(props);
    vo.validate();
    return vo;
  }

  static reconstitute(props: WebhookPayloadVOProps): WebhookPayloadVO {
    return new WebhookPayloadVO(props);
  }

  protected validate(): void {
    const v = this.value;
    if (!v.deliveryId || v.deliveryId.trim().length === 0) {
      throw new ValidationError('Webhook payload deliveryId required', 'deliveryId');
    }
    if (typeof v.payload !== 'object' || v.payload === null || Array.isArray(v.payload)) {
      throw new ValidationError('Webhook payload must be a plain object', 'payload');
    }
    const size = JSON.stringify(v.payload).length;
    if (size > MAX_PAYLOAD_BYTES) {
      throw new ValidationError(
        `Webhook payload size ${size}B exceeds ${MAX_PAYLOAD_BYTES}B`,
        'payload',
      );
    }
    if (!v.signature || v.signature.trim().length === 0) {
      throw new ValidationError('Webhook signature required', 'signature');
    }
    const ts = new Date(v.timestamp);
    if (Number.isNaN(ts.getTime())) {
      throw new ValidationError('Invalid webhook timestamp', 'timestamp');
    }
  }

  get event(): WebhookEventValue { return this.value.event; }
  get webhookId(): WebhookIdVO { return this.value.webhookId; }
  get deliveryId(): string { return this.value.deliveryId; }
  get payload(): Readonly<Record<string, unknown>> { return this.value.payload; }
  get signature(): string { return this.value.signature; }
  get timestamp(): string { return this.value.timestamp; }

  get payloadSizeBytes(): number {
    return JSON.stringify(this.value.payload).length;
  }

  get payloadKeys(): readonly string[] {
    return Object.keys(this.value.payload);
  }
}

/**
 * WebhookVO — Composite Value Object
 * @module notification-service/domain/value-objects/composites
 *
 * Webhook aggregate-এর immutable core state।
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { WEBHOOK_EVENT, WEBHOOK } from '@vubon/shared-constants/platform';

import { WebhookIdVO } from '@domain/primitives/webhook-id.vo.js';
import { WebhookTypeVO } from '@domain/primitives/webhook-type.vo.js';
import { WebhookStatusVO } from '@domain/primitives/webhook-status.vo.js';
import { WebhookUrlVO } from '@domain/primitives/webhook-url.vo.js';
import { WebhookSecretVO } from '@domain/primitives/webhook-secret.vo.js';

export type WebhookEventValue = (typeof WEBHOOK_EVENT)[keyof typeof WEBHOOK_EVENT];

const ALLOWED_EVENTS = Object.values(WEBHOOK_EVENT) as readonly string[];

export interface WebhookVOProps {
  readonly id: WebhookIdVO;
  readonly name: string;
  readonly type: WebhookTypeVO;
  readonly status: WebhookStatusVO;
  readonly url: WebhookUrlVO;
  readonly secret?: WebhookSecretVO;
  readonly events: readonly WebhookEventValue[];
  readonly headers?: Readonly<Record<string, string>>;
  readonly lastTriggeredAt?: string;
}

export class WebhookVO extends BaseVO<WebhookVOProps> {
  private constructor(props: WebhookVOProps) {
    super(Object.freeze(props));
  }

  static create(props: WebhookVOProps): WebhookVO {
    const vo = new WebhookVO(props);
    vo.validate();
    return vo;
  }

  static reconstitute(props: WebhookVOProps): WebhookVO {
    return new WebhookVO(props);
  }

  protected validate(): void {
    const v = this.value;
    if (!v.name || v.name.trim().length === 0) {
      throw new ValidationError('Webhook name cannot be empty', 'name');
    }
    if (v.name.length > 100) {
      throw new ValidationError('Webhook name exceeds 100 chars', 'name');
    }
    if (v.events.length === 0) {
      throw new ValidationError('Webhook must subscribe to at least one event', 'events');
    }
    for (const event of v.events) {
      if (!ALLOWED_EVENTS.includes(event)) {
        throw new ValidationError(`Invalid webhook event "${event}"`, 'events');
      }
    }
    if (v.headers) {
      const count = Object.keys(v.headers).length;
      if (count > WEBHOOK.MAX_HEADERS) {
        throw new ValidationError(
          `Webhook headers ${count} exceeds max ${WEBHOOK.MAX_HEADERS}`,
          'headers',
        );
      }
      for (const [k, val] of Object.entries(v.headers)) {
        if (typeof val !== 'string') {
          throw new ValidationError(`Header "${k}" must be a string`, 'headers');
        }
      }
    }
    if (v.type.isIncoming() && v.secret === undefined) {
      throw new ValidationError('Incoming webhook requires a secret', 'secret');
    }
  }

  get id(): WebhookIdVO { return this.value.id; }
  get name(): string { return this.value.name; }
  get type(): WebhookTypeVO { return this.value.type; }
  get status(): WebhookStatusVO { return this.value.status; }
  get url(): WebhookUrlVO { return this.value.url; }
  get secret(): WebhookSecretVO | undefined { return this.value.secret; }
  get events(): readonly WebhookEventValue[] { return this.value.events; }
  get headers(): Readonly<Record<string, string>> | undefined { return this.value.headers; }
  get lastTriggeredAt(): string | undefined { return this.value.lastTriggeredAt; }

  isActive(): boolean { return this.status.isActive(); }
  canDeliver(): boolean { return this.status.canDeliver(); }
  isTerminal(): boolean { return this.status.isTerminal(); }

  isIncoming(): boolean { return this.type.isIncoming(); }
  isOutgoing(): boolean { return this.type.isOutgoing(); }

  hasSecret(): boolean { return this.value.secret !== undefined; }
  hasHeaders(): boolean { return this.value.headers !== undefined; }

  subscribes(event: string): boolean {
    return this.value.events.includes(event as WebhookEventValue);
  }

  get eventCount(): number { return this.value.events.length; }

  withStatus(status: WebhookStatusVO): WebhookVO {
    return WebhookVO.create({ ...this.value, status });
  }

  withLastTriggeredAt(at: string): WebhookVO {
    return WebhookVO.create({ ...this.value, lastTriggeredAt: at });
  }

  withEvents(events: readonly WebhookEventValue[]): WebhookVO {
    return WebhookVO.create({ ...this.value, events });
  }
}

/**
 * WebhookVO — outbound webhook configuration snapshot
 * @module notification-service/domain/value-objects/composites
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { WebhookIdVO } from '../primitives/webhook-id.vo.js';
import { WebhookMethodVO } from '../primitives/webhook-method.vo.js';
import { WebhookStatusVO } from '../primitives/webhook-status.vo.js';
import { WebhookEventVO } from '../primitives/webhook-event.vo.js';
import { WebhookUrlVO } from '../primitives/webhook-url.vo.js';
import { WebhookSecretVO } from '../primitives/webhook-secret.vo.js';

export interface WebhookVOProps {
  readonly id: WebhookIdVO;
  readonly url: WebhookUrlVO;
  readonly method: WebhookMethodVO;
  readonly status: WebhookStatusVO;
  readonly events: readonly WebhookEventVO[];
  readonly secret?: WebhookSecretVO;
  readonly description?: string;
  readonly failureCount: number;
  readonly lastSuccessAt?: string;
  readonly lastFailureAt?: string;
  readonly createdBy: string;
  readonly createdAt: string;
  readonly updatedAt: string;
}

export class WebhookVO extends BaseVO<WebhookVOProps> {
  private constructor(props: WebhookVOProps) {
    super(props);
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
    if (v.events.length === 0) {
      throw new ValidationError('Webhook must subscribe to at least one event', 'events');
    }
    if (v.failureCount < 0) {
      throw new ValidationError('Failure count cannot be negative', 'failureCount');
    }
  }

  get id(): WebhookIdVO { return this.value.id; }
  get url(): WebhookUrlVO { return this.value.url; }
  get method(): WebhookMethodVO { return this.value.method; }
  get status(): WebhookStatusVO { return this.value.status; }
  get events(): readonly WebhookEventVO[] { return this.value.events; }
  get secret(): WebhookSecretVO | undefined { return this.value.secret; }
  get description(): string | undefined { return this.value.description; }
  get failureCount(): number { return this.value.failureCount; }
  get lastSuccessAt(): string | undefined { return this.value.lastSuccessAt; }
  get lastFailureAt(): string | undefined { return this.value.lastFailureAt; }
  get createdBy(): string { return this.value.createdBy; }
  get createdAt(): string { return this.value.createdAt; }
  get updatedAt(): string { return this.value.updatedAt; }

  isActive(): boolean { return this.value.status.isActive(); }
  hasSecret(): boolean { return this.value.secret !== undefined; }

  subscribesTo(eventValue: string): boolean {
    return this.value.events.some((e) => e.value === eventValue);
  }
}

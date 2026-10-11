/**
 * WebhookEntity — outbound webhook configuration
 * @module notification-service/domain/entities
 */
import { AggregateRoot } from '@vubon/shared-kernel/domain/base/base.aggregate';
import { BusinessRuleError } from '@vubon/shared-kernel/domain/errors/business-rule.error';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

import { WebhookIdVO } from '../value-objects/primitives/webhook-id.vo.js';
import { WebhookMethodVO } from '../value-objects/primitives/webhook-method.vo.js';
import { WebhookStatusVO } from '../value-objects/primitives/webhook-status.vo.js';
import { WebhookEventVO } from '../value-objects/primitives/webhook-event.vo.js';
import { WebhookUrlVO } from '../value-objects/primitives/webhook-url.vo.js';
import { WebhookSecretVO } from '../value-objects/primitives/webhook-secret.vo.js';

import {
  WebhookCreatedEvent,
  WebhookUpdatedEvent,
  WebhookActivatedEvent,
  WebhookDeactivatedEvent,
  WebhookDisabledEvent,
  WebhookDeliverySucceededEvent,
  WebhookDeliveryFailedEvent,
  WebhookDeliveryRetriedEvent,
} from '../events/webhook.events.js';

export interface WebhookEntityProps {
  readonly url: WebhookUrlVO;
  readonly method: WebhookMethodVO;
  readonly status: WebhookStatusVO;
  readonly events: readonly WebhookEventVO[];
  readonly secret?: WebhookSecretVO;
  readonly description?: string;
  readonly failureCount?: number;
  readonly lastSuccessAt?: string;
  readonly lastFailureAt?: string;
  readonly createdBy: string;
  readonly metadata?: Readonly<Record<string, unknown>>;
}

export class WebhookEntity extends AggregateRoot<string> {
  private _url: WebhookUrlVO;
  private _status: WebhookStatusVO;
  private _events: readonly WebhookEventVO[];
  private _secret?: WebhookSecretVO;
  private _description?: string;
  private _failureCount: number;
  private _lastSuccessAt?: string;
  private _lastFailureAt?: string;

  private readonly _method: WebhookMethodVO;
  private readonly _createdBy: string;
  private readonly _metadata?: Readonly<Record<string, unknown>>;

  private constructor(
    id: string,
    createdAt: string,
    updatedAt: string,
    props: WebhookEntityProps,
    deletedAt?: string | null,
  ) {
    super(id, createdAt, updatedAt, deletedAt);
    this._url = props.url;
    this._method = props.method;
    this._status = props.status;
    this._events = props.events;
    this._secret = props.secret;
    this._description = props.description;
    this._failureCount = props.failureCount ?? 0;
    this._lastSuccessAt = props.lastSuccessAt;
    this._lastFailureAt = props.lastFailureAt;
    this._createdBy = props.createdBy;
    this._metadata = props.metadata;
    this.assertInvariants();
  }

  private assertInvariants(): void {
    if (this._events.length === 0) {
      throw new ValidationError('Webhook must subscribe to at least one event', 'events');
    }
    if (this._failureCount < 0) {
      throw new ValidationError('failureCount cannot be negative', 'failureCount');
    }
  }

  get url(): WebhookUrlVO { return this._url; }
  get method(): WebhookMethodVO { return this._method; }
  get status(): WebhookStatusVO { return this._status; }
  get events(): readonly WebhookEventVO[] { return this._events; }
  get secret(): WebhookSecretVO | undefined { return this._secret; }
  get description(): string | undefined { return this._description; }
  get failureCount(): number { return this._failureCount; }
  get lastSuccessAt(): string | undefined { return this._lastSuccessAt; }
  get lastFailureAt(): string | undefined { return this._lastFailureAt; }
  get createdBy(): string { return this._createdBy; }
  get metadata(): Readonly<Record<string, unknown>> | undefined { return this._metadata; }

  get toIdVO(): WebhookIdVO { return WebhookIdVO.reconstitute(this.id); }

  isActive(): boolean { return this._status.isActive(); }
  canDeliver(): boolean { return this._status.canDeliver(); }
  hasSecret(): boolean { return this._secret !== undefined; }

  subscribesTo(eventValue: string): boolean {
    return this._events.some((e) => e.value === eventValue);
  }

  // ═══ Business Methods ═══
  update(
    changes: {
      url?: WebhookUrlVO;
      method?: WebhookMethodVO;
      events?: readonly WebhookEventVO[];
      secret?: WebhookSecretVO;
      description?: string;
    },
    updatedBy: string,
    now: string = new Date().toISOString(),
  ): void {
    const changedFields: string[] = [];
    if (changes.url) { this._url = changes.url; changedFields.push('url'); }
    if (changes.method) changedFields.push('method');
    if (changes.events) { this._events = changes.events; changedFields.push('events'); }
    if (changes.secret) { this._secret = changes.secret; changedFields.push('secret'); }
    if (changes.description !== undefined) { this._description = changes.description; changedFields.push('description'); }
    this.assertInvariants();
    this.addDomainEvent(
      new WebhookUpdatedEvent({
        aggregateId: this.id,
        payload: { webhookId: this.id, changedFields, updatedBy },
        version: this.version + 1,
      }),
    );
    this.touch(now);
    this.incrementVersion();
  }

  activate(activatedBy?: string, now: string = new Date().toISOString()): void {
    this._status = WebhookStatusVO.active();
    this.addDomainEvent(
      new WebhookActivatedEvent({
        aggregateId: this.id,
        payload: { webhookId: this.id, activatedAt: now, activatedBy },
        version: this.version + 1,
      }),
    );
    this.touch(now);
    this.incrementVersion();
  }

  deactivate(deactivatedBy?: string, reason?: string, now: string = new Date().toISOString()): void {
    if (!this._status.isActive()) {
      throw new BusinessRuleError(
        `Webhook "${this.id}" is not active`,
        'WEBHOOK_NOT_ACTIVE',
        { webhookId: this.id, status: this._status.value },
      );
    }
    this._status = WebhookStatusVO.inactive();
    this.addDomainEvent(
      new WebhookDeactivatedEvent({
        aggregateId: this.id,
        payload: { webhookId: this.id, deactivatedAt: now, deactivatedBy, reason },
        version: this.version + 1,
      }),
    );
    this.touch(now);
    this.incrementVersion();
  }

  disable(reason: string, now: string = new Date().toISOString()): void {
    this._status = WebhookStatusVO.disabled();
    this.addDomainEvent(
      new WebhookDisabledEvent({
        aggregateId: this.id,
        payload: { webhookId: this.id, disabledAt: now, reason },
        version: this.version + 1,
      }),
    );
    this.touch(now);
    this.incrementVersion();
  }

  recordDeliverySuccess(
    event: string,
    httpStatus: number,
    durationMs: number,
    now: string = new Date().toISOString(),
  ): void {
    this._failureCount = 0;
    this._lastSuccessAt = now;
    this.addDomainEvent(
      new WebhookDeliverySucceededEvent({
        aggregateId: this.id,
        payload: {
          webhookId: this.id,
          event,
          deliveredAt: now,
          httpStatus,
          durationMs,
        },
        version: this.version + 1,
      }),
    );
    this.touch(now);
    this.incrementVersion();
  }

  recordDeliveryFailure(
    event: string,
    attempt: number,
    reason: string,
    httpStatus?: number,
    now: string = new Date().toISOString(),
  ): void {
    this._failureCount += 1;
    this._lastFailureAt = now;
    this.addDomainEvent(
      new WebhookDeliveryFailedEvent({
        aggregateId: this.id,
        payload: {
          webhookId: this.id,
          event,
          failedAt: now,
          attempt,
          reason,
          httpStatus,
        },
        version: this.version + 1,
      }),
    );
    this.touch(now);
    this.incrementVersion();
  }

  scheduleRetry(
    event: string,
    attempt: number,
    delayMs: number,
    nextAttemptAt: string,
    now: string = new Date().toISOString(),
  ): void {
    this.addDomainEvent(
      new WebhookDeliveryRetriedEvent({
        aggregateId: this.id,
        payload: {
          webhookId: this.id,
          event,
          attempt,
          nextAttemptAt,
          delayMs,
        },
        version: this.version + 1,
      }),
    );
    this.touch(now);
    this.incrementVersion();
  }

  private touch(now: string): void {
    (this as unknown as { updatedAt: string }).updatedAt = now;
  }

  // ═══ Factories ═══
  static create(params: {
    id: string;
    props: Omit<WebhookEntityProps, 'status' | 'failureCount'> & {
      status?: WebhookStatusVO;
    };
    now: string;
  }): WebhookEntity {
    const fullProps: WebhookEntityProps = {
      ...params.props,
      status: params.props.status ?? WebhookStatusVO.active(),
      failureCount: 0,
    };
    const entity = new WebhookEntity(params.id, params.now, params.now, fullProps);
    entity.addDomainEvent(
      new WebhookCreatedEvent({
        aggregateId: params.id,
        payload: {
          webhookId: params.id,
          url: params.props.url.value,
          method: params.props.method.value,
          eventCount: params.props.events.length,
          createdBy: params.props.createdBy,
        },
        version: 1,
      }),
    );
    entity.incrementVersion();
    return entity;
  }

  static reconstitute(params: {
    id: string;
    createdAt: string;
    updatedAt: string;
    deletedAt?: string | null;
    props: WebhookEntityProps;
    version?: number;
  }): WebhookEntity {
    const entity = new WebhookEntity(
      params.id,
      params.createdAt,
      params.updatedAt,
      params.props,
      params.deletedAt,
    );
    if (params.version !== undefined) {
      for (let i = 0; i < params.version; i++) entity.incrementVersion();
    }
    return entity;
  }
}

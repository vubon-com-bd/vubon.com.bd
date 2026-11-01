/**
 * WebhookEntity — AGGREGATE ROOT
 * @module notification-service/domain/entities
 *
 * State machine:
 *   active → paused/inactive
 *   paused/inactive → active
 *   any → disabled (terminal)
 *   active → failed → active/inactive
 */
import { AggregateRoot } from '@vubon/shared-kernel/domain/base/base.aggregate';
import { BusinessRuleError } from '@vubon/shared-kernel/domain/errors/business-rule.error';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

import type { WebhookVO, WebhookEventValue } from '@domain/composites/webhook.vo.js';
import type { WebhookIdVO } from '@domain/primitives/webhook-id.vo.js';
import { WebhookStatusVO } from '@domain/primitives/webhook-status.vo.js';

import {
  WebhookRegisteredEvent,
  WebhookUpdatedEvent,
  WebhookActivatedEvent,
  WebhookPausedEvent,
  WebhookDisabledEvent,
  WebhookDeliveredEvent,
  WebhookDeliveryFailedEvent,
} from '@domain/events/webhook.events.js';

export interface WebhookEntityProps {
  readonly vo: WebhookVO;
  readonly pausedAt?: string;
  readonly pausedReason?: string;
  readonly disabledAt?: string;
  readonly disabledReason?: string;
  readonly failureReason?: string;
}

export class WebhookEntity extends AggregateRoot<string> {
  private _vo: WebhookVO;
  private _pausedAt?: string;
  private _pausedReason?: string;
  private _disabledAt?: string;
  private _disabledReason?: string;
  private _failureReason?: string;

  private constructor(
    id: string,
    createdAt: string,
    updatedAt: string,
    props: WebhookEntityProps,
    deletedAt?: string | null,
  ) {
    super(id, createdAt, updatedAt, deletedAt);
    this._vo = props.vo;
    this._pausedAt = props.pausedAt;
    this._pausedReason = props.pausedReason;
    this._disabledAt = props.disabledAt;
    this._disabledReason = props.disabledReason;
    this._failureReason = props.failureReason;
    this.assertInvariants();
  }

  private assertInvariants(): void {
    if (this._vo.status.isPaused() && !this._pausedAt) {
      throw new ValidationError('Paused webhook requires pausedAt', 'pausedAt');
    }
    if (this._vo.status.isDisabled() && !this._disabledAt) {
      throw new ValidationError('Disabled webhook requires disabledAt', 'disabledAt');
    }
    if (this._vo.status.isFailed() && !this._failureReason) {
      throw new ValidationError('Failed webhook requires failureReason', 'failureReason');
    }
  }

  get vo(): WebhookVO { return this._vo; }
  get webhookId(): WebhookIdVO { return this._vo.id; }
  get status(): WebhookVO['status'] { return this._vo.status; }
  get pausedAt(): string | undefined { return this._pausedAt; }
  get pausedReason(): string | undefined { return this._pausedReason; }
  get disabledAt(): string | undefined { return this._disabledAt; }
  get disabledReason(): string | undefined { return this._disabledReason; }
  get failureReason(): string | undefined { return this._failureReason; }

  isActive(): boolean { return this._vo.isActive(); }
  canDeliver(): boolean { return this._vo.canDeliver(); }
  isTerminal(): boolean { return this._vo.isTerminal(); }
  subscribes(event: string): boolean { return this._vo.subscribes(event); }

  activate(now: string = new Date().toISOString()): void {
    this.assertTransitionTo('active');
    this._vo = this._vo.withStatus(WebhookStatusVO.active());
    this._pausedAt = undefined;
    this._pausedReason = undefined;
    this._failureReason = undefined;
    this.addDomainEvent(
      new WebhookActivatedEvent({
        aggregateId: this.id,
        payload: { webhookId: this.id, activatedAt: now },
        version: this.version + 1,
      }),
    );
    this.touch(now);
    this.incrementVersion();
  }

  pause(reason?: string, now: string = new Date().toISOString()): void {
    this.assertTransitionTo('paused');
    this._vo = this._vo.withStatus(WebhookStatusVO.paused());
    this._pausedAt = now;
    this._pausedReason = reason;
    this.addDomainEvent(
      new WebhookPausedEvent({
        aggregateId: this.id,
        payload: { webhookId: this.id, reason, pausedAt: now },
        version: this.version + 1,
      }),
    );
    this.touch(now);
    this.incrementVersion();
  }

  disable(reason?: string, now: string = new Date().toISOString()): void {
    this.assertTransitionTo('disabled');
    this._vo = this._vo.withStatus(WebhookStatusVO.disabled());
    this._disabledAt = now;
    this._disabledReason = reason;
    this.addDomainEvent(
      new WebhookDisabledEvent({
        aggregateId: this.id,
        payload: { webhookId: this.id, reason, disabledAt: now },
        version: this.version + 1,
      }),
    );
    this.touch(now);
    this.incrementVersion();
  }

  recordDelivery(
    deliveryId: string,
    event: string,
    responseStatus: number,
    durationMs: number,
    now: string = new Date().toISOString(),
  ): void {
    this._vo = this._vo.withLastTriggeredAt(now);
    this.addDomainEvent(
      new WebhookDeliveredEvent({
        aggregateId: this.id,
        payload: {
          webhookId: this.id,
          deliveryId,
          event,
          responseStatus,
          durationMs,
          deliveredAt: now,
        },
        version: this.version + 1,
      }),
    );
    this.touch(now);
    this.incrementVersion();
  }

  recordDeliveryFailure(
    deliveryId: string,
    event: string,
    attemptNumber: number,
    reason: string,
    responseStatus?: number,
    now: string = new Date().toISOString(),
  ): void {
    this.addDomainEvent(
      new WebhookDeliveryFailedEvent({
        aggregateId: this.id,
        payload: {
          webhookId: this.id,
          deliveryId,
          event,
          attemptNumber,
          reason,
          responseStatus,
          failedAt: now,
        },
        version: this.version + 1,
      }),
    );
    this.touch(now);
    this.incrementVersion();
  }

  addEvents(events: readonly WebhookEventValue[], now: string = new Date().toISOString()): void {
    this._vo = this._vo.withEvents(events);
    this.addDomainEvent(
      new WebhookUpdatedEvent({
        aggregateId: this.id,
        payload: { webhookId: this.id, changedFields: ['events'], updatedAt: now },
        version: this.version + 1,
      }),
    );
    this.touch(now);
    this.incrementVersion();
  }

  private assertTransitionTo(target: string): void {
    if (!this._vo.status.canTransitionTo(target)) {
      throw new BusinessRuleError(
        `Invalid webhook status transition: "${this._vo.status.value}" → "${target}"`,
        'INVALID_WEBHOOK_STATUS_TRANSITION',
        { from: this._vo.status.value, to: target, webhookId: this.id },
      );
    }
  }

  private touch(now: string): void {
    (this as unknown as { updatedAt: string }).updatedAt = now;
  }

  static create(params: {
    id: WebhookIdVO;
    vo: WebhookVO;
    now: string;
  }): WebhookEntity {
    if (!params.vo.isActive()) {
      throw new ValidationError('New webhook must be active', 'status');
    }

    const entity = new WebhookEntity(
      params.id.value,
      params.now,
      params.now,
      { vo: params.vo },
      null,
    );

    entity.addDomainEvent(
      new WebhookRegisteredEvent({
        aggregateId: params.id.value,
        payload: {
          webhookId: params.id.value,
          name: params.vo.name,
          type: params.vo.type.value,
          url: params.vo.url.value,
          events: params.vo.events,
          registeredAt: params.now,
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
      params.deletedAt ?? null,
    );
    if (params.version !== undefined) {
      for (let i = 0; i < params.version; i++) entity.incrementVersion();
    }
    return entity;
  }
}

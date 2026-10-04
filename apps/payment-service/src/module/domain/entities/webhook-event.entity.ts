/**
 * WebhookEventEntity — inbound webhook record from a gateway
 * @module payment-service/domain/entities
 */
import { AggregateRoot } from '@vubon/shared-kernel/domain/base/base.aggregate';
import { BusinessRuleError } from '@vubon/shared-kernel/domain/errors/business-rule.error';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

import { GatewaySignatureVO } from '../value-objects/primitives/gateway-signature.vo.js';
import { FailureReasonVO } from '../value-objects/primitives/failure-reason.vo.js';
import { PaymentIdVO } from '../value-objects/primitives/payment-id.vo.js';

import {
  WebhookReceivedEvent,
  WebhookVerifiedEvent,
  WebhookProcessedEvent,
  WebhookFailedEvent,
  WebhookDuplicateEvent,
} from '../events/webhook.events.js';

const DEFAULT_MAX_ATTEMPTS = 5;

export interface WebhookEventEntityProps {
  readonly gateway: string;
  readonly gatewayEventId: string;
  readonly eventType: string;
  readonly payload: Readonly<Record<string, unknown>>;
  readonly signature?: GatewaySignatureVO;
  readonly verified: boolean;
  readonly processed: boolean;
  readonly attempts: number;
  readonly maxAttempts?: number;
  readonly lastError?: FailureReasonVO;
  readonly paymentId?: PaymentIdVO;
  readonly receivedAt: string;
  readonly verifiedAt?: string;
  readonly processedAt?: string;
  readonly failedAt?: string;
}

export class WebhookEventEntity extends AggregateRoot<string> {
  private _verified: boolean;
  private _processed: boolean;
  private _attempts: number;
  private _lastError?: FailureReasonVO;
  private _paymentId?: PaymentIdVO;
  private _verifiedAt?: string;
  private _processedAt?: string;
  private _failedAt?: string;

  private readonly _gateway: string;
  private readonly _gatewayEventId: string;
  private readonly _eventType: string;
  private readonly _payload: Readonly<Record<string, unknown>>;
  private readonly _signature?: GatewaySignatureVO;
  private readonly _maxAttempts: number;
  private readonly _receivedAt: string;

  private constructor(
    id: string,
    createdAt: string,
    updatedAt: string,
    props: WebhookEventEntityProps,
    deletedAt?: string | null,
  ) {
    super(id, createdAt, updatedAt, deletedAt);
    this._gateway = props.gateway;
    this._gatewayEventId = props.gatewayEventId;
    this._eventType = props.eventType;
    this._payload = props.payload;
    this._signature = props.signature;
    this._verified = props.verified;
    this._processed = props.processed;
    this._attempts = props.attempts;
    this._maxAttempts = props.maxAttempts ?? DEFAULT_MAX_ATTEMPTS;
    this._lastError = props.lastError;
    this._paymentId = props.paymentId;
    this._receivedAt = props.receivedAt;
    this._verifiedAt = props.verifiedAt;
    this._processedAt = props.processedAt;
    this._failedAt = props.failedAt;
    this.assertInvariants();
  }

  private assertInvariants(): void {
    if (!this._gateway || this._gateway.trim().length === 0) {
      throw new ValidationError('Gateway is required', 'gateway');
    }
    if (!this._gatewayEventId || this._gatewayEventId.trim().length === 0) {
      throw new ValidationError('Gateway event id is required', 'gatewayEventId');
    }
    if (this._attempts < 0 || this._attempts > this._maxAttempts) {
      throw new ValidationError(
        `Attempts must be between 0 and ${this._maxAttempts}`,
        'attempts',
      );
    }
  }

  // ─── Getters ───
  get gateway(): string { return this._gateway; }
  get gatewayEventId(): string { return this._gatewayEventId; }
  get eventType(): string { return this._eventType; }
  get payload(): Readonly<Record<string, unknown>> { return this._payload; }
  get signature(): GatewaySignatureVO | undefined { return this._signature; }
  get verified(): boolean { return this._verified; }
  get processed(): boolean { return this._processed; }
  get attempts(): number { return this._attempts; }
  get maxAttempts(): number { return this._maxAttempts; }
  get lastError(): FailureReasonVO | undefined { return this._lastError; }
  get paymentId(): PaymentIdVO | undefined { return this._paymentId; }
  get receivedAt(): string { return this._receivedAt; }
  get verifiedAt(): string | undefined { return this._verifiedAt; }
  get processedAt(): string | undefined { return this._processedAt; }
  get failedAt(): string | undefined { return this._failedAt; }

  // ─── Predicates ───
  isPending(): boolean {
    return !this._processed && !this._failedAt;
  }

  isFailed(): boolean {
    return this._failedAt !== undefined;
  }

  canRetry(): boolean {
    return !this._processed && this._attempts < this._maxAttempts;
  }

  isExhausted(): boolean {
    return this._attempts >= this._maxAttempts;
  }

  // ─── Business methods ───
  verify(now: string = new Date().toISOString()): void {
    if (this._verified) return;
    this._verified = true;
    this._verifiedAt = now;
    this.addDomainEvent(
      new WebhookVerifiedEvent({
        aggregateId: this.id,
        payload: {
          webhookId: this.id,
          gateway: this._gateway,
          verifiedAt: now,
        },
        version: this.version + 1,
      }),
    );
    this.touch(now);
    this.incrementVersion();
  }

  markDuplicate(now: string = new Date().toISOString()): void {
    this.addDomainEvent(
      new WebhookDuplicateEvent({
        aggregateId: this.id,
        payload: {
          webhookId: this.id,
          gateway: this._gateway,
          gatewayEventId: this._gatewayEventId,
        },
        version: this.version + 1,
      }),
    );
    this.touch(now);
    this.incrementVersion();
  }

  markProcessed(
    paymentId?: PaymentIdVO,
    now: string = new Date().toISOString(),
  ): void {
    if (this._processed) {
      throw new BusinessRuleError(
        `Webhook "${this.id}" already processed`,
        'WEBHOOK_ALREADY_PROCESSED',
        { webhookId: this.id },
      );
    }
    if (!this._verified) {
      throw new BusinessRuleError(
        `Webhook "${this.id}" must be verified before processing`,
        'WEBHOOK_NOT_VERIFIED',
        { webhookId: this.id },
      );
    }
    this._processed = true;
    this._processedAt = now;
    if (paymentId) this._paymentId = paymentId;
    this.addDomainEvent(
      new WebhookProcessedEvent({
        aggregateId: this.id,
        payload: {
          webhookId: this.id,
          gateway: this._gateway,
          processedAt: now,
          paymentId: paymentId?.value,
        },
        version: this.version + 1,
      }),
    );
    this.touch(now);
    this.incrementVersion();
  }

  markFailed(
    reason: FailureReasonVO,
    now: string = new Date().toISOString(),
  ): void {
    this._attempts += 1;
    this._lastError = reason;
    this._failedAt = now;
    this.addDomainEvent(
      new WebhookFailedEvent({
        aggregateId: this.id,
        payload: {
          webhookId: this.id,
          gateway: this._gateway,
          reason: reason.value,
          attempts: this._attempts,
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

  // ─── Factories ───
  static receive(params: {
    id: string;
    props: Omit<
      WebhookEventEntityProps,
      'verified' | 'processed' | 'attempts' | 'receivedAt'
    > & { receivedAt?: string };
    now: string;
  }): WebhookEventEntity {
    const fullProps: WebhookEventEntityProps = {
      ...params.props,
      verified: false,
      processed: false,
      attempts: 0,
      receivedAt: params.props.receivedAt ?? params.now,
    };
    const entity = new WebhookEventEntity(params.id, params.now, params.now, fullProps);
    entity.addDomainEvent(
      new WebhookReceivedEvent({
        aggregateId: params.id,
        payload: {
          webhookId: params.id,
          gateway: params.props.gateway,
          gatewayEventId: params.props.gatewayEventId,
          eventType: params.props.eventType,
          receivedAt: fullProps.receivedAt,
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
    props: WebhookEventEntityProps;
    version?: number;
  }): WebhookEventEntity {
    const entity = new WebhookEventEntity(
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

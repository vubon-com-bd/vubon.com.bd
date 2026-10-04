/**
 * PaymentEntity — AGGREGATE ROOT
 * @module payment-service/domain/entities
 *
 * Full lifecycle: pending → processing → authorized → captured → paid
 *                pending/processing → failed/declined/cancelled/expired
 *                captured/paid → partially_refunded → refunded
 *                captured/paid → chargeback
 */
import { AggregateRoot } from '@vubon/shared-kernel/domain/base/base.aggregate';
import { BusinessRuleError } from '@vubon/shared-kernel/domain/errors/business-rule.error';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { PAYMENT_LIMIT } from '@vubon/shared-constants/business/payment';

import { PaymentIdVO } from '../value-objects/primitives/payment-id.vo.js';
import { PaymentStatusVO } from '../value-objects/primitives/payment-status.vo.js';
import { PaymentTypeVO } from '../value-objects/primitives/payment-type.vo.js';
import { PaymentMethodVO } from '../value-objects/primitives/payment-method.vo.js';
import { PaymentGatewayVO } from '../value-objects/primitives/payment-gateway.vo.js';
import { GatewayPaymentIdVO } from '../value-objects/primitives/gateway-payment-id.vo.js';
import { GatewaySignatureVO } from '../value-objects/primitives/gateway-signature.vo.js';
import { IdempotencyKeyVO } from '../value-objects/primitives/idempotency-key.vo.js';
import { OrderIdVO } from '../value-objects/primitives/order-id.vo.js';
import { UserIdVO } from '../value-objects/primitives/user-id.vo.js';
import { CurrencyVO } from '../value-objects/primitives/currency.vo.js';
import { FailureReasonVO } from '../value-objects/primitives/failure-reason.vo.js';
import { FailureCodeVO } from '../value-objects/primitives/failure-code.vo.js';

import {
  PaymentInitiatedEvent,
  PaymentProcessingEvent,
  PaymentAuthorizedEvent,
  PaymentCapturedEvent,
  PaymentPaidEvent,
  PaymentFailedEvent,
  PaymentDeclinedEvent,
  PaymentCancelledEvent,
  PaymentExpiredEvent,
  PaymentRefundedEvent,
  PaymentChargebackEvent,
  PaymentStatusChangedEvent,
  PaymentRetryAttemptedEvent,
} from '../events/payment.events.js';

export interface PaymentEntityProps {
  readonly orderId: OrderIdVO;
  readonly userId: UserIdVO;
  readonly type: PaymentTypeVO;
  readonly method: PaymentMethodVO;
  readonly gateway?: PaymentGatewayVO;
  readonly amount: number;
  readonly currency: string;
  readonly status: PaymentStatusVO;
  readonly gatewayPaymentId?: GatewayPaymentIdVO;
  readonly gatewaySignature?: GatewaySignatureVO;
  readonly idempotencyKey?: IdempotencyKeyVO;
  readonly refundedAmount?: number;
  readonly retryAttempts?: number;
  readonly authorizedAt?: string;
  readonly capturedAt?: string;
  readonly failedAt?: string;
  readonly cancelledAt?: string;
  readonly expiredAt?: string;
  readonly failureReason?: FailureReasonVO;
  readonly failureCode?: FailureCodeVO;
  readonly metadata?: Readonly<Record<string, unknown>>;
}

export class PaymentEntity extends AggregateRoot<string> {
  private _status: PaymentStatusVO;
  private _amount: number;
  private _currency: string;
  private _gatewayPaymentId?: GatewayPaymentIdVO;
  private _gatewaySignature?: GatewaySignatureVO;
  private _refundedAmount: number;
  private _retryAttempts: number;
  private _authorizedAt?: string;
  private _capturedAt?: string;
  private _failedAt?: string;
  private _cancelledAt?: string;
  private _expiredAt?: string;
  private _failureReason?: FailureReasonVO;
  private _failureCode?: FailureCodeVO;

  private readonly _orderId: OrderIdVO;
  private readonly _userId: UserIdVO;
  private readonly _type: PaymentTypeVO;
  private readonly _method: PaymentMethodVO;
  private readonly _gateway?: PaymentGatewayVO;
  private readonly _idempotencyKey?: IdempotencyKeyVO;
  private readonly _metadata?: Readonly<Record<string, unknown>>;

  private constructor(
    id: string,
    createdAt: string,
    updatedAt: string,
    props: PaymentEntityProps,
    deletedAt?: string | null,
  ) {
    super(id, createdAt, updatedAt, deletedAt);

    this._orderId = props.orderId;
    this._userId = props.userId;
    this._type = props.type;
    this._method = props.method;
    this._gateway = props.gateway;
    this._amount = props.amount;
    this._currency = props.currency;
    this._status = props.status;
    this._gatewayPaymentId = props.gatewayPaymentId;
    this._gatewaySignature = props.gatewaySignature;
    this._idempotencyKey = props.idempotencyKey;
    this._refundedAmount = props.refundedAmount ?? 0;
    this._retryAttempts = props.retryAttempts ?? 0;
    this._authorizedAt = props.authorizedAt;
    this._capturedAt = props.capturedAt;
    this._failedAt = props.failedAt;
    this._cancelledAt = props.cancelledAt;
    this._expiredAt = props.expiredAt;
    this._failureReason = props.failureReason;
    this._failureCode = props.failureCode;
    this._metadata = props.metadata;

    this.assertInvariants();
  }

  // ═══════════════ Invariants ═══════════════
  private assertInvariants(): void {
    if (!Number.isFinite(this._amount) || this._amount <= 0) {
      throw new ValidationError('Payment amount must be positive', 'amount');
    }
    if (this._amount > PAYMENT_LIMIT.MAX_AMOUNT) {
      throw new ValidationError(
        `Payment amount exceeds maximum ${PAYMENT_LIMIT.MAX_AMOUNT}`,
        'amount',
      );
    }
    if (typeof this._currency !== 'string' || this._currency.length !== 3) {
      throw new ValidationError('Currency must be a 3-char code', 'currency');
    }
    if (this._refundedAmount < 0) {
      throw new ValidationError('Refunded amount cannot be negative', 'refundedAmount');
    }
    if (this._refundedAmount > this._amount) {
      throw new ValidationError(
        'Refunded amount cannot exceed payment amount',
        'refundedAmount',
      );
    }
    if (this._method.requiresGateway() && !this._gateway) {
      throw new ValidationError(
        `Payment method "${this._method.value}" requires a gateway`,
        'gateway',
      );
    }
    if (this._gateway && !this._gateway.supportsCurrency(this._currency)) {
      throw new ValidationError(
        `Gateway "${this._gateway.value}" does not support currency "${this._currency}"`,
        'gateway',
      );
    }
  }

  // ═══════════════ Getters ═══════════════
  get orderId(): OrderIdVO { return this._orderId; }
  get userId(): UserIdVO { return this._userId; }
  get type(): PaymentTypeVO { return this._type; }
  get method(): PaymentMethodVO { return this._method; }
  get gateway(): PaymentGatewayVO | undefined { return this._gateway; }
  get amount(): number { return this._amount; }
  get currency(): string { return this._currency; }
  get status(): PaymentStatusVO { return this._status; }
  get gatewayPaymentId(): GatewayPaymentIdVO | undefined { return this._gatewayPaymentId; }
  get gatewaySignature(): GatewaySignatureVO | undefined { return this._gatewaySignature; }
  get idempotencyKey(): IdempotencyKeyVO | undefined { return this._idempotencyKey; }
  get refundedAmount(): number { return this._refundedAmount; }
  get retryAttempts(): number { return this._retryAttempts; }
  get authorizedAt(): string | undefined { return this._authorizedAt; }
  get capturedAt(): string | undefined { return this._capturedAt; }
  get failedAt(): string | undefined { return this._failedAt; }
  get cancelledAt(): string | undefined { return this._cancelledAt; }
  get expiredAt(): string | undefined { return this._expiredAt; }
  get failureReason(): FailureReasonVO | undefined { return this._failureReason; }
  get failureCode(): FailureCodeVO | undefined { return this._failureCode; }
  get metadata(): Readonly<Record<string, unknown>> | undefined { return this._metadata; }

  get toIdVO(): PaymentIdVO { return PaymentIdVO.reconstitute(this.id); }
  get refundableRemaining(): number {
    return Math.round((this._amount - this._refundedAmount) * 100) / 100;
  }
  get isFullyRefunded(): boolean {
    return this._refundedAmount >= this._amount;
  }

  // ═══════════════ Predicates ═══════════════
  isPending(): boolean { return this._status.isPending(); }
  isProcessing(): boolean { return this._status.isProcessing(); }
  isAuthorized(): boolean { return this._status.isAuthorized(); }
  isCaptured(): boolean { return this._status.isCaptured(); }
  isPaid(): boolean { return this._status.isPaid() || this._status.isCaptured(); }
  isFailed(): boolean { return this._status.isFailed(); }
  isDeclined(): boolean { return this._status.isDeclined(); }
  isCancelled(): boolean { return this._status.isCancelled(); }
  isRefunded(): boolean { return this._status.isRefunded(); }
  isPartiallyRefunded(): boolean { return this._status.isPartiallyRefunded(); }
  isChargeback(): boolean { return this._status.isChargeback(); }
  isExpired(): boolean { return this._status.isExpired(); }
  isSettled(): boolean { return this._status.isSettled(); }
  isFinal(): boolean { return this._status.isFinal(); }

  canBeCaptured(): boolean {
    if (!this._status.isAuthorized()) return false;
    return this.isCaptureWindowOpen();
  }

  canBeRefunded(): boolean {
    return this._status.isSettled() && this.refundableRemaining > 0;
  }

  canBePartiallyRefunded(amount: number): boolean {
    if (!this.canBeRefunded()) return false;
    return amount > 0 && amount <= this.refundableRemaining;
  }

  canBeCancelled(): boolean {
    return !this._status.isSettled() && !this._status.isFinal();
  }

  canBeRetried(): boolean {
    return (
      this._status.isRecoverable() &&
      this._retryAttempts < PAYMENT_LIMIT.MAX_ATTEMPTS
    );
  }

  isCaptureWindowOpen(at: Date = new Date()): boolean {
    if (!this._authorizedAt) return false;
    const authorized = new Date(this._authorizedAt).getTime();
    const windowMs = PAYMENT_LIMIT.CAPTURE_WINDOW_HOURS * 60 * 60 * 1000;
    return at.getTime() - authorized <= windowMs;
  }

  hasRefundableAmount(): boolean {
    return this.refundableRemaining > 0;
  }

  // ═══════════════ Business methods ═══════════════

  startProcessing(
    gatewayPaymentId?: GatewayPaymentIdVO,
    now: string = new Date().toISOString(),
  ): void {
    this.assertTransitionTo('processing');
    const from = this._status.value;
    this._status = PaymentStatusVO.processing();
    if (gatewayPaymentId) this._gatewayPaymentId = gatewayPaymentId;
    this.emitStatusChange(from, 'processing');
    this.addDomainEvent(
      new PaymentProcessingEvent({
        aggregateId: this.id,
        payload: {
          paymentId: this.id,
          gatewayPaymentId: gatewayPaymentId?.value,
          startedAt: now,
        },
        version: this.version + 1,
      }),
    );
    this.touch(now);
    this.incrementVersion();
  }

  authorize(
    gatewayPaymentId: GatewayPaymentIdVO,
    gatewaySignature?: GatewaySignatureVO,
    now: string = new Date().toISOString(),
  ): void {
    this.assertTransitionTo('authorized');
    if (!this._method.requiresGateway()) {
      throw new BusinessRuleError(
        `Method "${this._method.value}" does not require authorization`,
        'METHOD_DOES_NOT_REQUIRE_AUTHORIZATION',
        { method: this._method.value },
      );
    }
    const from = this._status.value;
    this._status = PaymentStatusVO.authorized();
    this._gatewayPaymentId = gatewayPaymentId;
    if (gatewaySignature) this._gatewaySignature = gatewaySignature;
    this._authorizedAt = now;
    this.emitStatusChange(from, 'authorized');
    this.addDomainEvent(
      new PaymentAuthorizedEvent({
        aggregateId: this.id,
        payload: {
          paymentId: this.id,
          gatewayPaymentId: gatewayPaymentId.value,
          authorizedAt: now,
          amount: this._amount,
          currency: this._currency,
        },
        version: this.version + 1,
      }),
    );
    this.touch(now);
    this.incrementVersion();
  }

  capture(
    capturedAmount?: number,
    gatewayPaymentId?: GatewayPaymentIdVO,
    now: string = new Date().toISOString(),
  ): void {
    if (!this._status.isAuthorized()) {
      throw new BusinessRuleError(
        `Payment cannot be captured from status "${this._status.value}"`,
        'PAYMENT_CANNOT_BE_CAPTURED',
        { paymentId: this.id, status: this._status.value },
      );
    }
    if (!this.isCaptureWindowOpen(new Date(now))) {
      throw new BusinessRuleError(
        `Payment capture window (${PAYMENT_LIMIT.CAPTURE_WINDOW_HOURS}h) has closed`,
        'PAYMENT_CAPTURE_WINDOW_CLOSED',
        { paymentId: this.id, authorizedAt: this._authorizedAt },
      );
    }
    const finalAmount = capturedAmount ?? this._amount;
    if (finalAmount <= 0 || finalAmount > this._amount) {
      throw new ValidationError(
        `Captured amount must be > 0 and <= ${this._amount}`,
        'amount',
      );
    }
    if (finalAmount !== this._amount && !PAYMENT_LIMIT.PARTIAL_REFUND_ALLOWED) {
      throw new BusinessRuleError(
        'Partial capture is not allowed',
        'PARTIAL_CAPTURE_NOT_ALLOWED',
      );
    }

    this.assertTransitionTo('captured');
    const from = this._status.value;
    this._status = PaymentStatusVO.captured();
    this._capturedAt = now;
    if (gatewayPaymentId) this._gatewayPaymentId = gatewayPaymentId;
    this._amount = finalAmount;

    this.emitStatusChange(from, 'captured');
    this.addDomainEvent(
      new PaymentCapturedEvent({
        aggregateId: this.id,
        payload: {
          paymentId: this.id,
          gatewayPaymentId: this._gatewayPaymentId?.value,
          capturedAt: now,
          amount: this._amount,
          currency: this._currency,
        },
        version: this.version + 1,
      }),
    );
    this.touch(now);
    this.incrementVersion();
  }

  markPaid(now: string = new Date().toISOString()): void {
    if (!this._status.isCaptured()) {
      throw new BusinessRuleError(
        `Payment cannot be marked paid from status "${this._status.value}"`,
        'PAYMENT_CANNOT_BE_MARKED_PAID',
        { paymentId: this.id, status: this._status.value },
      );
    }
    const from = this._status.value;
    this._status = PaymentStatusVO.paid();
    this.emitStatusChange(from, 'paid');
    this.addDomainEvent(
      new PaymentPaidEvent({
        aggregateId: this.id,
        payload: {
          paymentId: this.id,
          orderId: this._orderId.value,
          paidAt: now,
          amount: this._amount,
          currency: this._currency,
        },
        version: this.version + 1,
      }),
    );
    this.touch(now);
    this.incrementVersion();
  }

  fail(
    reason: FailureReasonVO,
    code?: FailureCodeVO,
    now: string = new Date().toISOString(),
  ): void {
    this.assertTransitionTo('failed');
    const from = this._status.value;
    this._status = PaymentStatusVO.failed();
    this._failedAt = now;
    this._failureReason = reason;
    if (code) this._failureCode = code;
    this.emitStatusChange(from, 'failed');
    this.addDomainEvent(
      new PaymentFailedEvent({
        aggregateId: this.id,
        payload: {
          paymentId: this.id,
          failedAt: now,
          reason: reason.value,
          code: code?.value,
        },
        version: this.version + 1,
      }),
    );
    this.touch(now);
    this.incrementVersion();
  }

  decline(
    reason: FailureReasonVO,
    code?: FailureCodeVO,
    now: string = new Date().toISOString(),
  ): void {
    this.assertTransitionTo('declined');
    const from = this._status.value;
    this._status = PaymentStatusVO.declined();
    this._failedAt = now;
    this._failureReason = reason;
    if (code) this._failureCode = code;
    this.emitStatusChange(from, 'declined');
    this.addDomainEvent(
      new PaymentDeclinedEvent({
        aggregateId: this.id,
        payload: {
          paymentId: this.id,
          declinedAt: now,
          reason: reason.value,
          code: code?.value,
        },
        version: this.version + 1,
      }),
    );
    this.touch(now);
    this.incrementVersion();
  }

  cancel(
    reason?: string,
    cancelledBy?: string,
    now: string = new Date().toISOString(),
  ): void {
    if (!this.canBeCancelled()) {
      throw new BusinessRuleError(
        `Payment cannot be cancelled in status "${this._status.value}"`,
        'PAYMENT_CANNOT_BE_CANCELLED',
        { paymentId: this.id, status: this._status.value },
      );
    }
    this.assertTransitionTo('cancelled');
    const from = this._status.value;
    this._status = PaymentStatusVO.cancelled();
    this._cancelledAt = now;
    this.emitStatusChange(from, 'cancelled', cancelledBy);
    this.addDomainEvent(
      new PaymentCancelledEvent({
        aggregateId: this.id,
        payload: {
          paymentId: this.id,
          cancelledAt: now,
          reason,
          cancelledBy,
        },
        version: this.version + 1,
      }),
    );
    this.touch(now);
    this.incrementVersion();
  }

  expire(now: string = new Date().toISOString()): void {
    this.assertTransitionTo('expired');
    const from = this._status.value;
    this._status = PaymentStatusVO.expired();
    this._expiredAt = now;
    this.emitStatusChange(from, 'expired');
    this.addDomainEvent(
      new PaymentExpiredEvent({
        aggregateId: this.id,
        payload: { paymentId: this.id, expiredAt: now },
        version: this.version + 1,
      }),
    );
    this.touch(now);
    this.incrementVersion();
  }

  markRefunded(
    refundAmount: number,
    refundId?: string,
    now: string = new Date().toISOString(),
  ): void {
    if (!this._status.isSettled()) {
      throw new BusinessRuleError(
        `Payment cannot be refunded from status "${this._status.value}"`,
        'PAYMENT_CANNOT_BE_REFUNDED',
        { paymentId: this.id, status: this._status.value },
      );
    }
    if (refundAmount <= 0) {
      throw new ValidationError('Refund amount must be positive', 'amount');
    }
    if (refundAmount > this.refundableRemaining) {
      throw new BusinessRuleError(
        `Refund amount ${refundAmount} exceeds available ${this.refundableRemaining}`,
        'REFUND_AMOUNT_EXCEEDED',
        { paymentId: this.id, requested: refundAmount, available: this.refundableRemaining },
      );
    }

    const from = this._status.value;
    const newRefundedTotal = Math.round((this._refundedAmount + refundAmount) * 100) / 100;
    this._refundedAmount = newRefundedTotal;
    const fullyRefunded = newRefundedTotal >= this._amount;

    this._status = fullyRefunded
      ? PaymentStatusVO.refunded()
      : PaymentStatusVO.partiallyRefunded();

    this.emitStatusChange(from, this._status.value);
    this.addDomainEvent(
      new PaymentRefundedEvent({
        aggregateId: this.id,
        payload: {
          paymentId: this.id,
          refundId,
          refundedAt: now,
          amount: refundAmount,
          currency: this._currency,
          fullyRefunded,
        },
        version: this.version + 1,
      }),
    );
    this.touch(now);
    this.incrementVersion();
  }

  markChargeback(
    amount: number,
    reason?: string,
    now: string = new Date().toISOString(),
  ): void {
    if (!this._status.isSettled() && !this._status.isPartiallyRefunded()) {
      throw new BusinessRuleError(
        `Payment cannot be charged back from status "${this._status.value}"`,
        'PAYMENT_CANNOT_BE_CHARGED_BACK',
        { paymentId: this.id, status: this._status.value },
      );
    }
    if (amount <= 0 || amount > this._amount) {
      throw new ValidationError('Chargeback amount out of range', 'amount');
    }
    const from = this._status.value;
    this._status = PaymentStatusVO.chargeback();
    this.emitStatusChange(from, 'chargeback');
    this.addDomainEvent(
      new PaymentChargebackEvent({
        aggregateId: this.id,
        payload: {
          paymentId: this.id,
          chargebackAt: now,
          amount,
          currency: this._currency,
          reason,
        },
        version: this.version + 1,
      }),
    );
    this.touch(now);
    this.incrementVersion();
  }

  retry(now: string = new Date().toISOString()): void {
    if (!this.canBeRetried()) {
      throw new BusinessRuleError(
        `Payment cannot be retried (status: ${this._status.value}, attempts: ${this._retryAttempts}/${PAYMENT_LIMIT.MAX_ATTEMPTS})`,
        'PAYMENT_RETRY_LIMIT_EXCEEDED',
        { paymentId: this.id, attempts: this._retryAttempts, max: PAYMENT_LIMIT.MAX_ATTEMPTS },
      );
    }
    const from = this._status.value;
    this._retryAttempts += 1;
    this._status = PaymentStatusVO.pending();
    this._failureReason = undefined;
    this._failureCode = undefined;
    this._failedAt = undefined;
    this.emitStatusChange(from, 'pending');
    this.addDomainEvent(
      new PaymentRetryAttemptedEvent({
        aggregateId: this.id,
        payload: {
          paymentId: this.id,
          attempt: this._retryAttempts,
          attemptedAt: now,
        },
        version: this.version + 1,
      }),
    );
    this.touch(now);
    this.incrementVersion();
  }

  // ═══════════════ Private helpers ═══════════════
  private assertTransitionTo(target: string): void {
    if (!this._status.canTransitionTo(target)) {
      throw new BusinessRuleError(
        `Invalid status transition: "${this._status.value}" → "${target}"`,
        'INVALID_PAYMENT_STATUS_TRANSITION',
        { from: this._status.value, to: target, paymentId: this.id },
      );
    }
  }

  private emitStatusChange(from: string, to: string, changedBy?: string): void {
    this.addDomainEvent(
      new PaymentStatusChangedEvent({
        aggregateId: this.id,
        payload: {
          paymentId: this.id,
          fromStatus: from,
          toStatus: to,
          changedBy,
        },
        version: this.version + 1,
      }),
    );
  }

  private touch(now: string): void {
    (this as unknown as { updatedAt: string }).updatedAt = now;
  }

  // ═══════════════ Factories ═══════════════
  static create(params: {
    id: string;
    props: Omit<PaymentEntityProps, 'status' | 'refundedAmount' | 'retryAttempts'>;
    now: string;
  }): PaymentEntity {
    const fullProps: PaymentEntityProps = {
      ...params.props,
      status: PaymentStatusVO.pending(),
      refundedAmount: 0,
      retryAttempts: 0,
    };
    const entity = new PaymentEntity(params.id, params.now, params.now, fullProps);

    entity.addDomainEvent(
      new PaymentInitiatedEvent({
        aggregateId: params.id,
        payload: {
          paymentId: params.id,
          orderId: params.props.orderId.value,
          userId: params.props.userId.value,
          amount: params.props.amount,
          currency: params.props.currency,
          method: params.props.method.value,
          gateway: params.props.gateway?.value,
          type: params.props.type.value,
          idempotencyKey: params.props.idempotencyKey?.value,
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
    props: PaymentEntityProps;
    version?: number;
  }): PaymentEntity {
    const entity = new PaymentEntity(
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

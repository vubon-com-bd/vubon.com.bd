/**
 * PaymentEntity — AGGREGATE ROOT
 * @module payment-service/domain/entities
 *
 * State machine:
 *   pending → processing → authorized → captured → paid
 *   any → failed | declined | cancelled
 *   paid → refunded | partially_refunded → chargeback
 *
 * Invariants:
 *   - Amount positive, within limit
 *   - Currency must match amount
 *   - Captured payment requires capturedAt
 *   - Refunded payment requires refundedAmount > 0
 */
import { AggregateRoot } from '@vubon/shared-kernel/domain/base/base.aggregate';
import { BusinessRuleError } from '@vubon/shared-kernel/domain/errors/business-rule.error';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { PAYMENT_LIMIT } from '@vubon/shared-constants/business/payment';

import { PaymentIdVO } from '@domain/primitives/payment-id.vo';
import { PaymentStatusVO } from '@domain/primitives/payment-status.vo';
import { PaymentAmountVO } from '@domain/primitives/payment-amount.vo';
import { PaymentCurrencyVO } from '@domain/primitives/payment-currency.vo';
import { PaymentMethodTypeVO } from '@domain/primitives/payment-method-type.vo';
import { PaymentMethodProviderVO } from '@domain/primitives/payment-method-provider.vo';
import { OrderIdVO } from '@domain/primitives/order-id.vo';
import { UserIdVO } from '@domain/primitives/user-id.vo';
import { GatewayReferenceVO } from '@domain/primitives/gateway-reference.vo';

import {
  PaymentCreatedEvent,
  PaymentStatusChangedEvent,
  PaymentCapturedEvent,
  PaymentFailedEvent,
  PaymentRefundedEvent,
} from '@domain/events/payment.events';

export interface PaymentEntityProps {
  readonly orderId: OrderIdVO;
  readonly userId: UserIdVO;
  readonly amount: PaymentAmountVO;
  readonly currency: PaymentCurrencyVO;
  readonly status: PaymentStatusVO;
  readonly method: PaymentMethodTypeVO;
  readonly provider?: PaymentMethodProviderVO;
  readonly gatewayReference?: GatewayReferenceVO;
  readonly authorizedAt?: string;
  readonly capturedAt?: string;
  readonly paidAt?: string;
  readonly refundedAmount?: number;
  readonly failureReason?: string;
  readonly failureCode?: string;
  readonly metadata?: Readonly<Record<string, unknown>>;
}

export class PaymentEntity extends AggregateRoot<string> {
  private _status: PaymentStatusVO;
  private _amount: PaymentAmountVO;
  private _provider?: PaymentMethodProviderVO;
  private _gatewayReference?: GatewayReferenceVO;
  private _authorizedAt?: string;
  private _capturedAt?: string;
  private _paidAt?: string;
  private _refundedAmount?: number;
  private _failureReason?: string;
  private _failureCode?: string;

  private readonly _orderId: OrderIdVO;
  private readonly _userId: UserIdVO;
  private readonly _currency: PaymentCurrencyVO;
  private readonly _method: PaymentMethodTypeVO;
  private readonly _metadata?: Readonly<Record<string, unknown>>;

  private constructor(
    id: string,
    createdAt: string,
    updatedAt: string,
    props: PaymentEntityProps,
    deletedAt?: string | null,
    skipInvariants = false,
  ) {
    super(id, createdAt, updatedAt, deletedAt);
    this._orderId = props.orderId;
    this._userId = props.userId;
    this._amount = props.amount;
    this._currency = props.currency;
    this._status = props.status;
    this._method = props.method;
    this._provider = props.provider;
    this._gatewayReference = props.gatewayReference;
    this._authorizedAt = props.authorizedAt;
    this._capturedAt = props.capturedAt;
    this._paidAt = props.paidAt;
    this._refundedAmount = props.refundedAmount;
    this._failureReason = props.failureReason;
    this._failureCode = props.failureCode;
    this._metadata = props.metadata;

    if (!skipInvariants) this.assertInvariants();
  }

  // ═══════════════ Invariants ═══════════════
  private assertInvariants(): void {
    if (this._amount.amount < PAYMENT_LIMIT.MIN_AMOUNT) {
      throw new ValidationError(
        `Payment amount below minimum ${PAYMENT_LIMIT.MIN_AMOUNT}`,
        'amount',
      );
    }
    if (this._amount.currency !== this._currency.value) {
      throw new ValidationError(
        `Payment currency mismatch: ${this._amount.currency} vs ${this._currency.value}`,
        'currency',
      );
    }
    if (this._status.isCaptured() && !this._capturedAt) {
      throw new ValidationError('Captured payment requires capturedAt', 'capturedAt');
    }
    if (this._status.isPaid() && !this._paidAt) {
      throw new ValidationError('Paid payment requires paidAt', 'paidAt');
    }
    if (
      (this._status.isRefunded() || this._status.isPartiallyRefunded()) &&
      (!this._refundedAmount || this._refundedAmount <= 0)
    ) {
      throw new ValidationError(
        'Refunded payment requires refundedAmount > 0',
        'refundedAmount',
      );
    }
    if (this._status.isFailed() && !this._failureReason) {
      throw new ValidationError('Failed payment requires failureReason', 'failureReason');
    }
    if (this._method.requiresGateway() && !this._provider) {
      throw new ValidationError(
        'Online payment method requires a provider',
        'provider',
      );
    }
  }

  // ═══════════════ Getters ═══════════════
  get orderId(): OrderIdVO { return this._orderId; }
  get userId(): UserIdVO { return this._userId; }
  get amount(): PaymentAmountVO { return this._amount; }
  get currency(): PaymentCurrencyVO { return this._currency; }
  get status(): PaymentStatusVO { return this._status; }
  get method(): PaymentMethodTypeVO { return this._method; }
  get provider(): PaymentMethodProviderVO | undefined { return this._provider; }
  get gatewayReference(): GatewayReferenceVO | undefined { return this._gatewayReference; }
  get authorizedAt(): string | undefined { return this._authorizedAt; }
  get capturedAt(): string | undefined { return this._capturedAt; }
  get paidAt(): string | undefined { return this._paidAt; }
  get refundedAmount(): number { return this._refundedAmount ?? 0; }
  get failureReason(): string | undefined { return this._failureReason; }
  get failureCode(): string | undefined { return this._failureCode; }
  get metadata(): Readonly<Record<string, unknown>> | undefined { return this._metadata; }

  // ═══════════════ Predicates ═══════════════
  isPending(): boolean { return this._status.isPending(); }
  isProcessing(): boolean { return this._status.isProcessing(); }
  isAuthorized(): boolean { return this._status.isAuthorized(); }
  isCaptured(): boolean { return this._status.isCaptured(); }
  isPaid(): boolean { return this._status.isPaid(); }
  isFailed(): boolean { return this._status.isFailed(); }
  isDeclined(): boolean { return this._status.isDeclined(); }
  isCancelled(): boolean { return this._status.isCancelled(); }
  isRefunded(): boolean { return this._status.isRefunded(); }
  isPartiallyRefunded(): boolean { return this._status.isPartiallyRefunded(); }
  isFinal(): boolean { return this._status.isFinal(); }
  isSuccessful(): boolean { return this._status.isSuccessful(); }
  isRefundable(): boolean { return this._status.isRefundable(); }
  isRetryable(): boolean { return this._status.isRetryable(); }

  canBeCancelled(): boolean {
    return !this._status.isFinal() && !this.isCaptured() && !this.isPaid();
  }

  canBeCaptured(): boolean {
    return this._status.isAuthorized() || this._status.isProcessing();
  }

  canBeRefunded(): boolean {
    return this.isRefundable();
  }

  remainingRefundableAmount(): number {
    if (!this.isRefundable()) return 0;
    return Math.round((this._amount.amount - this.refundedAmount) * 100) / 100;
  }

  // ═══════════════ Business Actions ═══════════════
  authorize(now: string = new Date().toISOString()): void {
    this.assertTransitionTo('authorized');
    const from = this._status.value;
    this._status = PaymentStatusVO.authorized();
    this._authorizedAt = now;
    this.emitStatusChange(from, 'authorized');
    this.touch(now);
    this.incrementVersion();
  }

  startProcessing(now: string = new Date().toISOString()): void {
    this.assertTransitionTo('processing');
    const from = this._status.value;
    this._status = PaymentStatusVO.processing();
    this.emitStatusChange(from, 'processing');
    this.touch(now);
    this.incrementVersion();
  }

  capture(
    capturedAmount: number,
    gatewayReference: string,
    now: string = new Date().toISOString(),
  ): void {
    if (!this.canBeCaptured()) {
      throw new BusinessRuleError(
        `Payment cannot be captured in status "${this._status.value}"`,
        'PAYMENT_CANNOT_BE_CAPTURED',
        { paymentId: this.id, status: this._status.value },
      );
    }
    this.assertTransitionTo('captured');
    const from = this._status.value;
    this._status = PaymentStatusVO.captured();
    this._capturedAt = now;
    this._amount = PaymentAmountVO.create(capturedAmount, this._currency.value);
    this._gatewayReference = GatewayReferenceVO.create(gatewayReference);
    this.emitStatusChange(from, 'captured');
    this.addDomainEvent(
      new PaymentCapturedEvent({
        aggregateId: this.id,
        payload: {
          paymentId: this.id,
          capturedAmount,
          currency: this._currency.value,
          gatewayReference,
          capturedAt: now,
        },
        version: this.version + 1,
      }),
    );
    this.touch(now);
    this.incrementVersion();
  }

  markPaid(now: string = new Date().toISOString()): void {
    this.assertTransitionTo('paid');
    const from = this._status.value;
    this._status = PaymentStatusVO.paid();
    this._paidAt = now;
    this.emitStatusChange(from, 'paid');
    this.touch(now);
    this.incrementVersion();
  }

  fail(
    reason: string,
    failureCode?: string,
    now: string = new Date().toISOString(),
  ): void {
    if (this.isFinal()) {
      throw new BusinessRuleError(
        `Cannot fail payment in terminal status "${this._status.value}"`,
        'PAYMENT_CANNOT_BE_FAILED',
        { paymentId: this.id, status: this._status.value },
      );
    }
    this.assertTransitionTo('failed');
    const from = this._status.value;
    this._status = PaymentStatusVO.failed();
    this._failureReason = reason;
    this._failureCode = failureCode;
    this.emitStatusChange(from, 'failed', undefined, reason);
    this.addDomainEvent(
      new PaymentFailedEvent({
        aggregateId: this.id,
        payload: {
          paymentId: this.id,
          reason,
          failureCode,
          failedAt: now,
        },
        version: this.version + 1,
      }),
    );
    this.touch(now);
    this.incrementVersion();
  }

  decline(reason: string, now: string = new Date().toISOString()): void {
    this.assertTransitionTo('declined');
    const from = this._status.value;
    this._status = PaymentStatusVO.declined();
    this._failureReason = reason;
    this.emitStatusChange(from, 'declined', undefined, reason);
    this.touch(now);
    this.incrementVersion();
  }

  cancel(reason: string, cancelledBy: string, now: string = new Date().toISOString()): void {
    if (!this.canBeCancelled()) {
      throw new BusinessRuleError(
        `Payment "${this.id}" cannot be cancelled in status "${this._status.value}"`,
        'PAYMENT_CANNOT_BE_CANCELLED',
        { paymentId: this.id, status: this._status.value },
      );
    }
    this.assertTransitionTo('cancelled');
    const from = this._status.value;
    this._status = PaymentStatusVO.cancelled();
    this._failureReason = reason;
    this.emitStatusChange(from, 'cancelled', cancelledBy, reason);
    this.touch(now);
    this.incrementVersion();
  }

  /**
   * Called by Refund aggregate on completion.
   * @param refundAmount cumulative refunded amount (this round)
   */
  /**
   * Retry a failed/declined payment — moves to pending, then to processing.
   * This respects the state machine: failed/declined → pending → processing.
   */
  retry(reason: string = 'retry', now: string = new Date().toISOString()): void {
    if (!this.isRetryable()) {
      throw new BusinessRuleError(
        `Payment "${this.id}" cannot be retried in status "${this._status.value}"`,
        'PAYMENT_NOT_RETRYABLE',
        { paymentId: this.id, status: this._status.value },
      );
    }
    // failed/declined → pending (allowed)
    this.assertTransitionTo('pending');
    const from = this._status.value;
    this._status = PaymentStatusVO.pending();
    this._failureReason = undefined;
    this._failureCode = undefined;
    this.emitStatusChange(from, 'pending', undefined, reason);
    this.touch(now);
    this.incrementVersion();
  }

  applyRefund(refundAmount: number, refundId: string, now: string = new Date().toISOString()): void {
    if (!this.isRefundable()) {
      throw new BusinessRuleError(
        `Payment "${this.id}" is not refundable in status "${this._status.value}"`,
        'PAYMENT_NOT_REFUNDABLE',
        { paymentId: this.id, status: this._status.value },
      );
    }
    if (refundAmount <= 0) {
      throw new ValidationError('Refund amount must be positive', 'refundAmount');
    }
    if (refundAmount > this.remainingRefundableAmount()) {
      throw new BusinessRuleError(
        `Refund ${refundAmount} exceeds remaining refundable ${this.remainingRefundableAmount()}`,
        'REFUND_EXCEEDS_REMAINING',
        { paymentId: this.id, refundAmount, remaining: this.remainingRefundableAmount() },
      );
    }

    const previous = this.refundedAmount;
    const next = Math.round((previous + refundAmount) * 100) / 100;
    this._refundedAmount = next;

    const from = this._status.value;
    if (next >= this._amount.amount) {
      this._status = PaymentStatusVO.refunded();
    } else {
      this._status = PaymentStatusVO.partiallyRefunded();
    }

    this.emitStatusChange(from, this._status.value);
    this.addDomainEvent(
      new PaymentRefundedEvent({
        aggregateId: this.id,
        payload: {
          paymentId: this.id,
          refundId,
          refundedAmount: refundAmount,
          currency: this._currency.value,
          refundedAt: now,
        },
        version: this.version + 1,
      }),
    );
    this.touch(now);
    this.incrementVersion();
  }

  chargeback(reason: string, now: string = new Date().toISOString()): void {
    this.assertTransitionTo('chargeback');
    const from = this._status.value;
    this._status = PaymentStatusVO.create('chargeback');
    this._failureReason = reason;
    this.emitStatusChange(from, 'chargeback', undefined, reason);
    this.touch(now);
    this.incrementVersion();
  }

  // ═══════════════ Private Helpers ═══════════════
  private assertTransitionTo(target: string): void {
    if (!this._status.canTransitionTo(target)) {
      throw new BusinessRuleError(
        `Invalid payment status transition: "${this._status.value}" → "${target}"`,
        'INVALID_PAYMENT_STATUS_TRANSITION',
        { from: this._status.value, to: target, paymentId: this.id },
      );
    }
  }

  private emitStatusChange(
    from: string,
    to: string,
    changedBy?: string,
    reason?: string,
  ): void {
    this.addDomainEvent(
      new PaymentStatusChangedEvent({
        aggregateId: this.id,
        payload: {
          paymentId: this.id,
          fromStatus: from,
          toStatus: to,
          changedBy,
          reason,
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
    id: PaymentIdVO;
    props: Omit<PaymentEntityProps, 'status'>;
    now: string;
  }): PaymentEntity {
    const entity = new PaymentEntity(
      params.id.value,
      params.now,
      params.now,
      { ...params.props, status: PaymentStatusVO.pending() },
      null,
    );

    entity.addDomainEvent(
      new PaymentCreatedEvent({
        aggregateId: params.id.value,
        payload: {
          paymentId: params.id.value,
          orderId: params.props.orderId.value,
          userId: params.props.userId.value,
          amount: params.props.amount.amount,
          currency: params.props.currency.value,
          method: params.props.method.method,
          createdAt: params.now,
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
      params.deletedAt ?? null,
      true,
    );
    if (params.version !== undefined) {
      for (let i = 0; i < params.version; i++) entity.incrementVersion();
    }
    return entity;
  }
}

/**
 * RefundEntity — refund lifecycle for a payment
 * @module payment-service/domain/entities
 */
import { AggregateRoot } from '@vubon/shared-kernel/domain/base/base.aggregate';
import { BusinessRuleError } from '@vubon/shared-kernel/domain/errors/business-rule.error';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

import { RefundIdVO } from '../value-objects/primitives/refund-id.vo.js';
import { RefundStatusVO } from '../value-objects/primitives/refund-status.vo.js';
import { RefundReasonVO } from '../value-objects/primitives/refund-reason.vo.js';
import { PaymentIdVO } from '../value-objects/primitives/payment-id.vo.js';
import { OrderIdVO } from '../value-objects/primitives/order-id.vo.js';
import { FailureReasonVO } from '../value-objects/primitives/failure-reason.vo.js';
import { FailureCodeVO } from '../value-objects/primitives/failure-code.vo.js';
import { UserIdVO } from '../value-objects/primitives/user-id.vo.js';

import {
  RefundRequestedEvent,
  RefundApprovedEvent,
  RefundProcessingEvent,
  RefundSucceededEvent,
  RefundFailedEvent,
  RefundCancelledEvent,
} from '../events/refund.events.js';

export interface RefundEntityProps {
  readonly paymentId: PaymentIdVO;
  readonly transactionId?: string;
  readonly orderId?: OrderIdVO;
  readonly status: RefundStatusVO;
  readonly amount: number;
  readonly currency: string;
  readonly reason?: RefundReasonVO;
  readonly requestedBy?: UserIdVO;
  readonly approvedBy?: UserIdVO;
  readonly gatewayRefundId?: string;
  readonly processedAt?: string;
  readonly failedAt?: string;
  readonly failureReason?: FailureReasonVO;
  readonly failureCode?: FailureCodeVO;
}

export class RefundEntity extends AggregateRoot<string> {
  private _status: RefundStatusVO;
  private _gatewayRefundId?: string;
  private _approvedBy?: UserIdVO;
  private _processedAt?: string;
  private _failedAt?: string;
  private _failureReason?: FailureReasonVO;
  private _failureCode?: FailureCodeVO;

  private readonly _paymentId: PaymentIdVO;
  private readonly _transactionId?: string;
  private readonly _orderId?: OrderIdVO;
  private readonly _amount: number;
  private readonly _currency: string;
  private readonly _reason?: RefundReasonVO;
  private readonly _requestedBy?: UserIdVO;

  private constructor(
    id: string,
    createdAt: string,
    updatedAt: string,
    props: RefundEntityProps,
    deletedAt?: string | null,
  ) {
    super(id, createdAt, updatedAt, deletedAt);
    this._paymentId = props.paymentId;
    this._transactionId = props.transactionId;
    this._orderId = props.orderId;
    this._status = props.status;
    this._amount = props.amount;
    this._currency = props.currency;
    this._reason = props.reason;
    this._requestedBy = props.requestedBy;
    this._approvedBy = props.approvedBy;
    this._gatewayRefundId = props.gatewayRefundId;
    this._processedAt = props.processedAt;
    this._failedAt = props.failedAt;
    this._failureReason = props.failureReason;
    this._failureCode = props.failureCode;
    this.assertInvariants();
  }

  private assertInvariants(): void {
    if (!Number.isFinite(this._amount) || this._amount <= 0) {
      throw new ValidationError('Refund amount must be positive', 'amount');
    }
    if (typeof this._currency !== 'string' || this._currency.length !== 3) {
      throw new ValidationError('Currency must be a 3-char code', 'currency');
    }
  }

  // ─── Getters ───
  get paymentId(): PaymentIdVO { return this._paymentId; }
  get transactionId(): string | undefined { return this._transactionId; }
  get orderId(): OrderIdVO | undefined { return this._orderId; }
  get status(): RefundStatusVO { return this._status; }
  get amount(): number { return this._amount; }
  get currency(): string { return this._currency; }
  get reason(): RefundReasonVO | undefined { return this._reason; }
  get requestedBy(): UserIdVO | undefined { return this._requestedBy; }
  get approvedBy(): UserIdVO | undefined { return this._approvedBy; }
  get gatewayRefundId(): string | undefined { return this._gatewayRefundId; }
  get processedAt(): string | undefined { return this._processedAt; }
  get failedAt(): string | undefined { return this._failedAt; }
  get failureReason(): FailureReasonVO | undefined { return this._failureReason; }
  get failureCode(): FailureCodeVO | undefined { return this._failureCode; }

  get toIdVO(): RefundIdVO { return RefundIdVO.reconstitute(this.id); }

  // ─── Predicates ───
  isPending(): boolean { return this._status.value === 'pending'; }
  isProcessing(): boolean { return this._status.value === 'processing'; }
  isSuccess(): boolean { return this._status.isSuccess(); }
  isFailed(): boolean { return this._status.value === 'failed'; }
  isCancelled(): boolean { return this._status.value === 'cancelled'; }
  isFinal(): boolean { return this._status.isFinal(); }

  // ─── Business methods ───
  approve(approvedBy?: UserIdVO, now: string = new Date().toISOString()): void {
    if (!this._status.isFinal() && this.isPending()) {
      if (approvedBy) this._approvedBy = approvedBy;
      this.addDomainEvent(
        new RefundApprovedEvent({
          aggregateId: this.id,
          payload: {
            refundId: this.id,
            paymentId: this._paymentId.value,
            approvedAt: now,
            approvedBy: approvedBy?.value,
          },
          version: this.version + 1,
        }),
      );
      this.touch(now);
      this.incrementVersion();
      return;
    }
    throw new BusinessRuleError(
      `Refund "${this.id}" cannot be approved from status "${this._status.value}"`,
      'REFUND_CANNOT_BE_APPROVED',
      { refundId: this.id, status: this._status.value },
    );
  }

  startProcessing(
    gatewayRefundId?: string,
    now: string = new Date().toISOString(),
  ): void {
    this.assertTransitionTo('processing');
    this._status = RefundStatusVO.processing();
    if (gatewayRefundId) this._gatewayRefundId = gatewayRefundId;
    this.addDomainEvent(
      new RefundProcessingEvent({
        aggregateId: this.id,
        payload: {
          refundId: this.id,
          paymentId: this._paymentId.value,
          gatewayRefundId,
        },
        version: this.version + 1,
      }),
    );
    this.touch(now);
    this.incrementVersion();
  }

  succeed(
    gatewayRefundId?: string,
    now: string = new Date().toISOString(),
  ): void {
    this.assertTransitionTo('succeeded');
    this._status = RefundStatusVO.succeeded();
    if (gatewayRefundId) this._gatewayRefundId = gatewayRefundId;
    this._processedAt = now;
    this.addDomainEvent(
      new RefundSucceededEvent({
        aggregateId: this.id,
        payload: {
          refundId: this.id,
          paymentId: this._paymentId.value,
          processedAt: now,
          amount: this._amount,
          currency: this._currency,
          gatewayRefundId: this._gatewayRefundId,
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
    this._status = RefundStatusVO.failed();
    this._failedAt = now;
    this._failureReason = reason;
    if (code) this._failureCode = code;
    this.addDomainEvent(
      new RefundFailedEvent({
        aggregateId: this.id,
        payload: {
          refundId: this.id,
          paymentId: this._paymentId.value,
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

  cancel(reason?: string, now: string = new Date().toISOString()): void {
    this.assertTransitionTo('cancelled');
    this._status = RefundStatusVO.cancelled();
    this.addDomainEvent(
      new RefundCancelledEvent({
        aggregateId: this.id,
        payload: {
          refundId: this.id,
          paymentId: this._paymentId.value,
          cancelledAt: now,
          reason,
        },
        version: this.version + 1,
      }),
    );
    this.touch(now);
    this.incrementVersion();
  }

  private assertTransitionTo(target: string): void {
    if (!this._status.canTransitionTo(target)) {
      throw new BusinessRuleError(
        `Invalid refund transition: "${this._status.value}" → "${target}"`,
        'INVALID_REFUND_STATUS_TRANSITION',
        { from: this._status.value, to: target, refundId: this.id },
      );
    }
  }

  private touch(now: string): void {
    (this as unknown as { updatedAt: string }).updatedAt = now;
  }

  // ─── Factories ───
  static request(params: {
    id: string;
    props: Omit<RefundEntityProps, 'status'>;
    now: string;
  }): RefundEntity {
    const fullProps: RefundEntityProps = {
      ...params.props,
      status: RefundStatusVO.pending(),
    };
    const entity = new RefundEntity(params.id, params.now, params.now, fullProps);
    entity.addDomainEvent(
      new RefundRequestedEvent({
        aggregateId: params.id,
        payload: {
          refundId: params.id,
          paymentId: params.props.paymentId.value,
          orderId: params.props.orderId?.value,
          amount: params.props.amount,
          currency: params.props.currency,
          reason: params.props.reason?.value,
          requestedBy: params.props.requestedBy?.value,
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
    props: RefundEntityProps;
    version?: number;
  }): RefundEntity {
    const entity = new RefundEntity(
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

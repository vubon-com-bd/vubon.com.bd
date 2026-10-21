/**
 * RefundEntity
 * @module payment-service/domain/entities
 */
import { BaseEntity } from '@vubon/shared-kernel/domain/base/base.entity';
import { BusinessRuleError } from '@vubon/shared-kernel/domain/errors/business-rule.error';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

import { RefundIdVO } from '@domain/primitives/refund-id.vo';
import { RefundAmountVO } from '@domain/primitives/refund-amount.vo';
import { RefundReasonVO } from '@domain/primitives/refund-reason.vo';
import { RefundStatusVO } from '@domain/primitives/refund-status.vo';
import { PaymentIdVO } from '@domain/primitives/payment-id.vo';

import {
  RefundStatusChangedEvent,
  RefundCompletedEvent,
} from '@domain/events/refund.events';

import type { DomainEvent } from '@vubon/shared-kernel/domain/base/base.event';

export interface RefundEntityProps {
  readonly paymentId: PaymentIdVO;
  readonly amount: RefundAmountVO;
  readonly reason: RefundReasonVO;
  readonly status: RefundStatusVO;
  readonly requestedBy?: string;
  readonly approvedBy?: string;
  readonly completedAt?: string;
  readonly failureReason?: string;
}

export class RefundEntity extends BaseEntity<string> {
  private _status: RefundStatusVO;
  private _approvedBy?: string;
  private _completedAt?: string;
  private _failureReason?: string;
  private readonly _events: DomainEvent[] = [];

  private readonly _paymentId: PaymentIdVO;
  private readonly _amount: RefundAmountVO;
  private readonly _reason: RefundReasonVO;
  private readonly _requestedBy?: string;

  private constructor(
    id: string,
    createdAt: string,
    updatedAt: string,
    props: RefundEntityProps,
    deletedAt?: string | null,
  ) {
    super(id, createdAt, updatedAt, deletedAt);
    this._paymentId = props.paymentId;
    this._amount = props.amount;
    this._reason = props.reason;
    this._status = props.status;
    this._requestedBy = props.requestedBy;
    this._approvedBy = props.approvedBy;
    this._completedAt = props.completedAt;
    this._failureReason = props.failureReason;
    this.assertInvariants();
  }

  private assertInvariants(): void {
    if (this._amount.amount <= 0) {
      throw new ValidationError('Refund amount must be positive', 'amount');
    }
    if (this._status.isApproved() && !this._approvedBy) {
      throw new ValidationError('Approved refund requires approvedBy', 'approvedBy');
    }
    if (this._status.isCompleted() && !this._completedAt) {
      throw new ValidationError('Completed refund requires completedAt', 'completedAt');
    }
  }

  get paymentId(): PaymentIdVO { return this._paymentId; }
  get amount(): RefundAmountVO { return this._amount; }
  get reason(): RefundReasonVO { return this._reason; }
  get status(): RefundStatusVO { return this._status; }
  get requestedBy(): string | undefined { return this._requestedBy; }
  get approvedBy(): string | undefined { return this._approvedBy; }
  get completedAt(): string | undefined { return this._completedAt; }
  get failureReason(): string | undefined { return this._failureReason; }

  get domainEvents(): readonly DomainEvent[] { return [...this._events]; }
  pullDomainEvents(): readonly DomainEvent[] {
    const out = [...this._events];
    this._events.length = 0;
    return out;
  }

  isCompleted(): boolean { return this._status.isCompleted(); }
  isFinal(): boolean { return this._status.isFinal(); }
  isRetryable(): boolean { return this._status.isRetryable(); }

  approve(approvedBy: string, now: string = new Date().toISOString()): void {
    this.assertTransitionTo('approved');
    const from = this._status.value;
    this._status = RefundStatusVO.approved();
    this._approvedBy = approvedBy;
    this.emitStatusChange(from, 'approved');
    this.touch(now);
  }

  reject(reason: string, now: string = new Date().toISOString()): void {
    this.assertTransitionTo('rejected');
    const from = this._status.value;
    this._status = RefundStatusVO.rejected();
    this._failureReason = reason;
    this.emitStatusChange(from, 'rejected', reason);
    this.touch(now);
  }

  startProcessing(now: string = new Date().toISOString()): void {
    this.assertTransitionTo('processing');
    const from = this._status.value;
    this._status = RefundStatusVO.processing();
    this.emitStatusChange(from, 'processing');
    this.touch(now);
  }

  complete(now: string = new Date().toISOString()): void {
    this.assertTransitionTo('completed');
    const from = this._status.value;
    this._status = RefundStatusVO.completed();
    this._completedAt = now;
    this.emitStatusChange(from, 'completed');
    this._events.push(
      new RefundCompletedEvent({
        aggregateId: this.id,
        payload: {
          refundId: this.id,
          paymentId: this._paymentId.value,
          refundedAmount: this._amount.amount,
          currency: this._amount.currency,
          completedAt: now,
        },
        version: 1,
      }),
    );
    this.touch(now);
  }

  fail(reason: string, now: string = new Date().toISOString()): void {
    this.assertTransitionTo('failed');
    const from = this._status.value;
    this._status = RefundStatusVO.failed();
    this._failureReason = reason;
    this.emitStatusChange(from, 'failed', reason);
    this.touch(now);
  }

  cancel(now: string = new Date().toISOString()): void {
    this.assertTransitionTo('cancelled');
    const from = this._status.value;
    this._status = RefundStatusVO.cancelled();
    this.emitStatusChange(from, 'cancelled');
    this.touch(now);
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

  private emitStatusChange(from: string, to: string, reason?: string): void {
    this._events.push(
      new RefundStatusChangedEvent({
        aggregateId: this.id,
        payload: {
          refundId: this.id,
          paymentId: this._paymentId.value,
          fromStatus: from,
          toStatus: to,
          reason,
        },
        version: 1,
      }),
    );
  }

  private touch(now: string): void {
    (this as unknown as { updatedAt: string }).updatedAt = now;
  }

  static create(params: {
    id: RefundIdVO;
    props: Omit<RefundEntityProps, 'status'>;
    now: string;
  }): RefundEntity {
    return new RefundEntity(
      params.id.value,
      params.now,
      params.now,
      { ...params.props, status: RefundStatusVO.requested() },
    );
  }

  static reconstitute(params: {
    id: string;
    createdAt: string;
    updatedAt: string;
    deletedAt?: string | null;
    props: RefundEntityProps;
  }): RefundEntity {
    return new RefundEntity(
      params.id,
      params.createdAt,
      params.updatedAt,
      params.props,
      params.deletedAt ?? null,
    );
  }
}

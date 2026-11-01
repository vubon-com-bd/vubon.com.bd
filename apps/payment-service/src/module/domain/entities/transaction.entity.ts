/**
 * TransactionEntity
 * @module payment-service/domain/entities
 *
 * Immutable-ledger style — status transitions are strictly forward.
 */
import { BaseEntity } from '@vubon/shared-kernel/domain/base/base.entity';
import { BusinessRuleError } from '@vubon/shared-kernel/domain/errors/business-rule.error';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

import { TransactionIdVO } from '@domain/primitives/transaction-id.vo';
import { TransactionTypeVO } from '@domain/primitives/transaction-type.vo';
import { TransactionStatusVO } from '@domain/primitives/transaction-status.vo';
import { PaymentIdVO } from '@domain/primitives/payment-id.vo';
import { PaymentAmountVO } from '@domain/primitives/payment-amount.vo';
import { GatewayReferenceVO } from '@domain/primitives/gateway-reference.vo';

import {
  TransactionStatusChangedEvent,
  TransactionSettledEvent,
} from '@domain/events/transaction.events';

// ⚠️ BaseEntity doesn't have events — use local buffer
import type { DomainEvent } from '@vubon/shared-kernel/domain/base/base.event';

export interface TransactionEntityProps {
  readonly paymentId: PaymentIdVO;
  readonly type: TransactionTypeVO;
  readonly status: TransactionStatusVO;
  readonly amount: PaymentAmountVO;
  readonly gatewayReference?: GatewayReferenceVO;
  readonly settledAt?: string;
  readonly failureReason?: string;
}

export class TransactionEntity extends BaseEntity<string> {
  private _status: TransactionStatusVO;
  private _gatewayReference?: GatewayReferenceVO;
  private _settledAt?: string;
  private _failureReason?: string;
  private readonly _events: DomainEvent[] = [];

  private readonly _paymentId: PaymentIdVO;
  private readonly _type: TransactionTypeVO;
  private readonly _amount: PaymentAmountVO;

  private constructor(
    id: string,
    createdAt: string,
    updatedAt: string,
    props: TransactionEntityProps,
    deletedAt?: string | null,
  ) {
    super(id, createdAt, updatedAt, deletedAt);
    this._paymentId = props.paymentId;
    this._type = props.type;
    this._status = props.status;
    this._amount = props.amount;
    this._gatewayReference = props.gatewayReference;
    this._settledAt = props.settledAt;
    this._failureReason = props.failureReason;
    this.assertInvariants();
  }

  private assertInvariants(): void {
    if (this._amount.amount <= 0) {
      throw new ValidationError('Transaction amount must be positive', 'amount');
    }
    if (this._status.isSettled() && !this._settledAt) {
      throw new ValidationError('Settled transaction requires settledAt', 'settledAt');
    }
  }

  get paymentId(): PaymentIdVO { return this._paymentId; }
  get type(): TransactionTypeVO { return this._type; }
  get status(): TransactionStatusVO { return this._status; }
  get amount(): PaymentAmountVO { return this._amount; }
  get gatewayReference(): GatewayReferenceVO | undefined { return this._gatewayReference; }
  get settledAt(): string | undefined { return this._settledAt; }
  get failureReason(): string | undefined { return this._failureReason; }

  get domainEvents(): readonly DomainEvent[] { return [...this._events]; }

  pullDomainEvents(): readonly DomainEvent[] {
    const out = [...this._events];
    this._events.length = 0;
    return out;
  }

  isSuccess(): boolean { return this._status.isSuccess(); }
  isSettled(): boolean { return this._status.isSettled(); }
  isFinal(): boolean { return this._status.isFinal(); }
  isRetryable(): boolean { return this._status.isRetryable(); }

  markSuccess(gatewayReference: string, now: string = new Date().toISOString()): void {
    this.assertTransitionTo('success');
    const from = this._status.value;
    this._status = TransactionStatusVO.success();
    this._gatewayReference = GatewayReferenceVO.create(gatewayReference);
    this.emitStatusChange(from, 'success');
    this.touch(now);
  }

  markFailed(reason: string, now: string = new Date().toISOString()): void {
    if (this._status.isFinal() && !this._status.isFailed()) {
      throw new BusinessRuleError(
        `Cannot fail transaction in status "${this._status.value}"`,
        'TRANSACTION_CANNOT_BE_FAILED',
        { transactionId: this.id, status: this._status.value },
      );
    }
    this.assertTransitionTo('failed');
    const from = this._status.value;
    this._status = TransactionStatusVO.failed();
    this._failureReason = reason;
    this.emitStatusChange(from, 'failed', reason);
    this.touch(now);
  }

  settle(now: string = new Date().toISOString()): void {
    this.assertTransitionTo('settled');
    const from = this._status.value;
    this._status = TransactionStatusVO.settled();
    this._settledAt = now;
    this.emitStatusChange(from, 'settled');
    this._events.push(
      new TransactionSettledEvent({
        aggregateId: this.id,
        payload: {
          transactionId: this.id,
          paymentId: this._paymentId.value,
          amount: this._amount.amount,
          currency: this._amount.currency,
          settledAt: now,
        },
        version: 1,
      }),
    );
    this.touch(now);
  }

  reverse(reason: string, now: string = new Date().toISOString()): void {
    this.assertTransitionTo('reversed');
    const from = this._status.value;
    this._status = TransactionStatusVO.create('reversed');
    this._failureReason = reason;
    this.emitStatusChange(from, 'reversed', reason);
    this.touch(now);
  }

  private assertTransitionTo(target: string): void {
    if (!this._status.canTransitionTo(target)) {
      throw new BusinessRuleError(
        `Invalid transaction transition: "${this._status.value}" → "${target}"`,
        'INVALID_TRANSACTION_STATUS_TRANSITION',
        { from: this._status.value, to: target, transactionId: this.id },
      );
    }
  }

  private emitStatusChange(from: string, to: string, reason?: string): void {
    this._events.push(
      new TransactionStatusChangedEvent({
        aggregateId: this.id,
        payload: {
          transactionId: this.id,
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
    id: TransactionIdVO;
    props: Omit<TransactionEntityProps, 'status'>;
    now: string;
  }): TransactionEntity {
    return new TransactionEntity(
      params.id.value,
      params.now,
      params.now,
      { ...params.props, status: TransactionStatusVO.pending() },
    );
  }

  static reconstitute(params: {
    id: string;
    createdAt: string;
    updatedAt: string;
    deletedAt?: string | null;
    props: TransactionEntityProps;
  }): TransactionEntity {
    return new TransactionEntity(
      params.id,
      params.createdAt,
      params.updatedAt,
      params.props,
      params.deletedAt ?? null,
    );
  }
}

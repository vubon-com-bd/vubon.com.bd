/**
 * TransactionEntity — a single money movement under a payment
 * @module payment-service/domain/entities
 */
import { AggregateRoot } from '@vubon/shared-kernel/domain/base/base.aggregate';
import { BusinessRuleError } from '@vubon/shared-kernel/domain/errors/business-rule.error';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

import { TransactionIdVO } from '../value-objects/primitives/transaction-id.vo.js';
import { TransactionTypeVO } from '../value-objects/primitives/transaction-type.vo.js';
import { TransactionStatusVO } from '../value-objects/primitives/transaction-status.vo.js';
import { TransactionReferenceVO } from '../value-objects/primitives/transaction-reference.vo.js';
import { PaymentIdVO } from '../value-objects/primitives/payment-id.vo.js';
import { OrderIdVO } from '../value-objects/primitives/order-id.vo.js';
import { UserIdVO } from '../value-objects/primitives/user-id.vo.js';
import { FailureReasonVO } from '../value-objects/primitives/failure-reason.vo.js';
import { FailureCodeVO } from '../value-objects/primitives/failure-code.vo.js';

import {
  TransactionCreatedEvent,
  TransactionSucceededEvent,
  TransactionFailedEvent,
  TransactionCancelledEvent,
  TransactionReversedEvent,
  TransactionSettledEvent,
} from '../events/transaction.events.js';

export interface TransactionEntityProps {
  readonly paymentId: PaymentIdVO;
  readonly orderId?: OrderIdVO;
  readonly userId?: UserIdVO;
  readonly type: TransactionTypeVO;
  readonly status: TransactionStatusVO;
  readonly amount: number;
  readonly currency: string;
  readonly gateway?: string;
  readonly gatewayTransactionId?: string;
  readonly reference?: TransactionReferenceVO;
  readonly idempotencyKey?: string;
  readonly errorCode?: FailureCodeVO;
  readonly errorMessage?: FailureReasonVO;
  readonly metadata?: Readonly<Record<string, unknown>>;
  readonly processedAt?: string;
}

export class TransactionEntity extends AggregateRoot<string> {
  private _status: TransactionStatusVO;
  private _gatewayTransactionId?: string;
  private _errorCode?: FailureCodeVO;
  private _errorMessage?: FailureReasonVO;
  private _processedAt?: string;
  private _reversedAt?: string;

  private readonly _paymentId: PaymentIdVO;
  private readonly _orderId?: OrderIdVO;
  private readonly _userId?: UserIdVO;
  private readonly _type: TransactionTypeVO;
  private readonly _amount: number;
  private readonly _currency: string;
  private readonly _gateway?: string;
  private readonly _reference?: TransactionReferenceVO;
  private readonly _idempotencyKey?: string;
  private readonly _metadata?: Readonly<Record<string, unknown>>;

  private constructor(
    id: string,
    createdAt: string,
    updatedAt: string,
    props: TransactionEntityProps,
    deletedAt?: string | null,
  ) {
    super(id, createdAt, updatedAt, deletedAt);

    this._paymentId = props.paymentId;
    this._orderId = props.orderId;
    this._userId = props.userId;
    this._type = props.type;
    this._status = props.status;
    this._amount = props.amount;
    this._currency = props.currency;
    this._gateway = props.gateway;
    this._gatewayTransactionId = props.gatewayTransactionId;
    this._reference = props.reference;
    this._idempotencyKey = props.idempotencyKey;
    this._errorCode = props.errorCode;
    this._errorMessage = props.errorMessage;
    this._metadata = props.metadata;
    this._processedAt = props.processedAt;

    this.assertInvariants();
  }

  private assertInvariants(): void {
    if (!Number.isFinite(this._amount) || this._amount <= 0) {
      throw new ValidationError('Transaction amount must be positive', 'amount');
    }
    if (typeof this._currency !== 'string' || this._currency.length !== 3) {
      throw new ValidationError('Currency must be a 3-char code', 'currency');
    }
  }

  // ─── Getters ───
  get paymentId(): PaymentIdVO { return this._paymentId; }
  get orderId(): OrderIdVO | undefined { return this._orderId; }
  get userId(): UserIdVO | undefined { return this._userId; }
  get type(): TransactionTypeVO { return this._type; }
  get status(): TransactionStatusVO { return this._status; }
  get amount(): number { return this._amount; }
  get currency(): string { return this._currency; }
  get gateway(): string | undefined { return this._gateway; }
  get gatewayTransactionId(): string | undefined { return this._gatewayTransactionId; }
  get reference(): TransactionReferenceVO | undefined { return this._reference; }
  get idempotencyKey(): string | undefined { return this._idempotencyKey; }
  get errorCode(): FailureCodeVO | undefined { return this._errorCode; }
  get errorMessage(): FailureReasonVO | undefined { return this._errorMessage; }
  get processedAt(): string | undefined { return this._processedAt; }
  get reversedAt(): string | undefined { return this._reversedAt; }
  get metadata(): Readonly<Record<string, unknown>> | undefined { return this._metadata; }

  get toIdVO(): TransactionIdVO { return TransactionIdVO.reconstitute(this.id); }

  // ─── Predicates ───
  isPending(): boolean { return this._status.value === 'pending'; }
  isSuccess(): boolean { return this._status.isSuccess(); }
  isFailed(): boolean { return this._status.value === 'failed'; }
  isSettled(): boolean { return this._status.value === 'settled'; }
  isReversed(): boolean { return this._status.value === 'reversed'; }
  isDebit(): boolean { return this._type.isDebit(); }
  isCredit(): boolean { return this._type.isCredit(); }

  signedAmount(): number {
    return this.isCredit() ? this._amount : -this._amount;
  }

  // ─── Business methods ───
  markSucceeded(
    gatewayTransactionId?: string,
    now: string = new Date().toISOString(),
  ): void {
    this.assertTransitionTo('success');
    this._status = TransactionStatusVO.success();
    if (gatewayTransactionId) this._gatewayTransactionId = gatewayTransactionId;
    this._processedAt = now;
    this.addDomainEvent(
      new TransactionSucceededEvent({
        aggregateId: this.id,
        payload: {
          transactionId: this.id,
          paymentId: this._paymentId.value,
          processedAt: now,
          gatewayTransactionId,
        },
        version: this.version + 1,
      }),
    );
    this.touch(now);
    this.incrementVersion();
  }

  markFailed(
    reason: FailureReasonVO,
    code?: FailureCodeVO,
    now: string = new Date().toISOString(),
  ): void {
    this.assertTransitionTo('failed');
    this._status = TransactionStatusVO.failed();
    this._errorMessage = reason;
    if (code) this._errorCode = code;
    this._processedAt = now;
    this.addDomainEvent(
      new TransactionFailedEvent({
        aggregateId: this.id,
        payload: {
          transactionId: this.id,
          paymentId: this._paymentId.value,
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
    this._status = TransactionStatusVO.cancelled();
    this._processedAt = now;
    this.addDomainEvent(
      new TransactionCancelledEvent({
        aggregateId: this.id,
        payload: {
          transactionId: this.id,
          paymentId: this._paymentId.value,
          reason,
        },
        version: this.version + 1,
      }),
    );
    this.touch(now);
    this.incrementVersion();
  }

  reverse(reversedBy?: string, now: string = new Date().toISOString()): void {
    if (!this._status.canBeReversed()) {
      throw new BusinessRuleError(
        `Transaction "${this.id}" cannot be reversed in status "${this._status.value}"`,
        'TRANSACTION_CANNOT_BE_REVERSED',
        { transactionId: this.id, status: this._status.value },
      );
    }
    this._status = TransactionStatusVO.reversed();
    this._reversedAt = now;
    this.addDomainEvent(
      new TransactionReversedEvent({
        aggregateId: this.id,
        payload: {
          transactionId: this.id,
          paymentId: this._paymentId.value,
          reversedAt: now,
          reversedBy,
        },
        version: this.version + 1,
      }),
    );
    this.touch(now);
    this.incrementVersion();
  }

  settle(now: string = new Date().toISOString()): void {
    if (!this._status.isSuccess()) {
      throw new BusinessRuleError(
        `Transaction "${this.id}" cannot be settled from status "${this._status.value}"`,
        'TRANSACTION_CANNOT_BE_SETTLED',
        { transactionId: this.id, status: this._status.value },
      );
    }
    this._status = TransactionStatusVO.settled();
    this.addDomainEvent(
      new TransactionSettledEvent({
        aggregateId: this.id,
        payload: {
          transactionId: this.id,
          paymentId: this._paymentId.value,
          settledAt: now,
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
        `Invalid transaction transition: "${this._status.value}" → "${target}"`,
        'INVALID_TRANSACTION_STATUS_TRANSITION',
        { from: this._status.value, to: target, transactionId: this.id },
      );
    }
  }

  private touch(now: string): void {
    (this as unknown as { updatedAt: string }).updatedAt = now;
  }

  // ─── Factories ───
  static create(params: {
    id: string;
    props: Omit<TransactionEntityProps, 'status' | 'processedAt'>;
    now: string;
  }): TransactionEntity {
    const fullProps: TransactionEntityProps = {
      ...params.props,
      status: TransactionStatusVO.pending(),
    };
    const entity = new TransactionEntity(params.id, params.now, params.now, fullProps);

    entity.addDomainEvent(
      new TransactionCreatedEvent({
        aggregateId: params.id,
        payload: {
          transactionId: params.id,
          paymentId: params.props.paymentId.value,
          type: params.props.type.value,
          amount: params.props.amount,
          currency: params.props.currency,
          reference: params.props.reference?.value,
          idempotencyKey: params.props.idempotencyKey,
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
    props: TransactionEntityProps;
    version?: number;
  }): TransactionEntity {
    const entity = new TransactionEntity(
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

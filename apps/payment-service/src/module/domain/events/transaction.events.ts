/**
 * Transaction Domain Events
 * @module payment-service/domain/events
 */
import { BaseDomainEvent } from '@vubon/shared-kernel/domain/base/base.event';
import type { DomainEventMetadata } from '@vubon/shared-kernel/domain/base/base.event';
import type { Timestamp } from '@vubon/shared-types/common';
import { PAYMENT_AGGREGATE_TYPE, newEventId, now } from './event.helpers.js';

export const TRANSACTION_EVENT_TYPE = {
  CREATED: 'payment.transaction.created',
  STATUS_CHANGED: 'payment.transaction.status_changed',
  SUCCEEDED: 'payment.transaction.succeeded',
  FAILED: 'payment.transaction.failed',
  SETTLED: 'payment.transaction.settled',
} as const;

export interface TransactionCreatedPayload {
  readonly transactionId: string;
  readonly paymentId: string;
  readonly type: string;
  readonly amount: number;
  readonly currency: string;
  readonly createdAt: string;
}

export interface TransactionStatusChangedPayload {
  readonly transactionId: string;
  readonly paymentId: string;
  readonly fromStatus: string;
  readonly toStatus: string;
  readonly reason?: string;
}

export interface TransactionSettledPayload {
  readonly transactionId: string;
  readonly paymentId: string;
  readonly amount: number;
  readonly currency: string;
  readonly settledAt: string;
}

type EventParams<TPayload> = {
  id?: string;
  aggregateId: string;
  payload: TPayload;
  occurredAt?: Timestamp;
  version?: number;
  metadata?: DomainEventMetadata;
};

function buildParams<TType extends string, TPayload>(
  type: TType,
  p: EventParams<TPayload>,
) {
  return {
    id: p.id ?? newEventId(),
    type,
    aggregateId: p.aggregateId,
    aggregateType: PAYMENT_AGGREGATE_TYPE.TRANSACTION,
    payload: p.payload,
    occurredAt: p.occurredAt ?? now(),
    version: p.version ?? 1,
    metadata: p.metadata,
  };
}

export class TransactionCreatedEvent extends BaseDomainEvent<
  typeof TRANSACTION_EVENT_TYPE.CREATED,
  TransactionCreatedPayload
> {
  constructor(p: EventParams<TransactionCreatedPayload>) {
    super(buildParams(TRANSACTION_EVENT_TYPE.CREATED, p));
  }
}

export class TransactionStatusChangedEvent extends BaseDomainEvent<
  typeof TRANSACTION_EVENT_TYPE.STATUS_CHANGED,
  TransactionStatusChangedPayload
> {
  constructor(p: EventParams<TransactionStatusChangedPayload>) {
    super(buildParams(TRANSACTION_EVENT_TYPE.STATUS_CHANGED, p));
  }
}

export class TransactionSucceededEvent extends BaseDomainEvent<
  typeof TRANSACTION_EVENT_TYPE.SUCCEEDED,
  TransactionStatusChangedPayload
> {
  constructor(p: EventParams<TransactionStatusChangedPayload>) {
    super(buildParams(TRANSACTION_EVENT_TYPE.SUCCEEDED, p));
  }
}

export class TransactionFailedEvent extends BaseDomainEvent<
  typeof TRANSACTION_EVENT_TYPE.FAILED,
  TransactionStatusChangedPayload
> {
  constructor(p: EventParams<TransactionStatusChangedPayload>) {
    super(buildParams(TRANSACTION_EVENT_TYPE.FAILED, p));
  }
}

export class TransactionSettledEvent extends BaseDomainEvent<
  typeof TRANSACTION_EVENT_TYPE.SETTLED,
  TransactionSettledPayload
> {
  constructor(p: EventParams<TransactionSettledPayload>) {
    super(buildParams(TRANSACTION_EVENT_TYPE.SETTLED, p));
  }
}

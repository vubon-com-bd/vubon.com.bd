/**
 * Transaction domain events
 * @module payment-service/domain/events
 */
import { BaseDomainEvent } from '@vubon/shared-kernel/domain/base/base.event';
import type { DomainEventMetadata } from '@vubon/shared-kernel/domain/base/base.event';
import type { Timestamp } from '@vubon/shared-types/common';
import { TRANSACTION_AGGREGATE_TYPE, newEventId, now } from './event.helpers.js';

export const TRANSACTION_EVENT_TYPE = {
  CREATED: 'transaction.created',
  SUCCEEDED: 'transaction.succeeded',
  FAILED: 'transaction.failed',
  CANCELLED: 'transaction.cancelled',
  REVERSED: 'transaction.reversed',
  SETTLED: 'transaction.settled',
} as const;

export interface TransactionCreatedPayload {
  readonly transactionId: string;
  readonly paymentId: string;
  readonly type: string;
  readonly amount: number;
  readonly currency: string;
  readonly reference?: string;
  readonly idempotencyKey?: string;
}

export interface TransactionSucceededPayload {
  readonly transactionId: string;
  readonly paymentId: string;
  readonly processedAt: string;
  readonly gatewayTransactionId?: string;
}

export interface TransactionFailedPayload {
  readonly transactionId: string;
  readonly paymentId: string;
  readonly reason: string;
  readonly code?: string;
}

export interface TransactionCancelledPayload {
  readonly transactionId: string;
  readonly paymentId: string;
  readonly reason?: string;
}

export interface TransactionReversedPayload {
  readonly transactionId: string;
  readonly paymentId: string;
  readonly reversedAt: string;
  readonly reversedBy?: string;
}

export interface TransactionSettledPayload {
  readonly transactionId: string;
  readonly paymentId: string;
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
    aggregateType: TRANSACTION_AGGREGATE_TYPE,
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

export class TransactionSucceededEvent extends BaseDomainEvent<
  typeof TRANSACTION_EVENT_TYPE.SUCCEEDED,
  TransactionSucceededPayload
> {
  constructor(p: EventParams<TransactionSucceededPayload>) {
    super(buildParams(TRANSACTION_EVENT_TYPE.SUCCEEDED, p));
  }
}

export class TransactionFailedEvent extends BaseDomainEvent<
  typeof TRANSACTION_EVENT_TYPE.FAILED,
  TransactionFailedPayload
> {
  constructor(p: EventParams<TransactionFailedPayload>) {
    super(buildParams(TRANSACTION_EVENT_TYPE.FAILED, p));
  }
}

export class TransactionCancelledEvent extends BaseDomainEvent<
  typeof TRANSACTION_EVENT_TYPE.CANCELLED,
  TransactionCancelledPayload
> {
  constructor(p: EventParams<TransactionCancelledPayload>) {
    super(buildParams(TRANSACTION_EVENT_TYPE.CANCELLED, p));
  }
}

export class TransactionReversedEvent extends BaseDomainEvent<
  typeof TRANSACTION_EVENT_TYPE.REVERSED,
  TransactionReversedPayload
> {
  constructor(p: EventParams<TransactionReversedPayload>) {
    super(buildParams(TRANSACTION_EVENT_TYPE.REVERSED, p));
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

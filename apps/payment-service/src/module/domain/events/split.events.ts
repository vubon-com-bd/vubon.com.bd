/**
 * Split Payment Domain Events
 * @module payment-service/domain/events
 */
import { BaseDomainEvent } from '@vubon/shared-kernel/domain/base/base.event';
import type { DomainEventMetadata } from '@vubon/shared-kernel/domain/base/base.event';
import type { Timestamp } from '@vubon/shared-types/common';
import { PAYMENT_AGGREGATE_TYPE, newEventId, now } from './event.helpers.js';

export const SPLIT_EVENT_TYPE = {
  CREATED: 'payment.split.created',
  EXECUTED: 'payment.split.executed',
  FAILED: 'payment.split.failed',
} as const;

export interface SplitReceiverPayload {
  readonly receiverId: string;
  readonly amount: number;
  readonly currency: string;
}

export interface SplitCreatedPayload {
  readonly splitId: string;
  readonly paymentId: string;
  readonly totalAmount: number;
  readonly currency: string;
  readonly receivers: readonly SplitReceiverPayload[];
  readonly createdAt: string;
}

export interface SplitExecutedPayload {
  readonly splitId: string;
  readonly paymentId: string;
  readonly executedAt: string;
}

export interface SplitFailedPayload {
  readonly splitId: string;
  readonly paymentId: string;
  readonly reason: string;
  readonly failedAt: string;
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
    aggregateType: PAYMENT_AGGREGATE_TYPE.SPLIT,
    payload: p.payload,
    occurredAt: p.occurredAt ?? now(),
    version: p.version ?? 1,
    metadata: p.metadata,
  };
}

export class SplitCreatedEvent extends BaseDomainEvent<
  typeof SPLIT_EVENT_TYPE.CREATED,
  SplitCreatedPayload
> {
  constructor(p: EventParams<SplitCreatedPayload>) {
    super(buildParams(SPLIT_EVENT_TYPE.CREATED, p));
  }
}

export class SplitExecutedEvent extends BaseDomainEvent<
  typeof SPLIT_EVENT_TYPE.EXECUTED,
  SplitExecutedPayload
> {
  constructor(p: EventParams<SplitExecutedPayload>) {
    super(buildParams(SPLIT_EVENT_TYPE.EXECUTED, p));
  }
}

export class SplitFailedEvent extends BaseDomainEvent<
  typeof SPLIT_EVENT_TYPE.FAILED,
  SplitFailedPayload
> {
  constructor(p: EventParams<SplitFailedPayload>) {
    super(buildParams(SPLIT_EVENT_TYPE.FAILED, p));
  }
}

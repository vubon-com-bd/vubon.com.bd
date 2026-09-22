import { BaseDomainEvent, type DomainEventMetadata } from '@vubon/shared-kernel/domain/base/base.event';
import { toTimestamp } from '@vubon/shared-types/common';

export class TransactionCreatedEvent extends BaseDomainEvent<'transaction.created', { transactionId: string; paymentId: string }> {
  constructor(transactionId: string, paymentId: string, version: number, metadata?: DomainEventMetadata) {
    super({ id: crypto.randomUUID(), type: 'transaction.created', aggregateId: transactionId, aggregateType: 'Transaction', payload: { transactionId, paymentId }, occurredAt: toTimestamp(Date.now()), version, metadata });
  }
}

export class TransactionCompletedEvent extends BaseDomainEvent<'transaction.completed', { transactionId: string; paymentId: string }> {
  constructor(transactionId: string, paymentId: string, version: number, metadata?: DomainEventMetadata) {
    super({ id: crypto.randomUUID(), type: 'transaction.completed', aggregateId: transactionId, aggregateType: 'Transaction', payload: { transactionId, paymentId }, occurredAt: toTimestamp(Date.now()), version, metadata });
  }
}

export class TransactionReversedEvent extends BaseDomainEvent<'transaction.reversed', { transactionId: string; paymentId: string }> {
  constructor(transactionId: string, paymentId: string, version: number, metadata?: DomainEventMetadata) {
    super({ id: crypto.randomUUID(), type: 'transaction.reversed', aggregateId: transactionId, aggregateType: 'Transaction', payload: { transactionId, paymentId }, occurredAt: toTimestamp(Date.now()), version, metadata });
  }
}

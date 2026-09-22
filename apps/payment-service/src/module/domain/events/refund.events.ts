import { BaseDomainEvent, type DomainEventMetadata } from '@vubon/shared-kernel/domain/base/base.event';
import { toTimestamp } from '@vubon/shared-types/common';

export class RefundRequestedEvent extends BaseDomainEvent<'refund.requested', { refundId: string; paymentId: string; amount: number }> {
  constructor(refundId: string, paymentId: string, amount: number, version: number, metadata?: DomainEventMetadata) {
    super({ id: crypto.randomUUID(), type: 'refund.requested', aggregateId: refundId, aggregateType: 'Refund', payload: { refundId, paymentId, amount }, occurredAt: toTimestamp(Date.now()), version, metadata });
  }
}

export class RefundProcessedEvent extends BaseDomainEvent<'refund.processed', { refundId: string; paymentId: string; amount: number }> {
  constructor(refundId: string, paymentId: string, amount: number, version: number, metadata?: DomainEventMetadata) {
    super({ id: crypto.randomUUID(), type: 'refund.processed', aggregateId: refundId, aggregateType: 'Refund', payload: { refundId, paymentId, amount }, occurredAt: toTimestamp(Date.now()), version, metadata });
  }
}

export class RefundFailedEvent extends BaseDomainEvent<'refund.failed', { refundId: string; reason: string }> {
  constructor(refundId: string, reason: string, version: number, metadata?: DomainEventMetadata) {
    super({ id: crypto.randomUUID(), type: 'refund.failed', aggregateId: refundId, aggregateType: 'Refund', payload: { refundId, reason }, occurredAt: toTimestamp(Date.now()), version, metadata });
  }
}

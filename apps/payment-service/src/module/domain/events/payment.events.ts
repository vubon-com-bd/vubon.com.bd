import { BaseDomainEvent, type DomainEventMetadata } from '@vubon/shared-kernel/domain/base/base.event';
import { toTimestamp } from '@vubon/shared-types/common';

export class PaymentInitiatedEvent extends BaseDomainEvent<'payment.initiated', { paymentId: string; orderId: string; amount: number; currency: string }> {
  constructor(paymentId: string, orderId: string, amount: number, currency: string, version: number, metadata?: DomainEventMetadata) {
    super({ id: crypto.randomUUID(), type: 'payment.initiated', aggregateId: paymentId, aggregateType: 'Payment', payload: { paymentId, orderId, amount, currency }, occurredAt: toTimestamp(Date.now()), version, metadata });
  }
}

export class PaymentCompletedEvent extends BaseDomainEvent<'payment.completed', { paymentId: string; orderId: string; amount: number; currency: string }> {
  constructor(paymentId: string, orderId: string, amount: number, currency: string, version: number, metadata?: DomainEventMetadata) {
    super({ id: crypto.randomUUID(), type: 'payment.completed', aggregateId: paymentId, aggregateType: 'Payment', payload: { paymentId, orderId, amount, currency }, occurredAt: toTimestamp(Date.now()), version, metadata });
  }
}

export class PaymentFailedEvent extends BaseDomainEvent<'payment.failed', { paymentId: string; reason: string }> {
  constructor(paymentId: string, reason: string, version: number, metadata?: DomainEventMetadata) {
    super({ id: crypto.randomUUID(), type: 'payment.failed', aggregateId: paymentId, aggregateType: 'Payment', payload: { paymentId, reason }, occurredAt: toTimestamp(Date.now()), version, metadata });
  }
}

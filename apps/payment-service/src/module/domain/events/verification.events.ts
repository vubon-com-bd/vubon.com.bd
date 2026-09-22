import { BaseDomainEvent, type DomainEventMetadata } from '@vubon/shared-kernel/domain/base/base.event';
import { toTimestamp } from '@vubon/shared-types/common';

export class PaymentVerifiedEvent extends BaseDomainEvent<'payment.verified', { paymentId: string }> {
  constructor(paymentId: string, version: number, metadata?: DomainEventMetadata) {
    super({ id: crypto.randomUUID(), type: 'payment.verified', aggregateId: paymentId, aggregateType: 'Verification', payload: { paymentId }, occurredAt: toTimestamp(Date.now()), version, metadata });
  }
}

export class PaymentVerificationFailedEvent extends BaseDomainEvent<'payment.verification_failed', { paymentId: string; reason: string }> {
  constructor(paymentId: string, reason: string, version: number, metadata?: DomainEventMetadata) {
    super({ id: crypto.randomUUID(), type: 'payment.verification_failed', aggregateId: paymentId, aggregateType: 'Verification', payload: { paymentId, reason }, occurredAt: toTimestamp(Date.now()), version, metadata });
  }
}

import { BaseDomainEvent, type DomainEventMetadata } from '@vubon/shared-kernel/domain/base/base.event';
import { toTimestamp } from '@vubon/shared-types/common';

export class RecurringPaymentScheduledEvent extends BaseDomainEvent<'recurring.scheduled', { recurringId: string; paymentId: string; nextRunAt: string }> {
  constructor(recurringId: string, paymentId: string, nextRunAt: string, version: number, metadata?: DomainEventMetadata) {
    super({ id: crypto.randomUUID(), type: 'recurring.scheduled', aggregateId: recurringId, aggregateType: 'RecurringPayment', payload: { recurringId, paymentId, nextRunAt }, occurredAt: toTimestamp(Date.now()), version, metadata });
  }
}

export class RecurringPaymentFailedEvent extends BaseDomainEvent<'recurring.failed', { recurringId: string; reason: string }> {
  constructor(recurringId: string, reason: string, version: number, metadata?: DomainEventMetadata) {
    super({ id: crypto.randomUUID(), type: 'recurring.failed', aggregateId: recurringId, aggregateType: 'RecurringPayment', payload: { recurringId, reason }, occurredAt: toTimestamp(Date.now()), version, metadata });
  }
}

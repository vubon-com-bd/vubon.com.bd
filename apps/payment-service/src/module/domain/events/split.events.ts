import { BaseDomainEvent, type DomainEventMetadata } from '@vubon/shared-kernel/domain/base/base.event';
import { toTimestamp } from '@vubon/shared-types/common';

export class SplitPaymentCompletedEvent extends BaseDomainEvent<'split.completed', { splitId: string; paymentId: string }> {
  constructor(splitId: string, paymentId: string, version: number, metadata?: DomainEventMetadata) {
    super({ id: crypto.randomUUID(), type: 'split.completed', aggregateId: splitId, aggregateType: 'SplitPayment', payload: { splitId, paymentId }, occurredAt: toTimestamp(Date.now()), version, metadata });
  }
}

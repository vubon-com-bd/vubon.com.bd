import { BaseDomainEvent, type DomainEventMetadata } from '@vubon/shared-kernel/domain/base/base.event';
import { toTimestamp } from '@vubon/shared-types/common';

export class InvoiceGeneratedEvent extends BaseDomainEvent<'invoice.generated', { invoiceId: string; number: string; amount: number }> {
  constructor(invoiceId: string, number: string, amount: number, version: number, metadata?: DomainEventMetadata) {
    super({ id: crypto.randomUUID(), type: 'invoice.generated', aggregateId: invoiceId, aggregateType: 'Invoice', payload: { invoiceId, number, amount }, occurredAt: toTimestamp(Date.now()), version, metadata });
  }
}

export class InvoicePaidEvent extends BaseDomainEvent<'invoice.paid', { invoiceId: string; number: string }> {
  constructor(invoiceId: string, number: string, version: number, metadata?: DomainEventMetadata) {
    super({ id: crypto.randomUUID(), type: 'invoice.paid', aggregateId: invoiceId, aggregateType: 'Invoice', payload: { invoiceId, number }, occurredAt: toTimestamp(Date.now()), version, metadata });
  }
}

export class InvoiceOverdueEvent extends BaseDomainEvent<'invoice.overdue', { invoiceId: string; number: string }> {
  constructor(invoiceId: string, number: string, version: number, metadata?: DomainEventMetadata) {
    super({ id: crypto.randomUUID(), type: 'invoice.overdue', aggregateId: invoiceId, aggregateType: 'Invoice', payload: { invoiceId, number }, occurredAt: toTimestamp(Date.now()), version, metadata });
  }
}

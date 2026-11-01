/**
 * Invoice Domain Events
 * @module payment-service/domain/events
 */
import { BaseDomainEvent } from '@vubon/shared-kernel/domain/base/base.event';
import type { DomainEventMetadata } from '@vubon/shared-kernel/domain/base/base.event';
import type { Timestamp } from '@vubon/shared-types/common';
import { PAYMENT_AGGREGATE_TYPE, newEventId, now } from './event.helpers.js';

export const INVOICE_EVENT_TYPE = {
  CREATED: 'payment.invoice.created',
  ISSUED: 'payment.invoice.issued',
  PAID: 'payment.invoice.paid',
  OVERDUE: 'payment.invoice.overdue',
  VOIDED: 'payment.invoice.voided',
  REFUNDED: 'payment.invoice.refunded',
} as const;

export interface InvoiceCreatedPayload {
  readonly invoiceId: string;
  readonly invoiceNumber: string;
  readonly userId: string;
  readonly total: number;
  readonly currency: string;
  readonly createdAt: string;
}

export interface InvoicePaidPayload {
  readonly invoiceId: string;
  readonly paidAmount: number;
  readonly currency: string;
  readonly paidAt: string;
}

export interface InvoiceStatusChangedPayload {
  readonly invoiceId: string;
  readonly fromStatus: string;
  readonly toStatus: string;
  readonly reason?: string;
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
    aggregateType: PAYMENT_AGGREGATE_TYPE.INVOICE,
    payload: p.payload,
    occurredAt: p.occurredAt ?? now(),
    version: p.version ?? 1,
    metadata: p.metadata,
  };
}

export class InvoiceCreatedEvent extends BaseDomainEvent<
  typeof INVOICE_EVENT_TYPE.CREATED,
  InvoiceCreatedPayload
> {
  constructor(p: EventParams<InvoiceCreatedPayload>) {
    super(buildParams(INVOICE_EVENT_TYPE.CREATED, p));
  }
}

export class InvoiceIssuedEvent extends BaseDomainEvent<
  typeof INVOICE_EVENT_TYPE.ISSUED,
  InvoiceStatusChangedPayload
> {
  constructor(p: EventParams<InvoiceStatusChangedPayload>) {
    super(buildParams(INVOICE_EVENT_TYPE.ISSUED, p));
  }
}

export class InvoicePaidEvent extends BaseDomainEvent<
  typeof INVOICE_EVENT_TYPE.PAID,
  InvoicePaidPayload
> {
  constructor(p: EventParams<InvoicePaidPayload>) {
    super(buildParams(INVOICE_EVENT_TYPE.PAID, p));
  }
}

export class InvoiceOverdueEvent extends BaseDomainEvent<
  typeof INVOICE_EVENT_TYPE.OVERDUE,
  InvoiceStatusChangedPayload
> {
  constructor(p: EventParams<InvoiceStatusChangedPayload>) {
    super(buildParams(INVOICE_EVENT_TYPE.OVERDUE, p));
  }
}

export class InvoiceVoidedEvent extends BaseDomainEvent<
  typeof INVOICE_EVENT_TYPE.VOIDED,
  InvoiceStatusChangedPayload
> {
  constructor(p: EventParams<InvoiceStatusChangedPayload>) {
    super(buildParams(INVOICE_EVENT_TYPE.VOIDED, p));
  }
}

export class InvoiceRefundedEvent extends BaseDomainEvent<
  typeof INVOICE_EVENT_TYPE.REFUNDED,
  InvoiceStatusChangedPayload
> {
  constructor(p: EventParams<InvoiceStatusChangedPayload>) {
    super(buildParams(INVOICE_EVENT_TYPE.REFUNDED, p));
  }
}

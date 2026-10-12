/**
 * Vendor Invoice domain events
 * @module vendor-service/domain/events
 */
import { BaseDomainEvent } from '@vubon/shared-kernel/domain/base/base.event';
import type { DomainEventMetadata } from '@vubon/shared-kernel/domain/base/base.event';
import type { Timestamp } from '@vubon/shared-types/common';
import { newEventId, now } from './event.helpers.js';

const AGGREGATE_TYPE = 'VendorInvoice';

export const VENDOR_INVOICE_EVENT_TYPE = {
  CREATED: 'vendor.invoice.created',
  SENT: 'vendor.invoice.sent',
  VIEWED: 'vendor.invoice.viewed',
  PAID: 'vendor.invoice.paid',
  OVERDUE: 'vendor.invoice.overdue',
  CANCELLED: 'vendor.invoice.cancelled',
  REFUNDED: 'vendor.invoice.refunded',
} as const;

export interface VendorInvoiceCreatedPayload {
  readonly invoiceId: string;
  readonly vendorId: string;
  readonly invoiceNumber: string;
  readonly type: string;
  readonly totalAmount: number;
  readonly currency: string;
  readonly issueDate: string;
  readonly dueDate: string;
  readonly createdAt: string;
}
export interface VendorInvoiceSentPayload {
  readonly invoiceId: string;
  readonly vendorId: string;
  readonly sentAt: string;
}
export interface VendorInvoiceViewedPayload {
  readonly invoiceId: string;
  readonly vendorId: string;
  readonly viewedAt: string;
}
export interface VendorInvoicePaidPayload {
  readonly invoiceId: string;
  readonly vendorId: string;
  readonly amount: number;
  readonly currency: string;
  readonly paidAt: string;
}
export interface VendorInvoiceOverduePayload {
  readonly invoiceId: string;
  readonly vendorId: string;
  readonly daysOverdue: number;
  readonly markedAt: string;
}
export interface VendorInvoiceCancelledPayload {
  readonly invoiceId: string;
  readonly vendorId: string;
  readonly reason?: string;
  readonly cancelledAt: string;
}
export interface VendorInvoiceRefundedPayload {
  readonly invoiceId: string;
  readonly vendorId: string;
  readonly reason?: string;
  readonly refundedAt: string;
}

type EventParams<TPayload> = {
  id?: string;
  aggregateId: string;
  payload: TPayload;
  occurredAt?: Timestamp;
  version?: number;
  metadata?: DomainEventMetadata;
};
function buildParams<TType extends string, TPayload>(type: TType, p: EventParams<TPayload>) {
  return {
    id: p.id ?? newEventId(),
    type,
    aggregateId: p.aggregateId,
    aggregateType: AGGREGATE_TYPE,
    payload: p.payload,
    occurredAt: p.occurredAt ?? now(),
    version: p.version ?? 1,
    metadata: p.metadata,
  };
}

export class VendorInvoiceCreatedEvent extends BaseDomainEvent<typeof VENDOR_INVOICE_EVENT_TYPE.CREATED, VendorInvoiceCreatedPayload> {
  constructor(p: EventParams<VendorInvoiceCreatedPayload>) { super(buildParams(VENDOR_INVOICE_EVENT_TYPE.CREATED, p)); }
}
export class VendorInvoiceSentEvent extends BaseDomainEvent<typeof VENDOR_INVOICE_EVENT_TYPE.SENT, VendorInvoiceSentPayload> {
  constructor(p: EventParams<VendorInvoiceSentPayload>) { super(buildParams(VENDOR_INVOICE_EVENT_TYPE.SENT, p)); }
}
export class VendorInvoiceViewedEvent extends BaseDomainEvent<typeof VENDOR_INVOICE_EVENT_TYPE.VIEWED, VendorInvoiceViewedPayload> {
  constructor(p: EventParams<VendorInvoiceViewedPayload>) { super(buildParams(VENDOR_INVOICE_EVENT_TYPE.VIEWED, p)); }
}
export class VendorInvoicePaidEvent extends BaseDomainEvent<typeof VENDOR_INVOICE_EVENT_TYPE.PAID, VendorInvoicePaidPayload> {
  constructor(p: EventParams<VendorInvoicePaidPayload>) { super(buildParams(VENDOR_INVOICE_EVENT_TYPE.PAID, p)); }
}
export class VendorInvoiceOverdueEvent extends BaseDomainEvent<typeof VENDOR_INVOICE_EVENT_TYPE.OVERDUE, VendorInvoiceOverduePayload> {
  constructor(p: EventParams<VendorInvoiceOverduePayload>) { super(buildParams(VENDOR_INVOICE_EVENT_TYPE.OVERDUE, p)); }
}
export class VendorInvoiceCancelledEvent extends BaseDomainEvent<typeof VENDOR_INVOICE_EVENT_TYPE.CANCELLED, VendorInvoiceCancelledPayload> {
  constructor(p: EventParams<VendorInvoiceCancelledPayload>) { super(buildParams(VENDOR_INVOICE_EVENT_TYPE.CANCELLED, p)); }
}
export class VendorInvoiceRefundedEvent extends BaseDomainEvent<typeof VENDOR_INVOICE_EVENT_TYPE.REFUNDED, VendorInvoiceRefundedPayload> {
  constructor(p: EventParams<VendorInvoiceRefundedPayload>) { super(buildParams(VENDOR_INVOICE_EVENT_TYPE.REFUNDED, p)); }
}

import {
  VENDOR_INVOICE_EVENT_TYPE,
  VendorInvoiceCreatedEvent,
  VendorInvoiceSentEvent,
  VendorInvoiceViewedEvent,
  VendorInvoicePaidEvent,
  VendorInvoiceOverdueEvent,
  VendorInvoiceCancelledEvent,
  VendorInvoiceRefundedEvent,
} from '../../../../src/module/domain/events/vendor-invoice.events.js';

const UUID = '7c9e6679-7425-40de-944b-e07fc1f90ae7';
const NOW = '2026-01-01T00:00:00.000Z';
const FUTURE = '2026-02-01T00:00:00.000Z';

describe('Vendor invoice events', () => {
  it('constants defined', () => {
    expect(VENDOR_INVOICE_EVENT_TYPE.CREATED).toBe('vendor.invoice.created');
    expect(VENDOR_INVOICE_EVENT_TYPE.PAID).toBe('vendor.invoice.paid');
  });

  it('VendorInvoiceCreatedEvent', () => {
    const e = new VendorInvoiceCreatedEvent({
      aggregateId: UUID,
      payload: {
        invoiceId: UUID, vendorId: UUID, invoiceNumber: 'INV-202601-0000000001',
        type: 'commission', totalAmount: 1000, currency: 'BDT',
        issueDate: NOW, dueDate: FUTURE, createdAt: NOW,
      },
    });
    expect(e.type).toBe('vendor.invoice.created');
    expect(e.aggregateType).toBe('VendorInvoice');
  });

  it('VendorInvoiceSentEvent', () => {
    const e = new VendorInvoiceSentEvent({
      aggregateId: UUID,
      payload: { invoiceId: UUID, vendorId: UUID, sentAt: NOW },
    });
    expect(e.type).toBe('vendor.invoice.sent');
  });

  it('VendorInvoiceViewedEvent', () => {
    const e = new VendorInvoiceViewedEvent({
      aggregateId: UUID,
      payload: { invoiceId: UUID, vendorId: UUID, viewedAt: NOW },
    });
    expect(e.type).toBe('vendor.invoice.viewed');
  });

  it('VendorInvoicePaidEvent', () => {
    const e = new VendorInvoicePaidEvent({
      aggregateId: UUID,
      payload: {
        invoiceId: UUID, vendorId: UUID,
        amount: 1000, currency: 'BDT', paidAt: NOW,
      },
    });
    expect(e.type).toBe('vendor.invoice.paid');
  });

  it('VendorInvoiceOverdueEvent', () => {
    const e = new VendorInvoiceOverdueEvent({
      aggregateId: UUID,
      payload: { invoiceId: UUID, vendorId: UUID, daysOverdue: 5, markedAt: NOW },
    });
    expect(e.type).toBe('vendor.invoice.overdue');
  });

  it('VendorInvoiceCancelledEvent', () => {
    const e = new VendorInvoiceCancelledEvent({
      aggregateId: UUID,
      payload: { invoiceId: UUID, vendorId: UUID, reason: 'duplicate', cancelledAt: NOW },
    });
    expect(e.type).toBe('vendor.invoice.cancelled');
  });

  it('VendorInvoiceRefundedEvent', () => {
    const e = new VendorInvoiceRefundedEvent({
      aggregateId: UUID,
      payload: { invoiceId: UUID, vendorId: UUID, reason: 'customer request', refundedAt: NOW },
    });
    expect(e.type).toBe('vendor.invoice.refunded');
  });
});

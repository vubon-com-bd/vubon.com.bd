import {
  VENDOR_PAYOUT_EVENT_TYPE,
  VendorPayoutRequestedEvent,
  VendorPayoutApprovedEvent,
  VendorPayoutProcessingEvent,
  VendorPayoutPaidEvent,
  VendorPayoutFailedEvent,
  VendorPayoutRejectedEvent,
  VendorPayoutCancelledEvent,
  VendorPayoutOnHoldEvent,
} from '../../../../src/module/domain/events/vendor-payout.events.js';

const UUID = '7c9e6679-7425-40de-944b-e07fc1f90ae7';
const NOW = '2026-01-01T00:00:00.000Z';

describe('Vendor payout events', () => {
  it('constants defined', () => {
    expect(VENDOR_PAYOUT_EVENT_TYPE.REQUESTED).toBe('vendor.payout.requested');
    expect(VENDOR_PAYOUT_EVENT_TYPE.PAID).toBe('vendor.payout.paid');
  });

  it('VendorPayoutRequestedEvent', () => {
    const e = new VendorPayoutRequestedEvent({
      aggregateId: UUID,
      payload: {
        payoutId: UUID, vendorId: UUID, payoutNumber: 'PO-20260101-ABC',
        amount: 5000, currency: 'BDT', method: 'bank_transfer', requestedAt: NOW,
      },
    });
    expect(e.type).toBe('vendor.payout.requested');
    expect(e.aggregateType).toBe('VendorPayout');
  });

  it('VendorPayoutApprovedEvent', () => {
    const e = new VendorPayoutApprovedEvent({
      aggregateId: UUID,
      payload: { payoutId: UUID, vendorId: UUID, approvedBy: UUID, approvedAt: NOW },
    });
    expect(e.type).toBe('vendor.payout.approved');
  });

  it('VendorPayoutProcessingEvent', () => {
    const e = new VendorPayoutProcessingEvent({
      aggregateId: UUID,
      payload: { payoutId: UUID, vendorId: UUID, startedAt: NOW },
    });
    expect(e.type).toBe('vendor.payout.processing');
  });

  it('VendorPayoutPaidEvent', () => {
    const e = new VendorPayoutPaidEvent({
      aggregateId: UUID,
      payload: {
        payoutId: UUID, vendorId: UUID, transactionId: 'txn-1',
        reference: 'ref', netAmount: 5000, currency: 'BDT', paidAt: NOW,
      },
    });
    expect(e.type).toBe('vendor.payout.paid');
  });

  it('VendorPayoutFailedEvent', () => {
    const e = new VendorPayoutFailedEvent({
      aggregateId: UUID,
      payload: { payoutId: UUID, vendorId: UUID, reason: 'insufficient', failedAt: NOW },
    });
    expect(e.type).toBe('vendor.payout.failed');
  });

  it('VendorPayoutRejectedEvent', () => {
    const e = new VendorPayoutRejectedEvent({
      aggregateId: UUID,
      payload: { payoutId: UUID, vendorId: UUID, reason: 'suspect', rejectedAt: NOW },
    });
    expect(e.type).toBe('vendor.payout.rejected');
  });

  it('VendorPayoutCancelledEvent', () => {
    const e = new VendorPayoutCancelledEvent({
      aggregateId: UUID,
      payload: { payoutId: UUID, vendorId: UUID, cancelledAt: NOW },
    });
    expect(e.type).toBe('vendor.payout.cancelled');
  });

  it('VendorPayoutOnHoldEvent', () => {
    const e = new VendorPayoutOnHoldEvent({
      aggregateId: UUID,
      payload: { payoutId: UUID, vendorId: UUID, reason: 'review', heldAt: NOW },
    });
    expect(e.type).toBe('vendor.payout.on_hold');
  });
});

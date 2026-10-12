import {
  VENDOR_SETTLEMENT_EVENT_TYPE,
  VendorSettlementCreatedEvent,
  VendorSettlementProcessingEvent,
  VendorSettlementCompletedEvent,
  VendorSettlementFailedEvent,
  VendorSettlementOnHoldEvent,
  VendorSettlementCancelledEvent,
} from '../../../../src/module/domain/events/vendor-settlement.events.js';

const UUID = '7c9e6679-7425-40de-944b-e07fc1f90ae7';
const NOW = '2026-01-01T00:00:00.000Z';

describe('Vendor settlement events', () => {
  it('constants defined', () => {
    expect(VENDOR_SETTLEMENT_EVENT_TYPE.CREATED).toBe('vendor.settlement.created');
    expect(VENDOR_SETTLEMENT_EVENT_TYPE.COMPLETED).toBe('vendor.settlement.completed');
  });

  it('VendorSettlementCreatedEvent', () => {
    const e = new VendorSettlementCreatedEvent({
      aggregateId: UUID,
      payload: {
        settlementId: UUID, vendorId: UUID, settlementNumber: 'ST-20260101-ABC',
        grossAmount: 10000, netAmount: 9000, currency: 'BDT',
        periodStart: NOW, periodEnd: NOW, createdAt: NOW,
      },
    });
    expect(e.type).toBe('vendor.settlement.created');
    expect(e.aggregateType).toBe('VendorSettlement');
  });

  it('VendorSettlementProcessingEvent', () => {
    const e = new VendorSettlementProcessingEvent({
      aggregateId: UUID,
      payload: { settlementId: UUID, vendorId: UUID, startedAt: NOW },
    });
    expect(e.type).toBe('vendor.settlement.processing');
  });

  it('VendorSettlementCompletedEvent', () => {
    const e = new VendorSettlementCompletedEvent({
      aggregateId: UUID,
      payload: { settlementId: UUID, vendorId: UUID, payoutId: UUID, completedAt: NOW },
    });
    expect(e.type).toBe('vendor.settlement.completed');
  });

  it('VendorSettlementFailedEvent', () => {
    const e = new VendorSettlementFailedEvent({
      aggregateId: UUID,
      payload: { settlementId: UUID, vendorId: UUID, reason: 'bank error', failedAt: NOW },
    });
    expect(e.type).toBe('vendor.settlement.failed');
  });

  it('VendorSettlementOnHoldEvent', () => {
    const e = new VendorSettlementOnHoldEvent({
      aggregateId: UUID,
      payload: { settlementId: UUID, vendorId: UUID, reason: 'manual', heldAt: NOW },
    });
    expect(e.type).toBe('vendor.settlement.on_hold');
  });

  it('VendorSettlementCancelledEvent', () => {
    const e = new VendorSettlementCancelledEvent({
      aggregateId: UUID,
      payload: { settlementId: UUID, vendorId: UUID, cancelledAt: NOW },
    });
    expect(e.type).toBe('vendor.settlement.cancelled');
  });
});

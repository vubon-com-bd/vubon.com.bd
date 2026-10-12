import {
  VENDOR_COMMISSION_EVENT_TYPE,
  VendorCommissionConfigCreatedEvent,
  VendorCommissionPercentUpdatedEvent,
  VendorCommissionFixedUpdatedEvent,
  VendorCommissionActivatedEvent,
  VendorCommissionDeactivatedEvent,
  VendorCommissionTerminatedEvent,
} from '../../../../src/module/domain/events/vendor-commission.events.js';

const UUID = '7c9e6679-7425-40de-944b-e07fc1f90ae7';
const NOW = '2026-01-01T00:00:00.000Z';
const FUTURE = '2026-02-01T00:00:00.000Z';

describe('Vendor commission events', () => {
  it('constants defined', () => {
    expect(VENDOR_COMMISSION_EVENT_TYPE.CONFIG_CREATED).toBe('vendor.commission.config_created');
    expect(VENDOR_COMMISSION_EVENT_TYPE.ACTIVATED).toBe('vendor.commission.activated');
  });

  it('VendorCommissionConfigCreatedEvent', () => {
    const e = new VendorCommissionConfigCreatedEvent({
      aggregateId: UUID,
      payload: {
        commissionId: UUID, vendorId: UUID, type: 'percentage',
        percent: 10, effectiveFrom: NOW, configuredAt: NOW,
      },
    });
    expect(e.type).toBe('vendor.commission.config_created');
    expect(e.aggregateType).toBe('VendorCommission');
  });

  it('VendorCommissionPercentUpdatedEvent', () => {
    const e = new VendorCommissionPercentUpdatedEvent({
      aggregateId: UUID,
      payload: {
        commissionId: UUID, vendorId: UUID,
        oldPercent: 10, newPercent: 15, updatedAt: NOW,
      },
    });
    expect(e.type).toBe('vendor.commission.percent_updated');
  });

  it('VendorCommissionFixedUpdatedEvent', () => {
    const e = new VendorCommissionFixedUpdatedEvent({
      aggregateId: UUID,
      payload: {
        commissionId: UUID, vendorId: UUID,
        amount: 50, currency: 'BDT', updatedAt: NOW,
      },
    });
    expect(e.type).toBe('vendor.commission.fixed_updated');
  });

  it('VendorCommissionActivatedEvent', () => {
    const e = new VendorCommissionActivatedEvent({
      aggregateId: UUID,
      payload: { commissionId: UUID, vendorId: UUID, changedAt: NOW },
    });
    expect(e.type).toBe('vendor.commission.activated');
  });

  it('VendorCommissionDeactivatedEvent', () => {
    const e = new VendorCommissionDeactivatedEvent({
      aggregateId: UUID,
      payload: { commissionId: UUID, vendorId: UUID, changedAt: NOW },
    });
    expect(e.type).toBe('vendor.commission.deactivated');
  });

  it('VendorCommissionTerminatedEvent', () => {
    const e = new VendorCommissionTerminatedEvent({
      aggregateId: UUID,
      payload: {
        commissionId: UUID, vendorId: UUID,
        effectiveTo: FUTURE, terminatedAt: NOW,
      },
    });
    expect(e.type).toBe('vendor.commission.terminated');
  });
});

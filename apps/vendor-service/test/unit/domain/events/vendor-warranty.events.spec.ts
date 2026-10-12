import {
  VENDOR_WARRANTY_EVENT_TYPE,
  VendorWarrantyConfiguredEvent,
  VendorWarrantyTypeChangedEvent,
  VendorWarrantyPeriodChangedEvent,
  VendorWarrantyExclusionAddedEvent,
  VendorWarrantyExclusionRemovedEvent,
} from '../../../../src/module/domain/events/vendor-warranty.events.js';

const UUID = '7c9e6679-7425-40de-944b-e07fc1f90ae7';
const NOW = '2026-01-01T00:00:00.000Z';

describe('Vendor warranty events', () => {
  it('constants defined', () => {
    expect(VENDOR_WARRANTY_EVENT_TYPE.CONFIGURED).toBe('vendor.warranty.configured');
    expect(VENDOR_WARRANTY_EVENT_TYPE.TYPE_CHANGED).toBe('vendor.warranty.type_changed');
  });

  it('VendorWarrantyConfiguredEvent', () => {
    const e = new VendorWarrantyConfiguredEvent({
      aggregateId: UUID,
      payload: {
        warrantyId: UUID, vendorId: UUID,
        type: 'seller', periodDays: 30, coversShipping: false, configuredAt: NOW,
      },
    });
    expect(e.type).toBe('vendor.warranty.configured');
    expect(e.aggregateType).toBe('VendorWarranty');
  });

  it('VendorWarrantyTypeChangedEvent', () => {
    const e = new VendorWarrantyTypeChangedEvent({
      aggregateId: UUID,
      payload: {
        warrantyId: UUID, vendorId: UUID,
        fromType: 'seller', toType: 'manufacturer', changedAt: NOW,
      },
    });
    expect(e.type).toBe('vendor.warranty.type_changed');
    expect(e.payload.toType).toBe('manufacturer');
  });

  it('VendorWarrantyPeriodChangedEvent', () => {
    const e = new VendorWarrantyPeriodChangedEvent({
      aggregateId: UUID,
      payload: {
        warrantyId: UUID, vendorId: UUID,
        fromDays: 30, toDays: 90, changedAt: NOW,
      },
    });
    expect(e.type).toBe('vendor.warranty.period_changed');
  });

  it('VendorWarrantyExclusionAddedEvent', () => {
    const e = new VendorWarrantyExclusionAddedEvent({
      aggregateId: UUID,
      payload: {
        warrantyId: UUID, vendorId: UUID,
        term: 'water damage', changedAt: NOW,
      },
    });
    expect(e.type).toBe('vendor.warranty.exclusion_added');
  });

  it('VendorWarrantyExclusionRemovedEvent', () => {
    const e = new VendorWarrantyExclusionRemovedEvent({
      aggregateId: UUID,
      payload: {
        warrantyId: UUID, vendorId: UUID,
        term: 'water damage', changedAt: NOW,
      },
    });
    expect(e.type).toBe('vendor.warranty.exclusion_removed');
  });
});

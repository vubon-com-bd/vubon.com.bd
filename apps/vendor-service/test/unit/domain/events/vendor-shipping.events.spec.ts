import {
  VENDOR_SHIPPING_EVENT_TYPE,
  VendorShippingConfiguredEvent,
  VendorShippingRateAddedEvent,
  VendorShippingRateUpdatedEvent,
  VendorShippingRateRemovedEvent,
  VendorShippingDefaultMethodChangedEvent,
  VendorShippingFreeThresholdChangedEvent,
} from '../../../../src/module/domain/events/vendor-shipping.events.js';

const UUID = '7c9e6679-7425-40de-944b-e07fc1f90ae7';
const NOW = '2026-01-01T00:00:00.000Z';

describe('Vendor shipping events', () => {
  it('constants defined', () => {
    expect(VENDOR_SHIPPING_EVENT_TYPE.CONFIGURED).toBe('vendor.shipping.configured');
    expect(VENDOR_SHIPPING_EVENT_TYPE.RATE_ADDED).toBe('vendor.shipping.rate_added');
  });

  it('VendorShippingConfiguredEvent', () => {
    const e = new VendorShippingConfiguredEvent({
      aggregateId: UUID,
      payload: {
        shippingId: UUID, vendorId: UUID,
        defaultMethod: 'standard', configuredAt: NOW,
      },
    });
    expect(e.type).toBe('vendor.shipping.configured');
    expect(e.aggregateType).toBe('VendorShipping');
  });

  it('VendorShippingRateAddedEvent', () => {
    const e = new VendorShippingRateAddedEvent({
      aggregateId: UUID,
      payload: {
        shippingId: UUID, vendorId: UUID,
        method: 'express', zone: 'inside_city',
        cost: 150, currency: 'BDT', addedAt: NOW,
      },
    });
    expect(e.type).toBe('vendor.shipping.rate_added');
  });

  it('VendorShippingRateUpdatedEvent', () => {
    const e = new VendorShippingRateUpdatedEvent({
      aggregateId: UUID,
      payload: {
        shippingId: UUID, vendorId: UUID,
        method: 'standard', zone: 'inside_city',
        oldCost: 100, newCost: 120, currency: 'BDT', updatedAt: NOW,
      },
    });
    expect(e.type).toBe('vendor.shipping.rate_updated');
  });

  it('VendorShippingRateRemovedEvent', () => {
    const e = new VendorShippingRateRemovedEvent({
      aggregateId: UUID,
      payload: {
        shippingId: UUID, vendorId: UUID,
        method: 'express', zone: 'inside_city', removedAt: NOW,
      },
    });
    expect(e.type).toBe('vendor.shipping.rate_removed');
  });

  it('VendorShippingDefaultMethodChangedEvent', () => {
    const e = new VendorShippingDefaultMethodChangedEvent({
      aggregateId: UUID,
      payload: {
        shippingId: UUID, vendorId: UUID,
        fromMethod: 'standard', toMethod: 'express', changedAt: NOW,
      },
    });
    expect(e.type).toBe('vendor.shipping.default_method_changed');
  });

  it('VendorShippingFreeThresholdChangedEvent', () => {
    const e = new VendorShippingFreeThresholdChangedEvent({
      aggregateId: UUID,
      payload: {
        shippingId: UUID, vendorId: UUID,
        oldThreshold: 1000, newThreshold: 2000,
        currency: 'BDT', changedAt: NOW,
      },
    });
    expect(e.type).toBe('vendor.shipping.free_threshold_changed');
  });
});

import {
  VENDOR_RETURN_POLICY_EVENT_TYPE,
  VendorReturnPolicyConfiguredEvent,
  VendorReturnPolicyTypeChangedEvent,
  VendorReturnPolicyWindowChangedEvent,
  VendorReturnPolicyExclusionAddedEvent,
  VendorReturnPolicyExclusionRemovedEvent,
} from '../../../../src/module/domain/events/vendor-return-policy.events.js';

const UUID = '7c9e6679-7425-40de-944b-e07fc1f90ae7';
const NOW = '2026-01-01T00:00:00.000Z';

describe('Vendor return policy events', () => {
  it('constants defined', () => {
    expect(VENDOR_RETURN_POLICY_EVENT_TYPE.CONFIGURED).toBe('vendor.return_policy.configured');
    expect(VENDOR_RETURN_POLICY_EVENT_TYPE.TYPE_CHANGED).toBe('vendor.return_policy.type_changed');
  });

  it('VendorReturnPolicyConfiguredEvent', () => {
    const e = new VendorReturnPolicyConfiguredEvent({
      aggregateId: UUID,
      payload: {
        policyId: UUID, vendorId: UUID,
        type: 'full_return', windowDays: 7, freeReturn: true, configuredAt: NOW,
      },
    });
    expect(e.type).toBe('vendor.return_policy.configured');
    expect(e.aggregateType).toBe('VendorReturnPolicy');
  });

  it('VendorReturnPolicyTypeChangedEvent', () => {
    const e = new VendorReturnPolicyTypeChangedEvent({
      aggregateId: UUID,
      payload: {
        policyId: UUID, vendorId: UUID,
        fromType: 'full_return', toType: 'exchange_only', changedAt: NOW,
      },
    });
    expect(e.type).toBe('vendor.return_policy.type_changed');
  });

  it('VendorReturnPolicyWindowChangedEvent', () => {
    const e = new VendorReturnPolicyWindowChangedEvent({
      aggregateId: UUID,
      payload: {
        policyId: UUID, vendorId: UUID,
        fromDays: 7, toDays: 14, changedAt: NOW,
      },
    });
    expect(e.type).toBe('vendor.return_policy.window_changed');
  });

  it('VendorReturnPolicyExclusionAddedEvent', () => {
    const e = new VendorReturnPolicyExclusionAddedEvent({
      aggregateId: UUID,
      payload: {
        policyId: UUID, vendorId: UUID,
        term: 'custom-made', changedAt: NOW,
      },
    });
    expect(e.type).toBe('vendor.return_policy.exclusion_added');
  });

  it('VendorReturnPolicyExclusionRemovedEvent', () => {
    const e = new VendorReturnPolicyExclusionRemovedEvent({
      aggregateId: UUID,
      payload: {
        policyId: UUID, vendorId: UUID,
        term: 'custom-made', changedAt: NOW,
      },
    });
    expect(e.type).toBe('vendor.return_policy.exclusion_removed');
  });
});

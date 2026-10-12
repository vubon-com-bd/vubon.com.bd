import {
  VendorTier,
  REQUIRED_VENDOR_TIER_KEY,
} from '../../../../src/module/interfaces/decorators/vendor-tier.decorator.js';

describe('VendorTier decorator', () => {
  it('exports REQUIRED_VENDOR_TIER_KEY', () => {
    expect(REQUIRED_VENDOR_TIER_KEY).toBe('required_vendor_tier');
  });

  it('is a function', () => {
    expect(typeof VendorTier).toBe('function');
  });

  it('returns decorator', () => {
    expect(typeof VendorTier('bronze')).toBe('function');
  });
});

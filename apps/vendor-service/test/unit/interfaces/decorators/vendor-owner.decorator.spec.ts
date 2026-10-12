/**
 * VendorOwner decorator — unit tests
 */
import { VendorOwner, VENDOR_OWNER_PARAM_KEY } from '../../../../src/module/interfaces/decorators/vendor-owner.decorator.js';

describe('VendorOwner decorator', () => {
  it('exports VENDOR_OWNER_PARAM_KEY', () => {
    expect(VENDOR_OWNER_PARAM_KEY).toBe('vendor_owner_param');
  });

  it('is a function', () => {
    expect(typeof VendorOwner).toBe('function');
  });

  it('returns decorator when called', () => {
    const dec = VendorOwner();
    expect(typeof dec).toBe('function');
  });

  it('accepts custom param name', () => {
    const dec = VendorOwner('customId');
    expect(typeof dec).toBe('function');
  });
});

import {
  VendorStatus,
  REQUIRED_VENDOR_STATUS_KEY,
} from '../../../../src/module/interfaces/decorators/vendor-status.decorator.js';

describe('VendorStatus decorator', () => {
  it('exports REQUIRED_VENDOR_STATUS_KEY', () => {
    expect(REQUIRED_VENDOR_STATUS_KEY).toBe('required_vendor_status');
  });

  it('is a function', () => {
    expect(typeof VendorStatus).toBe('function');
  });

  it('returns decorator when called with statuses', () => {
    const dec = VendorStatus('active');
    expect(typeof dec).toBe('function');
  });

  it('accepts multiple statuses', () => {
    const dec = VendorStatus('active', 'approved');
    expect(typeof dec).toBe('function');
  });
});

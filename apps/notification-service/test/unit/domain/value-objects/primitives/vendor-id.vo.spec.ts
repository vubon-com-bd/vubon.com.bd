import { VendorIdVO } from '@domain/primitives/vendor-id.vo.js';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { IDS } from '@domain-fixtures/ids.fixture.js';

describe('VendorIdVO', () => {
  it('creates valid', () => {
    expect(VendorIdVO.create(IDS.vendorId).value).toBe(IDS.vendorId);
  });
  it('rejects empty', () => {
    expect(() => VendorIdVO.create('')).toThrow(ValidationError);
  });
  it('branded round-trip', () => {
    const vo = VendorIdVO.create(IDS.vendorId);
    expect(VendorIdVO.fromBranded(vo.toBranded()).value).toBe(IDS.vendorId);
  });
});

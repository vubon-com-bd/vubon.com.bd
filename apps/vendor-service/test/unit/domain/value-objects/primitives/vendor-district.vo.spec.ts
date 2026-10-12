import { VendorDistrictVO } from '../../../../../src/module/domain/value-objects/primitives/vendor-district.vo.js';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

describe('VendorDistrictVO', () => {
  it('accepts valid district', () => {
    expect(VendorDistrictVO.create('Dhaka').value).toBe('Dhaka');
  });

  it('trims whitespace', () => {
    expect(VendorDistrictVO.create('  Sylhet  ').value).toBe('Sylhet');
  });

  it('accepts multi-word', () => {
    expect(VendorDistrictVO.create('Coxs Bazar').value).toBe('Coxs Bazar');
  });

  it('throws on too short', () => {
    expect(() => VendorDistrictVO.create('A')).toThrow(ValidationError);
  });

  it('throws on digits', () => {
    expect(() => VendorDistrictVO.create('Dhaka1')).toThrow(ValidationError);
  });

  it('throws on non-string', () => {
    expect(() => VendorDistrictVO.create(123 as unknown as string)).toThrow(ValidationError);
  });
});

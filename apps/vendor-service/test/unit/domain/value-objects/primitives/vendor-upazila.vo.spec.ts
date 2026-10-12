import { VendorUpazilaVO } from '../../../../../src/module/domain/value-objects/primitives/vendor-upazila.vo.js';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

describe('VendorUpazilaVO', () => {
  it('accepts valid upazila', () => {
    expect(VendorUpazilaVO.create('Savar').value).toBe('Savar');
  });

  it('trims whitespace', () => {
    expect(VendorUpazilaVO.create('  Savar  ').value).toBe('Savar');
  });

  it('throws on too short', () => {
    expect(() => VendorUpazilaVO.create('A')).toThrow(ValidationError);
  });

  it('throws on digits', () => {
    expect(() => VendorUpazilaVO.create('Savar1')).toThrow(ValidationError);
  });

  it('throws on special chars', () => {
    expect(() => VendorUpazilaVO.create('Savar@#')).toThrow(ValidationError);
  });
});

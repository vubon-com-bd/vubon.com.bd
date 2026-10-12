import { VendorTypeVO } from '../../../../../src/module/domain/value-objects/primitives/vendor-type.vo.js';
import { InvalidVendorTypeError } from '../../../../../src/module/domain/errors/vendor.errors.js';

describe('VendorTypeVO', () => {
  it('creates individual', () => {
    expect(VendorTypeVO.create('individual').value).toBe('individual');
  });

  it('throws on invalid type', () => {
    expect(() => VendorTypeVO.create('bogus')).toThrow(InvalidVendorTypeError);
  });

  describe('requiresBusinessLicense()', () => {
    it('true for corporate types', () => {
      expect(VendorTypeVO.create('partnership').requiresBusinessLicense()).toBe(true);
      expect(VendorTypeVO.create('limited_company').requiresBusinessLicense()).toBe(true);
      expect(VendorTypeVO.create('corporation').requiresBusinessLicense()).toBe(true);
    });

    it('false for individual', () => {
      expect(VendorTypeVO.create('individual').requiresBusinessLicense()).toBe(false);
    });
  });

  describe('requiresTaxId()', () => {
    it('true for corporate', () => {
      expect(VendorTypeVO.create('corporation').requiresTaxId()).toBe(true);
    });

    it('false for individual and sole_proprietor', () => {
      expect(VendorTypeVO.create('individual').requiresTaxId()).toBe(false);
    });
  });

  describe('isIndividual() / isCorporate()', () => {
    it('isIndividual', () => {
      expect(VendorTypeVO.create('individual').isIndividual()).toBe(true);
      expect(VendorTypeVO.create('corporation').isIndividual()).toBe(false);
    });

    it('isCorporate', () => {
      expect(VendorTypeVO.create('corporation').isCorporate()).toBe(true);
      expect(VendorTypeVO.create('partnership').isCorporate()).toBe(false);
    });
  });
});

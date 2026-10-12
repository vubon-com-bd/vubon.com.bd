import { VendorAddressVO } from '../../../../../src/module/domain/value-objects/primitives/vendor-address.vo.js';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

const VALID = {
  line1: '123 Main Street',
  upazila: 'Savar',
  district: 'Dhaka',
  division: 'Dhaka',
  postalCode: '1340',
  country: 'BD',
};

describe('VendorAddressVO', () => {
  describe('create()', () => {
    it('creates valid address', () => {
      const vo = VendorAddressVO.create(VALID);
      expect(vo.value.line1).toBe('123 Main Street');
      expect(vo.value.country).toBe('BD');
    });

    it('uppercases country', () => {
      const vo = VendorAddressVO.create({ ...VALID, country: 'bd' });
      expect(vo.value.country).toBe('BD');
    });

    it('trims all fields', () => {
      const vo = VendorAddressVO.create({
        ...VALID,
        line1: '  123 Main  ',
        upazila: '  Savar  ',
      });
      expect(vo.value.line1).toBe('123 Main');
      expect(vo.value.upazila).toBe('Savar');
    });

    it('throws on short line1', () => {
      expect(() => VendorAddressVO.create({ ...VALID, line1: 'A' })).toThrow(ValidationError);
    });

    it('throws on short upazila', () => {
      expect(() => VendorAddressVO.create({ ...VALID, upazila: 'A' })).toThrow(ValidationError);
    });

    it('throws on short district', () => {
      expect(() => VendorAddressVO.create({ ...VALID, district: 'A' })).toThrow(ValidationError);
    });

    it('throws on short division', () => {
      expect(() => VendorAddressVO.create({ ...VALID, division: 'A' })).toThrow(ValidationError);
    });

    it('throws on invalid country code', () => {
      expect(() => VendorAddressVO.create({ ...VALID, country: 'BANGLADESH' })).toThrow(ValidationError);
    });

    it('throws on invalid postal code', () => {
      expect(() => VendorAddressVO.create({ ...VALID, postalCode: 'AB' })).toThrow(ValidationError);
    });

    it('throws on missing line1', () => {
      expect(() => VendorAddressVO.create({ ...VALID, line1: '' })).toThrow(ValidationError);
    });
  });

  describe('oneLine', () => {
    it('joins address parts', () => {
      const vo = VendorAddressVO.create(VALID);
      expect(vo.oneLine).toContain('123 Main Street');
      expect(vo.oneLine).toContain('Dhaka');
      expect(vo.oneLine).toContain('BD');
    });
  });

  describe('isBangladeshi()', () => {
    it('true for BD', () => {
      expect(VendorAddressVO.create(VALID).isBangladeshi()).toBe(true);
    });

    it('true for BGD', () => {
      expect(VendorAddressVO.create({ ...VALID, country: 'BGD' }).isBangladeshi()).toBe(true);
    });

    it('false for US', () => {
      expect(VendorAddressVO.create({ ...VALID, country: 'US' }).isBangladeshi()).toBe(false);
    });
  });

  describe('withPostalCode()', () => {
    it('returns new VO with postal code', () => {
      const vo = VendorAddressVO.create(VALID);
      const updated = vo.withPostalCode('1200');
      expect(updated.value.postalCode).toBe('1200');
    });
  });
});

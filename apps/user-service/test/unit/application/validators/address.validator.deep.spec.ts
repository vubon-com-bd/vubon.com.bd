import { AddressValidator } from '@application/validators/address.validator';

describe('AddressValidator — deep coverage', () => {
  const validBody = {
    type: 'home',
    line1: '123 Main Street',
    city: 'Dhaka',
    postalCode: '1200',
    country: 'BD',
  };

  describe('validateDivisionDistrictPair', () => {
    it('passes for all valid pairs', () => {
      const cases = [
        ['dhaka', 'dhaka'],
        ['dhaka', 'gazipur'],
        ['chittagong', 'chittagong'],
        ['chittagong', 'cox_bazar'],
        ['rajshahi', 'rajshahi'],
        ['khulna', 'khulna'],
        ['barishal', 'barishal'],
        ['sylhet', 'sylhet'],
        ['rangpur', 'rangpur'],
        ['mymensingh', 'mymensingh'],
      ];
      for (const [div, dist] of cases) {
        expect(AddressValidator.validateDivisionDistrictPair(div, dist).success).toBe(true);
      }
    });

    it('fails on mismatch', () => {
      expect(AddressValidator.validateDivisionDistrictPair('sylhet', 'dhaka').success).toBe(false);
      expect(AddressValidator.validateDivisionDistrictPair('dhaka', 'sylhet').success).toBe(false);
    });

    it('fails on unknown division', () => {
      expect(AddressValidator.validateDivisionDistrictPair('unknown', 'dhaka').success).toBe(false);
    });
  });

  describe('validatePostalCode', () => {
    it('passes 4-digit codes', () => {
      for (const code of ['1000', '1200', '4000', '9999']) {
        expect(AddressValidator.validatePostalCode(code).success).toBe(true);
      }
    });

    it('rejects non-4-digit', () => {
      expect(AddressValidator.validatePostalCode('12').success).toBe(false);
      expect(AddressValidator.validatePostalCode('12345').success).toBe(false);
      expect(AddressValidator.validatePostalCode('abcd').success).toBe(false);
      expect(AddressValidator.validatePostalCode('').success).toBe(false);
    });
  });

  describe('validateAdd', () => {
    it('passes with valid body + userId', () => {
      const r = AddressValidator.validateAdd(validBody, 'u-1');
      expect(r.success).toBe(true);
      expect(r.data?.userId).toBe('u-1');
      expect(r.data?.line1).toBe('123 Main Street');
    });

    it('fails on empty userId', () => {
      expect(AddressValidator.validateAdd(validBody, '').success).toBe(false);
    });

    it('fails on missing line1', () => {
      const { line1: _x, ...noLine1 } = validBody;
      expect(AddressValidator.validateAdd(noLine1, 'u-1').success).toBe(false);
    });

    it('fails on invalid postalCode', () => {
      expect(
        AddressValidator.validateAdd({ ...validBody, postalCode: 'abc' }, 'u-1').success
      ).toBe(false);
    });

    it('fails on unknown field', () => {
      expect(
        AddressValidator.validateAdd({ ...validBody, unknown: 'x' }, 'u-1').success
      ).toBe(false);
    });

    it('assertValidAdd throws on invalid', () => {
      expect(() => AddressValidator.assertValidAdd({}, 'u-1')).toThrow();
    });

    it('assertValidAdd returns DTO on valid', () => {
      const r = AddressValidator.assertValidAdd(validBody, 'u-1');
      expect(r.userId).toBe('u-1');
    });
  });

  describe('validateUpdate', () => {
    it('passes with partial body', () => {
      const r = AddressValidator.validateUpdate({ city: 'Chittagong' }, 'u-1', 'a-1');
      expect(r.success).toBe(true);
      expect(r.data?.userId).toBe('u-1');
      expect(r.data?.addressId).toBe('a-1');
      expect(r.data?.city).toBe('Chittagong');
    });

    it('passes with only isDefault', () => {
      expect(
        AddressValidator.validateUpdate({ isDefault: true }, 'u-1', 'a-1').success
      ).toBe(true);
    });

    it('fails on empty body', () => {
      expect(AddressValidator.validateUpdate({}, 'u-1', 'a-1').success).toBe(false);
    });

    it('fails on missing userId', () => {
      expect(AddressValidator.validateUpdate({ city: 'X' }, '', 'a-1').success).toBe(false);
    });

    it('fails on missing addressId', () => {
      expect(AddressValidator.validateUpdate({ city: 'X' }, 'u-1', '').success).toBe(false);
    });

    it('assertValidUpdate throws on invalid', () => {
      expect(() => AddressValidator.assertValidUpdate({}, 'u-1', 'a-1')).toThrow();
    });

    it('assertValidUpdate returns DTO on valid', () => {
      const r = AddressValidator.assertValidUpdate({ city: 'Dhaka' }, 'u-1', 'a-1');
      expect(r.userId).toBe('u-1');
      expect(r.addressId).toBe('a-1');
    });
  });
});

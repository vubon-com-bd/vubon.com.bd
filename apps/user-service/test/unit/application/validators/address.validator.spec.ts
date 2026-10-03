/**
 * AddressValidator Unit Test
 */
import { AddressValidator } from '@application/validators/address.validator';

describe('AddressValidator', () => {
  const validBody = {
    type: 'home',
    line1: '123 Main Street',
    city: 'Dhaka',
    postalCode: '1200',
    country: 'BD',
  };

  describe('validateAdd', () => {
    it('should pass valid address', () => {
      const result = AddressValidator.validateAdd(validBody, 'u-1');
      expect(result.success).toBe(true);
      expect(result.data?.userId).toBe('u-1');
    });

    it('should fail on missing line1', () => {
      const { line1: _x, ...withoutLine1 } = validBody;
      const result = AddressValidator.validateAdd(withoutLine1, 'u-1');
      expect(result.success).toBe(false);
    });

    it('should fail on invalid postal code', () => {
      const result = AddressValidator.validateAdd(
        { ...validBody, postalCode: 'abc' },
        'u-1'
      );
      expect(result.success).toBe(false);
    });

    it('should fail on empty userId', () => {
      const result = AddressValidator.validateAdd(validBody, '');
      expect(result.success).toBe(false);
    });
  });

  describe('validateUpdate', () => {
    it('should pass partial update', () => {
      const result = AddressValidator.validateUpdate(
        { city: 'Chittagong' },
        'u-1',
        'a-1'
      );
      expect(result.success).toBe(true);
      expect(result.data?.addressId).toBe('a-1');
    });

    it('should fail on empty object', () => {
      const result = AddressValidator.validateUpdate({}, 'u-1', 'a-1');
      expect(result.success).toBe(false);
    });

    it('should fail on empty userId', () => {
      const result = AddressValidator.validateUpdate({ city: 'X' }, '', 'a-1');
      expect(result.success).toBe(false);
    });

    it('should fail on empty addressId', () => {
      const result = AddressValidator.validateUpdate({ city: 'X' }, 'u-1', '');
      expect(result.success).toBe(false);
    });
  });

  describe('validateDivisionDistrictPair', () => {
    it('should pass when district matches division', () => {
      const result = AddressValidator.validateDivisionDistrictPair('dhaka', 'dhaka');
      expect(result.success).toBe(true);
    });

    it('should fail when mismatch', () => {
      const result = AddressValidator.validateDivisionDistrictPair('sylhet', 'dhaka');
      expect(result.success).toBe(false);
      expect(result.errors?.[0]).toContain('does not belong');
    });
  });

  describe('validatePostalCode', () => {
    it('should pass 4-digit BD postal code', () => {
      expect(AddressValidator.validatePostalCode('1200').success).toBe(true);
    });

    it('should fail on non-4-digit', () => {
      expect(AddressValidator.validatePostalCode('abc').success).toBe(false);
    });
  });
});

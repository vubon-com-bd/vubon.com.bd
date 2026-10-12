import { VendorDivisionVO } from '../../../../../src/module/domain/value-objects/primitives/vendor-division.vo.js';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

describe('VendorDivisionVO', () => {
  describe('create()', () => {
    it('accepts valid division name', () => {
      expect(VendorDivisionVO.create('Dhaka').value).toBe('Dhaka');
    });

    it('trims whitespace', () => {
      expect(VendorDivisionVO.create('  Dhaka  ').value).toBe('Dhaka');
    });

    it('accepts multi-word with hyphen', () => {
      expect(VendorDivisionVO.create('Chattogram Hill-Tracts').value).toBeDefined();
    });

    it('throws on too short', () => {
      expect(() => VendorDivisionVO.create('A')).toThrow(ValidationError);
    });

    it('throws on too long', () => {
      expect(() => VendorDivisionVO.create('A'.repeat(100))).toThrow(ValidationError);
    });

    it('throws on digits', () => {
      expect(() => VendorDivisionVO.create('Dhaka123')).toThrow(ValidationError);
    });

    it('throws on non-string', () => {
      expect(() => VendorDivisionVO.create(123 as unknown as string)).toThrow(ValidationError);
    });
  });

  describe('matches()', () => {
    it('case-insensitive match', () => {
      expect(VendorDivisionVO.create('Dhaka').matches('dhaka')).toBe(true);
    });

    it('trims before comparing', () => {
      expect(VendorDivisionVO.create('Dhaka').matches('  dhaka  ')).toBe(true);
    });

    it('false for different', () => {
      expect(VendorDivisionVO.create('Dhaka').matches('Sylhet')).toBe(false);
    });
  });
});

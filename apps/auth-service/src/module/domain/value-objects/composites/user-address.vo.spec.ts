/**
 * UserAddressVO — Unit Tests
 * @module auth-service/domain/value-objects/composites
 */
import { UserAddressVO } from './user-address.vo';
import { UserIdVO } from '../primitives/user-id.vo';

describe('UserAddressVO', () => {
  const userId = UserIdVO.of('user-1');

  const valid = {
    userId,
    label: 'Home',
    line1: '123 Main St',
    division: 'Dhaka',
    district: 'Dhaka',
    upazila: 'Dhanmondi',
    postalCode: '1205',
    isDefault: true,
  };

  describe('of()', () => {
    it('should create valid address', () => {
      const vo = UserAddressVO.of(valid);
      expect(vo.userId.value).toBe('user-1');
      expect(vo.isDefault).toBe(true);
    });

    it('should reject empty label', () => {
      expect(() => UserAddressVO.of({ ...valid, label: '' })).toThrow('label invalid');
    });

    it('should reject label >50 chars', () => {
      expect(() => UserAddressVO.of({ ...valid, label: 'x'.repeat(51) })).toThrow('label invalid');
    });

    it('should reject empty line1', () => {
      expect(() => UserAddressVO.of({ ...valid, line1: '' })).toThrow('line1 invalid');
    });

    it('should reject missing division/district/upazila', () => {
      expect(() => UserAddressVO.of({ ...valid, division: '' })).toThrow('required');
    });

    it('should reject postalCode not 4 digits', () => {
      expect(() => UserAddressVO.of({ ...valid, postalCode: '123' })).toThrow('4 digits');
      expect(() => UserAddressVO.of({ ...valid, postalCode: 'abcd' })).toThrow('4 digits');
    });

    it('should accept optional line2', () => {
      const vo = UserAddressVO.of({ ...valid, line2: 'Apt 5B' });
      expect(vo).toBeDefined();
    });
  });

  describe('format()', () => {
    it('should join non-empty parts with comma', () => {
      const vo = UserAddressVO.of(valid);
      const formatted = vo.format();
      expect(formatted).toContain('123 Main St');
      expect(formatted).toContain('Dhanmondi');
      expect(formatted).toContain('Dhaka');
      expect(formatted).toContain('1205');
    });

    it('should include line2 if present', () => {
      const vo = UserAddressVO.of({ ...valid, line2: 'Apt 5B' });
      expect(vo.format()).toContain('Apt 5B');
    });
  });
});

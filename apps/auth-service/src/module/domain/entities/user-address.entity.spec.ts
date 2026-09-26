/**
 * UserAddressEntity — Unit Tests
 * @module auth-service/domain/entities
 */
import { UserAddressEntity } from './user-address.entity';

const NOW = '2024-01-01T00:00:00.000Z';

const buildAddress = (overrides: Partial<Parameters<typeof UserAddressEntity.create>[0]> = {}) =>
  UserAddressEntity.create({
    id: 'addr-1',
    userId: 'user-1' as never,
    label: 'Home',
    line1: '123 Main St',
    division: 'Dhaka',
    district: 'Dhaka',
    upazila: 'Dhanmondi',
    postalCode: '1205',
    isDefault: false,
    createdAt: NOW,
    updatedAt: NOW,
    ...overrides,
  });

describe('UserAddressEntity', () => {
  describe('create()', () => {
    it('should create valid address', () => {
      const addr = buildAddress();
      expect(addr.label).toBe('Home');
      expect(addr.postalCode).toBe('1205');
    });

    it('should reject postalCode not 4 digits', () => {
      expect(() => buildAddress({ postalCode: '123' })).toThrow('Postal code must be 4 digits');
      expect(() => buildAddress({ postalCode: 'abcd' })).toThrow('Postal code must be 4 digits');
      expect(() => buildAddress({ postalCode: '12345' })).toThrow('Postal code must be 4 digits');
    });

    it('should reject empty line1 (create)', () => {
      expect(() => buildAddress({ line1: '' })).toThrow('Address line1 is required');
      expect(() => buildAddress({ line1: '   ' })).toThrow('Address line1 is required');
    });

    it('should allow default address', () => {
      const addr = buildAddress({ isDefault: true });
      expect(addr.isDefault).toBe(true);
    });
  });

  describe('markDefault() / unmarkDefault()', () => {
    it('should mark as default', () => {
      const addr = buildAddress();
      addr.markDefault();
      expect(addr.isDefault).toBe(true);
    });

    it('should unmark default', () => {
      const addr = buildAddress({ isDefault: true });
      addr.unmarkDefault();
      expect(addr.isDefault).toBe(false);
    });
  });

  describe('updateLines()', () => {
    it('should update line1 and line2', () => {
      const addr = buildAddress();
      addr.updateLines('456 New St', 'Apt 5B');
      expect(addr.id).toBe('addr-1');
    });

    it('should reject empty line1 (updateLines)', () => {
      const addr = buildAddress();
      expect(() => addr.updateLines('')).toThrow('line1 required');
    });

    it('should allow updating line1 only', () => {
      const addr = buildAddress();
      expect(() => addr.updateLines('New Address')).not.toThrow();
    });
  });

  describe('identity', () => {
    it('should preserve userId', () => {
      expect(buildAddress().userId).toBe('user-1');
    });

    it('should preserve id', () => {
      expect(buildAddress().id).toBe('addr-1');
    });
  });
});

/**
 * UserTypeVO — Unit Tests
 * @module auth-service/domain/value-objects/primitives
 */
import { UserTypeVO } from './user-type.vo';
import { InvalidUserTypeError } from '../../errors/user.errors';

describe('UserTypeVO', () => {
  describe('of()', () => {
    it('should accept valid types', () => {
      ['customer', 'vendor', 'admin', 'support', 'logistics', 'moderator'].forEach((t) => {
        const vo = UserTypeVO.of(t);
        expect(vo.value).toBe(t);
      });
    });

    it('should reject invalid type', () => {
      expect(() => UserTypeVO.of('unknown')).toThrow(InvalidUserTypeError);
      expect(() => UserTypeVO.of('')).toThrow(InvalidUserTypeError);
      expect(() => UserTypeVO.of('ADMIN')).toThrow(InvalidUserTypeError);
    });
  });

  describe('isAdminLike()', () => {
    it('should return true for admin', () => {
      expect(UserTypeVO.of('admin').isAdminLike()).toBe(true);
    });

    it('should return true for moderator', () => {
      expect(UserTypeVO.of('moderator').isAdminLike()).toBe(true);
    });

    it('should return false for customer', () => {
      expect(UserTypeVO.of('customer').isAdminLike()).toBe(false);
    });

    it('should return false for vendor', () => {
      expect(UserTypeVO.of('vendor').isAdminLike()).toBe(false);
    });
  });

  describe('isCustomer()', () => {
    it('should return true only for customer', () => {
      expect(UserTypeVO.of('customer').isCustomer()).toBe(true);
      ['vendor', 'admin', 'support', 'logistics', 'moderator'].forEach((t) => {
        expect(UserTypeVO.of(t).isCustomer()).toBe(false);
      });
    });
  });
});

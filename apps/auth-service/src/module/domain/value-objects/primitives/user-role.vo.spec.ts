/**
 * UserRoleVO — Unit Tests
 * @module auth-service/domain/value-objects/primitives
 */
import { UserRoleVO } from './user-role.vo';
import { InvalidRoleError } from '../../errors/permission.errors';

describe('UserRoleVO', () => {
  describe('of()', () => {
    it('should accept valid platform roles', () => {
      const validRoles = [
        'super_admin', 'admin', 'moderator',
        'vendor', 'vendor_manager', 'vendor_staff',
        'customer', 'guest', 'support_agent', 'support_manager',
        'logistics_manager', 'logistics_agent',
        'delivery_driver', 'warehouse_manager',
      ];
      validRoles.forEach((r) => {
        const vo = UserRoleVO.of(r);
        expect(vo.value).toBe(r);
      });
    });

    it('should normalize to lowercase', () => {
      const vo = UserRoleVO.of('ADMIN');
      expect(vo.value).toBe('admin');
    });

    it('should trim whitespace', () => {
      const vo = UserRoleVO.of('  admin  ');
      expect(vo.value).toBe('admin');
    });

    it('should reject unknown role', () => {
      expect(() => UserRoleVO.of('superuser')).toThrow(InvalidRoleError);
      expect(() => UserRoleVO.of('')).toThrow(InvalidRoleError);
    });
  });

  describe('static factories', () => {
    it('should create superAdmin', () => {
      const vo = UserRoleVO.superAdmin();
      expect(vo.value).toBe('super_admin');
    });

    it('should create customer', () => {
      const vo = UserRoleVO.customer();
      expect(vo.value).toBe('customer');
    });
  });

  describe('isSuperAdmin()', () => {
    it('should return true only for super_admin', () => {
      expect(UserRoleVO.of('super_admin').isSuperAdmin()).toBe(true);
      ['admin', 'customer', 'moderator'].forEach((r) => {
        expect(UserRoleVO.of(r).isSuperAdmin()).toBe(false);
      });
    });
  });

  describe('isAdminLevel()', () => {
    it('should return true for super_admin', () => {
      expect(UserRoleVO.of('super_admin').isAdminLevel()).toBe(true);
    });

    it('should return true for admin', () => {
      expect(UserRoleVO.of('admin').isAdminLevel()).toBe(true);
    });

    it('should return false for moderator', () => {
      expect(UserRoleVO.of('moderator').isAdminLevel()).toBe(false);
    });

    it('should return false for customer', () => {
      expect(UserRoleVO.of('customer').isAdminLevel()).toBe(false);
    });
  });
});

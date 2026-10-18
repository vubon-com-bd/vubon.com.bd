/**
 * RoleAssignerService unit tests
 */
import { describe, it, expect } from '@jest/globals';
import { RoleAssignerService } from '@domain/services/role-assigner.service.js';
import { BusinessRuleError } from '@vubon/shared-kernel/domain/errors/business-rule.error';

describe('RoleAssignerService', () => {
  describe('levelOf()', () => {
    it('should return level for known roles', () => {
      expect(RoleAssignerService.levelOf('super_admin')).toBeGreaterThan(0);
      expect(RoleAssignerService.levelOf('admin')).toBeGreaterThan(0);
      expect(RoleAssignerService.levelOf('customer')).toBeGreaterThan(0);
    });

    it('should return 0 for unknown', () => {
      expect(RoleAssignerService.levelOf('unknown-role')).toBe(0);
    });

    it('super_admin > admin > moderator > customer', () => {
      expect(RoleAssignerService.levelOf('super_admin')).toBeGreaterThan(
        RoleAssignerService.levelOf('admin'),
      );
      expect(RoleAssignerService.levelOf('admin')).toBeGreaterThan(
        RoleAssignerService.levelOf('moderator'),
      );
      expect(RoleAssignerService.levelOf('moderator')).toBeGreaterThan(
        RoleAssignerService.levelOf('customer'),
      );
    });
  });

  describe('isAdmin()', () => {
    it('true for admin roles', () => {
      expect(RoleAssignerService.isAdmin('super_admin')).toBe(true);
      expect(RoleAssignerService.isAdmin('admin')).toBe(true);
      expect(RoleAssignerService.isAdmin('moderator')).toBe(true);
    });

    it('false for customer', () => {
      expect(RoleAssignerService.isAdmin('customer')).toBe(false);
    });
  });

  describe('isSystemRole()', () => {
    it('true for super_admin + admin', () => {
      expect(RoleAssignerService.isSystemRole('super_admin')).toBe(true);
      expect(RoleAssignerService.isSystemRole('admin')).toBe(true);
    });

    it('false for customer', () => {
      expect(RoleAssignerService.isSystemRole('customer')).toBe(false);
    });
  });

  describe('assertCanAssign()', () => {
    it('should pass when assigner is higher', () => {
      expect(() => RoleAssignerService.assertCanAssign('super_admin', 'admin')).not.toThrow();
    });

    it('should throw when insufficient', () => {
      expect(() => RoleAssignerService.assertCanAssign('customer', 'admin')).toThrow(
        BusinessRuleError,
      );
    });

    it('should throw when equal level', () => {
      expect(() => RoleAssignerService.assertCanAssign('admin', 'admin')).toThrow(BusinessRuleError);
    });
  });

  describe('assertRoleExists()', () => {
    it('should pass for known', () => {
      expect(() => RoleAssignerService.assertRoleExists('admin')).not.toThrow();
    });

    it('should throw for unknown', () => {
      expect(() => RoleAssignerService.assertRoleExists('xyz')).toThrow(BusinessRuleError);
    });
  });

  describe('isHigher()', () => {
    it('should compare correctly', () => {
      expect(RoleAssignerService.isHigher('admin', 'customer')).toBe(true);
      expect(RoleAssignerService.isHigher('customer', 'admin')).toBe(false);
      expect(RoleAssignerService.isHigher('admin', 'admin')).toBe(false);
    });
  });

  describe('assertExpiry()', () => {
    it('should pass undefined', () => {
      expect(() => RoleAssignerService.assertExpiry(undefined)).not.toThrow();
    });

    it('should pass future', () => {
      const future = new Date(Date.now() + 3600_000).toISOString();
      expect(() => RoleAssignerService.assertExpiry(future)).not.toThrow();
    });

    it('should throw past', () => {
      const past = new Date(Date.now() - 3600_000).toISOString();
      expect(() => RoleAssignerService.assertExpiry(past)).toThrow(BusinessRuleError);
    });
  });
});

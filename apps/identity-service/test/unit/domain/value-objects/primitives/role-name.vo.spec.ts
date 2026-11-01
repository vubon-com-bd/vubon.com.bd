/**
 * RoleNameVO unit tests
 */
import { describe, it, expect } from '@jest/globals';
import { RoleNameVO } from '@domain/value-objects/primitives/role-name.vo.js';
import { InvalidRoleNameError } from '@domain/errors/role-permission.errors.js';

describe('RoleNameVO', () => {
  describe('create()', () => {
    it('should create valid role', () => {
      expect(RoleNameVO.create('admin').value).toBe('admin');
    });

    it('should normalize case + replace spaces', () => {
      expect(RoleNameVO.create(' super admin ').value).toBe('super_admin');
    });

    it('should throw on empty', () => {
      expect(() => RoleNameVO.create('')).toThrow(InvalidRoleNameError);
    });

    it('should throw on invalid role', () => {
      expect(() => RoleNameVO.create('xyz')).toThrow(InvalidRoleNameError);
    });
  });

  describe('isAdmin()', () => {
    it('true for admin roles', () => {
      expect(RoleNameVO.create('admin').isAdmin()).toBe(true);
      expect(RoleNameVO.create('super_admin').isAdmin()).toBe(true);
      expect(RoleNameVO.create('moderator').isAdmin()).toBe(true);
    });

    it('false for customer', () => {
      expect(RoleNameVO.create('customer').isAdmin()).toBe(false);
    });
  });

  describe('reconstitute()', () => {
    it('should skip validation', () => {
      expect(RoleNameVO.reconstitute('anything').value).toBe('anything');
    });
  });
});

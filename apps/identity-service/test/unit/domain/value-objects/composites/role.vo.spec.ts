/**
 * RoleVO unit tests
 */
import { describe, it, expect } from '@jest/globals';
import { RoleVO } from '@domain/value-objects/composites/role.vo.js';
import { RoleIdVO } from '@domain/value-objects/primitives/role-id.vo.js';
import { RoleNameVO } from '@domain/value-objects/primitives/role-name.vo.js';
import { PermissionNameVO } from '@domain/value-objects/primitives/permission-name.vo.js';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { TEST_IDS, TEST_ROLE_ADMIN } from '@fixtures/index';
import { TEST_DATES } from '@fixtures/index';

const makeProps = (overrides: Record<string, unknown> = {}) => ({
  id: RoleIdVO.create(TEST_IDS.ROLE_ID),
  name: RoleNameVO.create(TEST_ROLE_ADMIN),
  level: 90,
  isSystemRole: false,
  permissions: [] as readonly PermissionNameVO[],
  createdAt: TEST_DATES.NOW,
  updatedAt: TEST_DATES.NOW,
  ...overrides,
});

describe('RoleVO', () => {
  describe('create()', () => {
    it('should create valid', () => {
      const vo = RoleVO.create(makeProps());
      expect(vo.level).toBe(90);
      expect(vo.name.value).toBe(TEST_ROLE_ADMIN);
    });

    it('should throw when level < 0', () => {
      expect(() => RoleVO.create(makeProps({ level: -1 }))).toThrow(ValidationError);
    });

    it('should throw when level > 100', () => {
      expect(() => RoleVO.create(makeProps({ level: 101 }))).toThrow(ValidationError);
    });

    it('should freeze', () => {
      expect(Object.isFrozen(RoleVO.create(makeProps()))).toBe(true);
    });
  });

  describe('hasPermission()', () => {
    it('true for exact match', () => {
      const vo = RoleVO.create(
        makeProps({ permissions: [PermissionNameVO.create('auth:login')] }),
      );
      expect(vo.hasPermission('auth:login')).toBe(true);
    });

    it('true for wildcard', () => {
      const vo = RoleVO.create(
        makeProps({ permissions: [PermissionNameVO.create('*')] }),
      );
      expect(vo.hasPermission('anything:goes')).toBe(true);
    });

    it('false for non-match', () => {
      const vo = RoleVO.create(
        makeProps({ permissions: [PermissionNameVO.create('auth:login')] }),
      );
      expect(vo.hasPermission('auth:logout')).toBe(false);
    });
  });

  describe('isHigherThan()', () => {
    it('returns true when higher', () => {
      const admin = RoleVO.create(makeProps({ level: 90 }));
      const customer = RoleVO.create(makeProps({ level: 20 }));
      expect(admin.isHigherThan(customer)).toBe(true);
      expect(customer.isHigherThan(admin)).toBe(false);
    });
  });

  describe('reconstitute()', () => {
    it('should skip validation', () => {
      const vo = RoleVO.reconstitute(makeProps({ level: 999 }));
      expect(vo.level).toBe(999);
    });
  });
});

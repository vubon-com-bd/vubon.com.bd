/**
 * RoleEntity unit tests
 */
import { describe, it, expect } from '@jest/globals';
import { RoleEntity } from '@domain/entities/role.entity.js';
import { RoleIdVO } from '@domain/value-objects/primitives/role-id.vo.js';
import { RoleNameVO } from '@domain/value-objects/primitives/role-name.vo.js';
import { PermissionNameVO } from '@domain/value-objects/primitives/permission-name.vo.js';
import { BusinessRuleError } from '@vubon/shared-kernel/domain/errors/business-rule.error';
import { TEST_IDS, TEST_DATES } from '@fixtures/index';

const makeRole = (overrides: Record<string, unknown> = {}) =>
  RoleEntity.create({
    id: RoleIdVO.create(TEST_IDS.ROLE_ID),
    props: {
      name: RoleNameVO.create('admin'),
      level: 90,
      isSystemRole: false,
      permissions: [],
      ...overrides,
    },
    now: TEST_DATES.NOW,
  });

describe('RoleEntity', () => {
  describe('create()', () => {
    it('should create valid', () => {
      const r = makeRole();
      expect(r.name.value).toBe('admin');
      expect(r.level).toBe(90);
    });

    it('should default isSystemRole to false', () => {
      const r = RoleEntity.create({
        id: RoleIdVO.create(TEST_IDS.ROLE_ID),
        props: {
          name: RoleNameVO.create('customer'),
          level: 20,
          permissions: [],
        },
        now: TEST_DATES.NOW,
      });
      expect(r.isSystemRole).toBe(false);
    });
  });

  describe('hasPermission()', () => {
    it('false when empty', () => {
      const r = makeRole();
      expect(r.hasPermission('auth:login')).toBe(false);
    });

    it('true for wildcard', () => {
      const r = makeRole({ permissions: [PermissionNameVO.create('*')] });
      expect(r.hasPermission('anything:goes')).toBe(true);
    });

    it('true for exact match', () => {
      const r = makeRole({
        permissions: [PermissionNameVO.create('auth:login')],
      });
      expect(r.hasPermission('auth:login')).toBe(true);
    });
  });

  describe('grantPermission()', () => {
    it('should add permission', () => {
      const r = makeRole();
      r.grantPermission(PermissionNameVO.create('auth:login'));
      expect(r.hasPermission('auth:login')).toBe(true);
      expect(r.permissions.length).toBe(1);
    });

    it('should be idempotent', () => {
      const r = makeRole({ permissions: [PermissionNameVO.create('auth:login')] });
      r.grantPermission(PermissionNameVO.create('auth:login'));
      expect(r.permissions.length).toBe(1);
    });
  });

  describe('revokePermission()', () => {
    it('should remove permission', () => {
      const r = makeRole({ permissions: [PermissionNameVO.create('auth:login')] });
      r.revokePermission('auth:login');
      expect(r.hasPermission('auth:login')).toBe(false);
    });

    it('should be no-op if not present', () => {
      const r = makeRole();
      r.revokePermission('nope:nope');
      expect(r.permissions.length).toBe(0);
    });
  });

  describe('rename()', () => {
    it('should update name for non-system role', () => {
      const r = makeRole();
      r.rename(RoleNameVO.create('moderator'));
      expect(r.name.value).toBe('moderator');
    });

    it('should throw for system role', () => {
      const r = makeRole({ isSystemRole: true });
      expect(() => r.rename(RoleNameVO.create('moderator'))).toThrow(BusinessRuleError);
    });
  });
});

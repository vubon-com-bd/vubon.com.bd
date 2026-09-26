/**
 * AuthPermissionEntity — Unit Tests
 * @module auth-service/domain/entities
 */
import { AuthPermissionEntity } from './auth-permission.entity';
import { PermissionNameVO } from '../value-objects/primitives/permission-name.vo';
import { PermissionActionVO } from '../value-objects/primitives/permission-action.vo';
import { PermissionResourceVO } from '../value-objects/primitives/permission-resource.vo';

const NOW = '2024-01-01T00:00:00.000Z';

const buildPermission = (
  overrides: Partial<Parameters<typeof AuthPermissionEntity.create>[0]> = {},
) =>
  AuthPermissionEntity.create({
    id: 'perm-1',
    name: PermissionNameVO.of('user:view'),
    resource: PermissionResourceVO.of('user'),
    action: PermissionActionVO.of('view'),
    createdAt: NOW,
    updatedAt: NOW,
    ...overrides,
  });

describe('AuthPermissionEntity', () => {
  describe('create()', () => {
    it('should create valid permission', () => {
      const p = buildPermission();
      expect(p.name.value).toBe('user:view');
      expect(p.resource.value).toBe('user');
      expect(p.action.value).toBe('view');
    });

    it('should create wildcard permission', () => {
      const p = buildPermission({
        name: PermissionNameVO.of('*'),
        resource: PermissionResourceVO.of('*'),
        action: PermissionActionVO.of('*'),
      });
      expect(p.name.isWildcard()).toBe(true);
    });

    it('should reject name that does not match resource:action', () => {
      expect(() =>
        buildPermission({
          name: PermissionNameVO.of('user:view'),
          resource: PermissionResourceVO.of('user'),
          action: PermissionActionVO.of('create'),
        }),
      ).toThrow('Permission name mismatch');
    });

    it('should accept description', () => {
      const p = buildPermission({ description: 'View users' });
      expect(p.description).toBe('View users');
    });
  });

  describe('matches()', () => {
    it('should match exact permission', () => {
      const p = buildPermission();
      const required = PermissionNameVO.of('user:view');
      expect(p.matches(required)).toBe(true);
    });

    it('should not match different action', () => {
      const p = buildPermission();
      const required = PermissionNameVO.of('user:create');
      expect(p.matches(required)).toBe(false);
    });

    it('wildcard permission should match anything', () => {
      const p = buildPermission({
        name: PermissionNameVO.of('*'),
        resource: PermissionResourceVO.of('*'),
        action: PermissionActionVO.of('*'),
      });
      expect(p.matches(PermissionNameVO.of('user:view'))).toBe(true);
      expect(p.matches(PermissionNameVO.of('product:create'))).toBe(true);
    });

    it('resource wildcard should match all actions for resource', () => {
      const p = buildPermission({
        name: PermissionNameVO.of('user:*'),
        resource: PermissionResourceVO.of('user'),
        action: PermissionActionVO.of('*'),
      });
      expect(p.matches(PermissionNameVO.of('user:view'))).toBe(true);
      expect(p.matches(PermissionNameVO.of('user:create'))).toBe(true);
      expect(p.matches(PermissionNameVO.of('product:view'))).toBe(false);
    });
  });

  describe('getters', () => {
    it('should expose name', () => {
      expect(buildPermission().name.value).toBe('user:view');
    });

    it('should expose resource', () => {
      expect(buildPermission().resource.value).toBe('user');
    });

    it('should expose action', () => {
      expect(buildPermission().action.value).toBe('view');
    });

    it('should expose description as undefined when not set', () => {
      expect(buildPermission().description).toBeUndefined();
    });
  });
});

/**
 * PermissionEntity unit tests
 */
import { describe, it, expect } from '@jest/globals';
import { PermissionEntity } from '@domain/entities/permission.entity.js';
import { PermissionNameVO } from '@domain/value-objects/primitives/permission-name.vo.js';
import { TEST_IDS, TEST_DATES } from '@fixtures/index';

describe('PermissionEntity', () => {
  describe('create()', () => {
    it('should create valid', () => {
      const p = PermissionEntity.create({
        id: TEST_IDS.PERMISSION_ID,
        props: {
          name: PermissionNameVO.create('auth:login'),
          description: 'User can login',
          category: 'auth',
          isSensitive: false,
        },
        now: TEST_DATES.NOW,
      });
      expect(p.name.value).toBe('auth:login');
      expect(p.category).toBe('auth');
      expect(p.isSensitive).toBe(false);
    });
  });

  describe('getters', () => {
    it('should expose all props', () => {
      const p = PermissionEntity.create({
        id: TEST_IDS.PERMISSION_ID,
        props: {
          name: PermissionNameVO.create('admin:manage'),
          description: 'Admin manage',
          category: 'admin',
          isSensitive: true,
        },
        now: TEST_DATES.NOW,
      });
      expect(p.description).toBe('Admin manage');
      expect(p.isSensitive).toBe(true);
    });
  });

  describe('reconstitute()', () => {
    it('should rebuild', () => {
      const p = PermissionEntity.reconstitute({
        id: TEST_IDS.PERMISSION_ID,
        createdAt: TEST_DATES.NOW,
        updatedAt: TEST_DATES.NOW,
        props: {
          name: PermissionNameVO.create('auth:logout'),
          description: 'Logout',
          category: 'auth',
          isSensitive: false,
        },
      });
      expect(p.name.value).toBe('auth:logout');
    });
  });
});

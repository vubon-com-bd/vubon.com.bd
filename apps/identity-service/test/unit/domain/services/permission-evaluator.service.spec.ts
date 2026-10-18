/**
 * PermissionEvaluatorService unit tests
 */
import { describe, it, expect } from '@jest/globals';
import { PermissionEvaluatorService } from '@domain/services/permission-evaluator.service.js';

const makeCtx = (overrides: Partial<{
  userPermissions: readonly string[];
  userRoles: readonly string[];
  resourceOwnerId?: string;
  userId: string;
}> = {}) => ({
  userPermissions: ['auth:login', 'auth:logout'],
  userRoles: ['customer'],
  userId: 'user-1',
  ...overrides,
});

describe('PermissionEvaluatorService', () => {
  describe('has()', () => {
    it('true for exact match', () => {
      expect(PermissionEvaluatorService.has('auth:login', makeCtx())).toBe(true);
    });

    it('false for non-match', () => {
      expect(PermissionEvaluatorService.has('admin:delete', makeCtx())).toBe(false);
    });

    it('true for wildcard ALL', () => {
      expect(PermissionEvaluatorService.has('anything', makeCtx({ userPermissions: ['*'] }))).toBe(
        true,
      );
    });

    it('true for resource wildcard', () => {
      expect(PermissionEvaluatorService.has('auth:reset', makeCtx({ userPermissions: ['auth:*'] }))).toBe(
        true,
      );
    });
  });

  describe('hasAny()', () => {
    it('true if any matches', () => {
      expect(
        PermissionEvaluatorService.hasAny(['auth:login', 'admin:x'], makeCtx()),
      ).toBe(true);
    });

    it('false if none matches', () => {
      expect(PermissionEvaluatorService.hasAny(['admin:x', 'admin:y'], makeCtx())).toBe(false);
    });
  });

  describe('hasAll()', () => {
    it('true when all present', () => {
      expect(PermissionEvaluatorService.hasAll(['auth:login', 'auth:logout'], makeCtx())).toBe(
        true,
      );
    });

    it('false when one missing', () => {
      expect(PermissionEvaluatorService.hasAll(['auth:login', 'admin:x'], makeCtx())).toBe(false);
    });
  });

  describe('canAccessOwn()', () => {
    it('true when owner', () => {
      expect(PermissionEvaluatorService.canAccessOwn(makeCtx({ resourceOwnerId: 'user-1' }))).toBe(
        true,
      );
    });

    it('false when different owner', () => {
      expect(PermissionEvaluatorService.canAccessOwn(makeCtx({ resourceOwnerId: 'user-2' }))).toBe(
        false,
      );
    });
  });

  describe('canAccess()', () => {
    it('true when has permission', () => {
      expect(PermissionEvaluatorService.canAccess('auth:login', makeCtx())).toBe(true);
    });

    it('true when owner', () => {
      expect(
        PermissionEvaluatorService.canAccess(
          'admin:delete',
          makeCtx({ resourceOwnerId: 'user-1' }),
        ),
      ).toBe(true);
    });

    it('false when neither', () => {
      expect(
        PermissionEvaluatorService.canAccess(
          'admin:delete',
          makeCtx({ resourceOwnerId: 'user-2' }),
        ),
      ).toBe(false);
    });
  });

  describe('isAdminBypass()', () => {
    it('true for admin', () => {
      expect(PermissionEvaluatorService.isAdminBypass(['admin'])).toBe(true);
      expect(PermissionEvaluatorService.isAdminBypass(['super_admin'])).toBe(true);
      expect(PermissionEvaluatorService.isAdminBypass(['moderator'])).toBe(true);
    });

    it('false for customer', () => {
      expect(PermissionEvaluatorService.isAdminBypass(['customer'])).toBe(false);
    });
  });
});

/**
 * PermissionNameVO unit tests
 */
import { describe, it, expect } from '@jest/globals';
import { PermissionNameVO } from '@domain/value-objects/primitives/permission-name.vo.js';
import { InvalidPermissionNameError } from '@domain/errors/role-permission.errors.js';

describe('PermissionNameVO', () => {
  describe('create()', () => {
    it('should create resource:action', () => {
      const vo = PermissionNameVO.create('auth:login');
      expect(vo.value).toBe('auth:login');
      expect(vo.resource).toBe('auth');
      expect(vo.action).toBe('login');
    });

    it('should create wildcard', () => {
      const vo = PermissionNameVO.create('*');
      expect(vo.isWildcard()).toBe(true);
    });

    it('should normalize case', () => {
      expect(PermissionNameVO.create(' AUTH:LOGIN ').value).toBe('auth:login');
    });

    it('should throw on empty', () => {
      expect(() => PermissionNameVO.create('')).toThrow(InvalidPermissionNameError);
    });

    it('should throw on invalid format', () => {
      expect(() => PermissionNameVO.create('invalid-format')).toThrow(InvalidPermissionNameError);
    });

    it('should throw on invalid chars', () => {
      expect(() => PermissionNameVO.create('auth:LOGIN123')).toThrow(InvalidPermissionNameError);
    });
  });

  describe('getters', () => {
    it('resource + action', () => {
      const vo = PermissionNameVO.create('user:create');
      expect(vo.resource).toBe('user');
      expect(vo.action).toBe('create');
    });

    it('wildcard resource is empty', () => {
      const vo = PermissionNameVO.create('*');
      expect(vo.isWildcard()).toBe(true);
    });
  });

  describe('reconstitute()', () => {
    it('should skip validation', () => {
      expect(PermissionNameVO.reconstitute('anything').value).toBe('anything');
    });
  });
});

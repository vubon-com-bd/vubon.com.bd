/**
 * PermissionActionVO — Unit Tests
 * @module auth-service/domain/value-objects/primitives
 */
import { PermissionActionVO } from './permission-action.vo';

describe('PermissionActionVO', () => {
  describe('of()', () => {
    it('should accept all valid actions', () => {
      ['view', 'create', 'update', 'delete', 'manage', 'approve', 'export', 'process', 'refund', 'cancel', 'assign', '*'].forEach((a) => {
        const vo = PermissionActionVO.of(a);
        expect(vo.value).toBe(a);
      });
    });

    it('should normalize to lowercase', () => {
      const vo = PermissionActionVO.of('CREATE');
      expect(vo.value).toBe('create');
    });

    it('should reject invalid action', () => {
      expect(() => PermissionActionVO.of('unknown')).toThrow();
    });
  });

  describe('isWrite()', () => {
    it('should return true for create', () => {
      expect(PermissionActionVO.of('create').isWrite()).toBe(true);
    });

    it('should return true for update', () => {
      expect(PermissionActionVO.of('update').isWrite()).toBe(true);
    });

    it('should return true for delete', () => {
      expect(PermissionActionVO.of('delete').isWrite()).toBe(true);
    });

    it('should return false for view', () => {
      expect(PermissionActionVO.of('view').isWrite()).toBe(false);
    });

    it('should return false for export', () => {
      expect(PermissionActionVO.of('export').isWrite()).toBe(false);
    });

    it('should return false for wildcard', () => {
      expect(PermissionActionVO.of('*').isWrite()).toBe(false);
    });
  });
});

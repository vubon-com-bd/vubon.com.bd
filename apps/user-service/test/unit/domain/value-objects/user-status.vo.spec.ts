/**
 * UserStatusVO Unit Test
 */
import { UserStatusVO } from '@domain/value-objects/primitives/user-status.vo';

describe('UserStatusVO', () => {
  describe('create', () => {
    it('should create active status', () => {
      const vo = UserStatusVO.create('active');
      expect(vo.value).toBe('active');
    });

    it('should create pending status', () => {
      const vo = UserStatusVO.create('pending');
      expect(vo.value).toBe('pending');
    });

    it('should lowercase input', () => {
      const vo = UserStatusVO.create('ACTIVE');
      expect(vo.value).toBe('active');
    });

    it('should throw on invalid status', () => {
      expect(() => UserStatusVO.create('not-a-status')).toThrow('Invalid user status');
    });
  });

  describe('helpers', () => {
    it('should identify active', () => {
      expect(UserStatusVO.active().isActive()).toBe(true);
      expect(UserStatusVO.active().isSuspended()).toBe(false);
    });

    it('should identify suspended', () => {
      expect(UserStatusVO.suspended().isSuspended()).toBe(true);
    });

    it('should identify pending', () => {
      expect(UserStatusVO.pending().isPending()).toBe(true);
    });

    it('should check canLogin', () => {
      expect(UserStatusVO.active().canLogin()).toBe(true);
      expect(UserStatusVO.suspended().canLogin()).toBe(false);
      expect(UserStatusVO.pending().canLogin()).toBe(false);
    });
  });
});

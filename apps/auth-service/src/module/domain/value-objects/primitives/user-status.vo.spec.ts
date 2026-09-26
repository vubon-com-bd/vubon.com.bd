/**
 * UserStatusVO — Unit Tests
 * @module auth-service/domain/value-objects/primitives
 */
import { UserStatusVO } from './user-status.vo';
import { InvalidUserStatusError } from '../../errors/user.errors';

describe('UserStatusVO', () => {
  describe('of()', () => {
    it('should accept valid statuses', () => {
      ['active', 'inactive', 'suspended', 'pending', 'deleted'].forEach((s) => {
        const vo = UserStatusVO.of(s);
        expect(vo.value).toBe(s);
      });
    });

    it('should reject invalid status', () => {
      expect(() => UserStatusVO.of('unknown')).toThrow(InvalidUserStatusError);
      expect(() => UserStatusVO.of('')).toThrow(InvalidUserStatusError);
      expect(() => UserStatusVO.of('ACTIVE')).toThrow(InvalidUserStatusError);
    });
  });

  describe('static factories', () => {
    it('should create active status', () => {
      const vo = UserStatusVO.active();
      expect(vo.value).toBe('active');
    });

    it('should create pending status', () => {
      const vo = UserStatusVO.pending();
      expect(vo.value).toBe('pending');
    });

    it('should create suspended status', () => {
      const vo = UserStatusVO.suspended();
      expect(vo.value).toBe('suspended');
    });
  });

  describe('isActive()', () => {
    it('should return true for active', () => {
      expect(UserStatusVO.of('active').isActive()).toBe(true);
    });

    it('should return false for others', () => {
      ['inactive', 'suspended', 'pending', 'deleted'].forEach((s) => {
        expect(UserStatusVO.of(s).isActive()).toBe(false);
      });
    });
  });

  describe('isLoginAllowed()', () => {
    it('should allow login only for active', () => {
      expect(UserStatusVO.of('active').isLoginAllowed()).toBe(true);
      ['inactive', 'suspended', 'pending', 'deleted'].forEach((s) => {
        expect(UserStatusVO.of(s).isLoginAllowed()).toBe(false);
      });
    });
  });

  describe('isTerminal()', () => {
    it('should return true only for deleted', () => {
      expect(UserStatusVO.of('deleted').isTerminal()).toBe(true);
      ['active', 'inactive', 'suspended', 'pending'].forEach((s) => {
        expect(UserStatusVO.of(s).isTerminal()).toBe(false);
      });
    });
  });

  describe('canTransitionTo()', () => {
    it('pending → active: allowed', () => {
      const from = UserStatusVO.of('pending');
      const to = UserStatusVO.of('active');
      expect(from.canTransitionTo(to)).toBe(true);
    });

    it('pending → deleted: allowed', () => {
      const from = UserStatusVO.of('pending');
      const to = UserStatusVO.of('deleted');
      expect(from.canTransitionTo(to)).toBe(true);
    });

    it('pending → suspended: NOT allowed', () => {
      const from = UserStatusVO.of('pending');
      const to = UserStatusVO.of('suspended');
      expect(from.canTransitionTo(to)).toBe(false);
    });

    it('active → suspended: allowed', () => {
      const from = UserStatusVO.of('active');
      const to = UserStatusVO.of('suspended');
      expect(from.canTransitionTo(to)).toBe(true);
    });

    it('active → deleted: allowed', () => {
      const from = UserStatusVO.of('active');
      const to = UserStatusVO.of('deleted');
      expect(from.canTransitionTo(to)).toBe(true);
    });

    it('deleted → any: NOT allowed', () => {
      const from = UserStatusVO.of('deleted');
      ['active', 'inactive', 'pending', 'suspended'].forEach((s) => {
        expect(from.canTransitionTo(UserStatusVO.of(s))).toBe(false);
      });
    });

    it('suspended → active: allowed', () => {
      const from = UserStatusVO.of('suspended');
      const to = UserStatusVO.of('active');
      expect(from.canTransitionTo(to)).toBe(true);
    });
  });
});

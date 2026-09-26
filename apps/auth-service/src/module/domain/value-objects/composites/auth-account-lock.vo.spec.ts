/**
 * AuthAccountLockVO — Unit Tests
 * @module auth-service/domain/value-objects/composites
 */
import { AuthAccountLockVO } from './auth-account-lock.vo';
import { UserIdVO } from '../primitives/user-id.vo';
import { AccountLockReasonVO } from '../primitives/account-lock-reason.vo';

describe('AuthAccountLockVO', () => {
  const userId = UserIdVO.of('user-1');
  const now = Date.now();

  describe('of()', () => {
    it('should create lock with unlockAt', () => {
      const vo = AuthAccountLockVO.of({
        lockId: 'lock-1',
        userId,
        reason: AccountLockReasonVO.of('too_many_attempts'),
        lockedAt: now,
        unlockAt: now + 3_600_000,
      });
      expect(vo.userId.value).toBe('user-1');
    });

    it('should create permanent lock (no unlockAt)', () => {
      const vo = AuthAccountLockVO.of({
        lockId: 'lock-1',
        userId,
        reason: AccountLockReasonVO.of('admin_action'),
        lockedAt: now,
      });
      expect(vo.isCurrentlyLocked(now)).toBe(true);
    });

    it('should reject unlockAt <= lockedAt', () => {
      expect(() => AuthAccountLockVO.of({
        lockId: 'lock-1', userId,
        reason: AccountLockReasonVO.of('too_many_attempts'),
        lockedAt: now,
        unlockAt: now,
      })).toThrow('after lockedAt');
    });
  });

  describe('isCurrentlyLocked()', () => {
    it('should return true for active lock', () => {
      const vo = AuthAccountLockVO.of({
        lockId: 'lock-1', userId,
        reason: AccountLockReasonVO.of('too_many_attempts'),
        lockedAt: now,
        unlockAt: now + 3_600_000,
      });
      expect(vo.isCurrentlyLocked(now)).toBe(true);
    });

    it('should return false for expired lock', () => {
      const vo = AuthAccountLockVO.of({
        lockId: 'lock-1', userId,
        reason: AccountLockReasonVO.of('too_many_attempts'),
        lockedAt: now,
        unlockAt: now + 60_000,
      });
      expect(vo.isCurrentlyLocked(now + 120_000)).toBe(false);
    });

    it('should return false after unlockedAt', () => {
      const vo = AuthAccountLockVO.of({
        lockId: 'lock-1', userId,
        reason: AccountLockReasonVO.of('too_many_attempts'),
        lockedAt: now,
        unlockAt: now + 3_600_000,
        unlockedAt: now + 1000,
      });
      expect(vo.isCurrentlyLocked(now + 2000)).toBe(false);
    });

    it('should return true for permanent lock', () => {
      const vo = AuthAccountLockVO.of({
        lockId: 'lock-1', userId,
        reason: AccountLockReasonVO.of('admin_action'),
        lockedAt: now,
      });
      expect(vo.isCurrentlyLocked(now + 10_000_000)).toBe(true);
    });
  });

  describe('requiresManualUnlock()', () => {
    it('should return true for admin_action', () => {
      const vo = AuthAccountLockVO.of({
        lockId: 'lock-1', userId,
        reason: AccountLockReasonVO.of('admin_action'),
        lockedAt: now,
      });
      expect(vo.requiresManualUnlock()).toBe(true);
    });

    it('should return false for too_many_attempts', () => {
      const vo = AuthAccountLockVO.of({
        lockId: 'lock-1', userId,
        reason: AccountLockReasonVO.of('too_many_attempts'),
        lockedAt: now,
      });
      expect(vo.requiresManualUnlock()).toBe(false);
    });
  });
});

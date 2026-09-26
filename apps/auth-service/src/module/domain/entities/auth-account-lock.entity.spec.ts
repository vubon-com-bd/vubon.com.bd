/**
 * AuthAccountLockEntity — Unit Tests (Aggregate Root)
 * @module auth-service/domain/entities
 */
import { AuthAccountLockEntity } from './auth-account-lock.entity';
import { AccountLockReasonVO } from '../value-objects/primitives/account-lock-reason.vo';
import { AccountLockDurationVO } from '../value-objects/primitives/account-lock-duration.vo';
import { AccountNotLockedError } from '../errors/account-lock.errors';

const NOW = '2024-01-01T00:00:00.000Z';
const NOW_MS = new Date(NOW).getTime();
const ONE_HOUR = 3_600_000;

const buildLock = (overrides: Partial<Parameters<typeof AuthAccountLockEntity.create>[0]> = {}) =>
  AuthAccountLockEntity.create({
    id: 'lock-1',
    userId: 'user-1' as never,
    reason: AccountLockReasonVO.of('too_many_attempts'),
    lockedAt: NOW_MS,
    duration: AccountLockDurationVO.ofHours(1),
    createdAt: NOW,
    updatedAt: NOW,
    ...overrides,
  });

describe('AuthAccountLockEntity (Aggregate Root)', () => {
  describe('create()', () => {
    it('should create time-limited lock', () => {
      const l = buildLock();
      expect(l.userId).toBe('user-1');
      expect(l.reason.value).toBe('too_many_attempts');
      expect(l.isPermanent()).toBe(false);
    });

    it('should create permanent lock (no duration)', () => {
      const l = buildLock({ duration: undefined });
      expect(l.isPermanent()).toBe(true);
    });
  });

  describe('isPermanent()', () => {
    it('should return true without duration', () => {
      expect(buildLock({ duration: undefined }).isPermanent()).toBe(true);
    });

    it('should return false with duration', () => {
      expect(buildLock().isPermanent()).toBe(false);
    });
  });

  describe('isLocked()', () => {
    it('should return true during lock period', () => {
      const l = buildLock();
      expect(l.isLocked(NOW_MS + 30 * 60 * 1000)).toBe(true);
    });

    it('should return false after lock expires', () => {
      const l = buildLock();
      expect(l.isLocked(NOW_MS + 2 * ONE_HOUR)).toBe(false);
    });

    it('should return false after unlock()', () => {
      const l = buildLock();
      l.unlock(NOW_MS + 1000);
      expect(l.isLocked(NOW_MS + 2000)).toBe(false);
    });

    it('should return true for permanent lock at any time', () => {
      const l = buildLock({ duration: undefined });
      expect(l.isLocked(NOW_MS + 10 * ONE_HOUR)).toBe(true);
      expect(l.isLocked(NOW_MS + 100 * ONE_HOUR)).toBe(true);
    });
  });

  describe('unlock()', () => {
    it('should set unlockedAt', () => {
      const l = buildLock();
      l.unlock(NOW_MS + 1000);
      expect(l.unlockedAt).toBe(NOW_MS + 1000);
    });

    it('should accept unlockedBy', () => {
      const l = buildLock();
      l.unlock(NOW_MS + 1000, 'admin-1');
      expect(l.unlockedAt).toBe(NOW_MS + 1000);
    });

    it('should throw if already unlocked', () => {
      const l = buildLock();
      l.unlock(NOW_MS);
      expect(() => l.unlock(NOW_MS + 1000)).toThrow(AccountNotLockedError);
    });
  });

  describe('shouldAutoUnlock()', () => {
    it('should return false for permanent lock', () => {
      const l = buildLock({ duration: undefined });
      expect(l.shouldAutoUnlock(NOW_MS + 100 * ONE_HOUR)).toBe(false);
    });

    it('should return false for >24h lock', () => {
      const l = buildLock({ duration: AccountLockDurationVO.ofDays(7) });
      expect(l.shouldAutoUnlock(NOW_MS + 8 * 24 * ONE_HOUR)).toBe(false);
    });

    it('should return true for expired short lock', () => {
      const l = buildLock({ duration: AccountLockDurationVO.ofMinutes(5) });
      expect(l.shouldAutoUnlock(NOW_MS + 10 * 60 * 1000)).toBe(true);
    });

    it('should return false for already unlocked', () => {
      const l = buildLock();
      l.unlock(NOW_MS + 1000);
      expect(l.shouldAutoUnlock(NOW_MS + 2 * ONE_HOUR)).toBe(false);
    });
  });

  describe('getters', () => {
    it('should expose reason', () => {
      expect(buildLock().reason.value).toBe('too_many_attempts');
    });

    it('should expose lockedAt', () => {
      expect(buildLock().lockedAt).toBe(NOW_MS);
    });

    it('should expose duration', () => {
      expect(buildLock().duration?.value).toBe(ONE_HOUR);
    });

    it('should expose unlockedAt as undefined initially', () => {
      expect(buildLock().unlockedAt).toBeUndefined();
    });
  });
});

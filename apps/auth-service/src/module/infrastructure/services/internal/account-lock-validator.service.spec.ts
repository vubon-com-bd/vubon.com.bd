/**
 * AccountLockValidatorService — Unit Tests
 * @module auth-service/infrastructure/services/internal
 */
import { AccountLockValidatorService } from './account-lock-validator.service';
import { AuthAccountLockEntity } from '../../../domain/entities/auth-account-lock.entity';
import { AccountLockReasonVO } from '../../../domain/value-objects/primitives/account-lock-reason.vo';
import { AccountLockDurationVO } from '../../../domain/value-objects/primitives/account-lock-duration.vo';
import { AccountLockedError } from '../../../domain/errors/account-lock.errors';

const NOW = '2024-01-01T00:00:00.000Z';
const NOW_MS = new Date(NOW).getTime();

const buildLock = (durationHours = 1) =>
  AuthAccountLockEntity.create({
    id: 'lock-1',
    userId: 'user-1' as never,
    reason: AccountLockReasonVO.of('too_many_attempts'),
    lockedAt: NOW_MS,
    duration: AccountLockDurationVO.ofHours(durationHours),
    createdAt: NOW,
    updatedAt: NOW,
  });

describe('AccountLockValidatorService', () => {
  let service: AccountLockValidatorService;

  beforeEach(() => {
    service = new AccountLockValidatorService();
  });

  it('should have name', () => {
    expect(service.name).toBe('AccountLockValidatorService');
  });

  describe('isLocked()', () => {
    it('should return false for null lock', () => {
      expect(service.isLocked(null, NOW_MS)).toBe(false);
    });

    it('should return true for active lock', () => {
      const lock = buildLock(1);
      expect(service.isLocked(lock, NOW_MS + 30 * 60 * 1000)).toBe(true);
    });

    it('should return false for expired lock', () => {
      const lock = buildLock(1);
      expect(service.isLocked(lock, NOW_MS + 2 * 60 * 60 * 1000)).toBe(false);
    });
  });

  describe('assertNotLocked()', () => {
    it('should not throw for null lock', () => {
      expect(() => service.assertNotLocked(null, NOW_MS)).not.toThrow();
    });

    it('should not throw for expired lock', () => {
      const lock = buildLock(1);
      expect(() => service.assertNotLocked(lock, NOW_MS + 2 * 60 * 60 * 1000)).not.toThrow();
    });

    it('should throw AccountLockedError for active lock', () => {
      const lock = buildLock(1);
      expect(() => service.assertNotLocked(lock, NOW_MS + 30 * 60 * 1000))
        .toThrow(AccountLockedError);
    });
  });
});

/**
 * AccountLockVO unit tests
 */
import { describe, it, expect } from '@jest/globals';
import { AccountLockVO } from '@domain/value-objects/composites/account-lock.vo.js';
import { AuthIdVO } from '@domain/value-objects/primitives/auth-id.vo.js';
import { LockReasonVO } from '@domain/value-objects/primitives/lock-reason.vo.js';
import { LockDurationVO } from '@domain/value-objects/primitives/lock-duration.vo.js';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { TEST_IDS } from '@fixtures/index';
import { TEST_DATES } from '@fixtures/index';

const makeProps = (overrides: Record<string, unknown> = {}) => ({
  authId: AuthIdVO.create(TEST_IDS.AUTH_ID),
  reason: LockReasonVO.create('too_many_attempts'),
  duration: LockDurationVO.fromSeconds(900),
  lockedAt: TEST_DATES.NOW,
  lockedUntil: TEST_DATES.IN_ONE_HOUR,
  attemptCount: 5,
  ...overrides,
});

describe('AccountLockVO', () => {
  describe('create()', () => {
    it('should create valid', () => {
      const vo = AccountLockVO.create(makeProps());
      expect(vo.attemptCount).toBe(5);
      expect(vo.reason.value).toBe('too_many_attempts');
    });

    it('should throw when attemptCount < 1', () => {
      expect(() => AccountLockVO.create(makeProps({ attemptCount: 0 }))).toThrow(ValidationError);
    });

    it('should throw when lockedUntil <= lockedAt', () => {
      expect(() =>
        AccountLockVO.create(
          makeProps({
            lockedAt: TEST_DATES.NOW,
            lockedUntil: TEST_DATES.PAST_EXPIRY,
          }),
        ),
      ).toThrow(ValidationError);
    });

    it('should freeze', () => {
      expect(Object.isFrozen(AccountLockVO.create(makeProps()))).toBe(true);
    });
  });

  describe('isActive() / isExpired()', () => {
    it('isActive for future lockedUntil', () => {
      const vo = AccountLockVO.create(makeProps());
      expect(vo.isActive()).toBe(true);
      expect(vo.isExpired()).toBe(false);
    });

    it('isExpired for past lockedUntil', () => {
      const vo = AccountLockVO.create(
        makeProps({
          lockedAt: TEST_DATES.NOW,
          lockedUntil: new Date(Date.now() + 5000).toISOString(),
        }),
      );
      expect(vo.isExpired(Date.now() + 10000)).toBe(true);
    });

    it('isActive false when unlockedAt set', () => {
      const vo = AccountLockVO.create(makeProps({ unlockedAt: TEST_DATES.NOW }));
      expect(vo.isActive()).toBe(false);
    });
  });

  describe('reconstitute()', () => {
    it('should skip validation', () => {
      const vo = AccountLockVO.reconstitute(makeProps({ attemptCount: 0 }));
      expect(vo.attemptCount).toBe(0);
    });
  });
});

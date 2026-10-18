/**
 * AccountLockEntity unit tests
 */
import { describe, it, expect } from '@jest/globals';
import { AccountLockEntity } from '@domain/entities/account-lock.entity.js';
import { BusinessRuleError } from '@vubon/shared-kernel/domain/errors/business-rule.error';
import {
  TEST_IDS,
  TEST_DATES,
  makeAccountLockEntity,
  activeAccountLock,
  expiredAccountLock,
  unlockedAccountLock,
  createNewAccountLock,
} from '@fixtures/index';

describe('AccountLockEntity', () => {
  describe('create()', () => {
    it('should emit locked event', () => {
      const l = createNewAccountLock();
      expect(l.version).toBe(1);
      const events = l.pullDomainEvents();
      expect(events.some((e) => e.type === 'account_lock.locked')).toBe(true);
    });
  });

  describe('isActive() / isExpired()', () => {
    it('isActive for future + not unlocked', () => {
      expect(activeAccountLock().isActive()).toBe(true);
    });

    it('isActive false when unlocked', () => {
      expect(unlockedAccountLock().isActive()).toBe(false);
    });

    it('isExpired for past', () => {
      const l = activeAccountLock();
      const farFuture = Date.now() + 24 * 3600 * 1000;
      expect(l.isExpired(farFuture)).toBe(true);
    });
  });

  describe('unlock()', () => {
    it('should set unlockedAt + emit event', () => {
      const l = activeAccountLock();
      l.pullDomainEvents();
      l.unlock(TEST_IDS.USER_ID);
      expect(l.unlockedAt).toBeDefined();
      expect(l.unlockedBy).toBe(TEST_IDS.USER_ID);
      const events = l.pullDomainEvents();
      expect(events.some((e) => e.type === 'account_lock.unlocked')).toBe(true);
    });

    it('should throw when already unlocked', () => {
      const l = unlockedAccountLock();
      expect(() => l.unlock()).toThrow(BusinessRuleError);
    });
  });
});

/**
 * AccountLockPolicyService unit tests
 */
import { describe, it, expect } from '@jest/globals';
import { AccountLockPolicyService } from '@domain/services/account-lock-policy.service.js';

describe('AccountLockPolicyService', () => {
  describe('config getters', () => {
    it('should return positive', () => {
      expect(AccountLockPolicyService.lockoutDurationSeconds()).toBeGreaterThan(0);
      expect(AccountLockPolicyService.maxAttempts()).toBeGreaterThan(0);
      expect(AccountLockPolicyService.maxAttemptsPerIp()).toBeGreaterThan(0);
    });
  });

  describe('decide()', () => {
    it('should not lock below threshold', () => {
      const r = AccountLockPolicyService.decide(2);
      expect(r.shouldLock).toBe(false);
      expect(r.lockDurationSeconds).toBe(0);
    });

    it('should lock at threshold', () => {
      const r = AccountLockPolicyService.decide(AccountLockPolicyService.maxAttempts());
      expect(r.shouldLock).toBe(true);
      expect(r.lockDurationSeconds).toBeGreaterThan(0);
      expect(r.reason).toBe('too_many_attempts');
    });

    it('should lock above threshold', () => {
      const r = AccountLockPolicyService.decide(100);
      expect(r.shouldLock).toBe(true);
    });
  });

  describe('progressiveDuration()', () => {
    it('should increase exponentially', () => {
      const l1 = AccountLockPolicyService.progressiveDuration(1);
      const l2 = AccountLockPolicyService.progressiveDuration(2);
      const l3 = AccountLockPolicyService.progressiveDuration(3);
      expect(l2).toBeGreaterThan(l1);
      expect(l3).toBeGreaterThan(l2);
    });

    it('should cap at max', () => {
      const l10 = AccountLockPolicyService.progressiveDuration(10);
      const l20 = AccountLockPolicyService.progressiveDuration(20);
      expect(l10).toBe(l20);
    });
  });

  describe('isAutoUnlockEnabled()', () => {
    it('should return boolean', () => {
      expect(typeof AccountLockPolicyService.isAutoUnlockEnabled()).toBe('boolean');
    });
  });
});

/**
 * LoginAttemptTrackerService unit tests
 */
import { describe, it, expect } from '@jest/globals';
import { LoginAttemptTrackerService } from '@domain/services/login-attempt-tracker.service.js';
import { BusinessRuleError } from '@vubon/shared-kernel/domain/errors/business-rule.error';

describe('LoginAttemptTrackerService', () => {
  describe('config getters', () => {
    it('should return positive', () => {
      expect(LoginAttemptTrackerService.maxAttempts()).toBeGreaterThan(0);
      expect(LoginAttemptTrackerService.maxAttemptsPerIp()).toBeGreaterThan(0);
      expect(LoginAttemptTrackerService.lockoutSeconds()).toBeGreaterThan(0);
      expect(LoginAttemptTrackerService.windowSeconds()).toBeGreaterThan(0);
    });
  });

  describe('countFailures()', () => {
    it('should count failures within window', () => {
      const now = Date.now();
      const attempts = [
        { atMs: now - 1000, success: false },
        { atMs: now - 2000, success: false },
        { atMs: now - 3000, success: true },
      ];
      expect(LoginAttemptTrackerService.countFailures(attempts, now)).toBe(2);
    });

    it('should exclude attempts outside window', () => {
      const now = Date.now();
      const windowMs = LoginAttemptTrackerService.windowSeconds() * 1000;
      const attempts = [
        { atMs: now - windowMs - 1000, success: false },
        { atMs: now - 1000, success: false },
      ];
      expect(LoginAttemptTrackerService.countFailures(attempts, now)).toBe(1);
    });

    it('empty attempts → 0', () => {
      expect(LoginAttemptTrackerService.countFailures([], Date.now())).toBe(0);
    });
  });

  describe('assertNotLocked()', () => {
    it('should pass below threshold', () => {
      const now = Date.now();
      const attempts = [
        { atMs: now - 1000, success: false },
        { atMs: now - 2000, success: false },
      ];
      expect(() => LoginAttemptTrackerService.assertNotLocked(attempts, now)).not.toThrow();
    });

    it('should throw at threshold', () => {
      const now = Date.now();
      const max = LoginAttemptTrackerService.maxAttempts();
      const attempts = Array.from({ length: max }, (_, i) => ({
        atMs: now - i * 100,
        success: false,
      }));
      expect(() => LoginAttemptTrackerService.assertNotLocked(attempts, now)).toThrow(
        BusinessRuleError,
      );
    });
  });

  describe('shouldResetOnSuccess()', () => {
    it('should return boolean', () => {
      expect(typeof LoginAttemptTrackerService.shouldResetOnSuccess()).toBe('boolean');
    });
  });

  describe('computeLockUntil()', () => {
    it('should be future', () => {
      const now = Date.now();
      const until = LoginAttemptTrackerService.computeLockUntil(now);
      expect(until).toBeGreaterThan(now);
      expect(until - now).toBe(LoginAttemptTrackerService.lockoutSeconds() * 1000);
    });
  });

  describe('isLockedOut()', () => {
    it('false below threshold', () => {
      const attempts = [{ atMs: Date.now(), success: false }];
      expect(LoginAttemptTrackerService.isLockedOut(attempts)).toBe(false);
    });

    it('true at threshold', () => {
      const now = Date.now();
      const max = LoginAttemptTrackerService.maxAttempts();
      const attempts = Array.from({ length: max }, (_, i) => ({
        atMs: now - i * 100,
        success: false,
      }));
      expect(LoginAttemptTrackerService.isLockedOut(attempts, now)).toBe(true);
    });
  });
});

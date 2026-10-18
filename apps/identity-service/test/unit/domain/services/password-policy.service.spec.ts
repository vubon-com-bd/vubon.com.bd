/**
 * PasswordPolicyService unit tests
 */
import { describe, it, expect } from '@jest/globals';
import { PasswordPolicyService } from '@domain/services/password-policy.service.js';

describe('PasswordPolicyService', () => {
  describe('current()', () => {
    it('should return policy with all fields', () => {
      const p = PasswordPolicyService.current();
      expect(p.minLength).toBeGreaterThan(0);
      expect(p.maxLength).toBeGreaterThan(p.minLength);
      expect(typeof p.requireUppercase).toBe('boolean');
      expect(p.historyCount).toBeGreaterThan(0);
      expect(p.bcryptRounds).toBeGreaterThan(0);
    });
  });

  describe('bcryptRounds()', () => {
    it('should be within min/max bounds', () => {
      const rounds = PasswordPolicyService.bcryptRounds();
      expect(rounds).toBeGreaterThanOrEqual(10);
      expect(rounds).toBeLessThanOrEqual(15);
    });
  });

  describe('expiryDate()', () => {
    it('should return future date', () => {
      const d = PasswordPolicyService.expiryDate();
      expect(d.getTime()).toBeGreaterThan(Date.now());
    });

    it('should respect nowMs param', () => {
      const now = 1000000000000;
      const d = PasswordPolicyService.expiryDate(now);
      const expected = now + 90 * 24 * 3600 * 1000;
      expect(d.getTime()).toBe(expected);
    });
  });

  describe('historyLimit()', () => {
    it('should return positive', () => {
      expect(PasswordPolicyService.historyLimit()).toBeGreaterThan(0);
    });
  });

  describe('resetTokenExpirySeconds()', () => {
    it('should return positive', () => {
      expect(PasswordPolicyService.resetTokenExpirySeconds()).toBeGreaterThan(0);
    });
  });

  describe('maxResetAttempts()', () => {
    it('should return positive', () => {
      expect(PasswordPolicyService.maxResetAttempts()).toBeGreaterThan(0);
    });
  });
});

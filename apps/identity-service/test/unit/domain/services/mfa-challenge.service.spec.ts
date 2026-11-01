/**
 * MfaChallengeService unit tests
 */
import { describe, it, expect } from '@jest/globals';
import { MfaChallengeService } from '@domain/services/mfa-challenge.service.js';
import { BusinessRuleError } from '@vubon/shared-kernel/domain/errors/business-rule.error';

describe('MfaChallengeService', () => {
  describe('config getters', () => {
    it('should return positive values', () => {
      expect(MfaChallengeService.otpLength()).toBeGreaterThan(0);
      expect(MfaChallengeService.otpExpirySeconds()).toBeGreaterThan(0);
      expect(MfaChallengeService.maxAttempts()).toBeGreaterThan(0);
      expect(MfaChallengeService.backupCodesCount()).toBeGreaterThan(0);
      expect(MfaChallengeService.backupCodeLength()).toBeGreaterThan(0);
      expect(MfaChallengeService.totpPeriod()).toBe(30);
      expect(MfaChallengeService.totpDigits()).toBeGreaterThan(0);
      expect(MfaChallengeService.totpAlgorithm()).toBeDefined();
    });
  });

  describe('recordAttempt()', () => {
    it('should increment attempts', () => {
      const c = { attempts: 0, maxAttempts: 5, expiresAtMs: Date.now() + 60000 };
      const next = MfaChallengeService.recordAttempt(c);
      expect(next.attempts).toBe(1);
    });

    it('should throw on expired challenge', () => {
      const c = { attempts: 0, maxAttempts: 5, expiresAtMs: Date.now() - 1 };
      expect(() => MfaChallengeService.recordAttempt(c)).toThrow(BusinessRuleError);
    });

    it('should throw when max attempts reached', () => {
      const c = { attempts: 4, maxAttempts: 5, expiresAtMs: Date.now() + 60000 };
      expect(() => MfaChallengeService.recordAttempt(c)).toThrow(BusinessRuleError);
    });
  });

  describe('isChallengeActive()', () => {
    it('true when valid', () => {
      const c = { attempts: 1, maxAttempts: 5, expiresAtMs: Date.now() + 60000 };
      expect(MfaChallengeService.isChallengeActive(c)).toBe(true);
    });

    it('false when expired', () => {
      const c = { attempts: 1, maxAttempts: 5, expiresAtMs: Date.now() - 1 };
      expect(MfaChallengeService.isChallengeActive(c)).toBe(false);
    });

    it('false when max attempts', () => {
      const c = { attempts: 5, maxAttempts: 5, expiresAtMs: Date.now() + 60000 };
      expect(MfaChallengeService.isChallengeActive(c)).toBe(false);
    });
  });

  describe('challengeExpiresAt()', () => {
    it('should be future', () => {
      const d = MfaChallengeService.challengeExpiresAt();
      expect(d.getTime()).toBeGreaterThan(Date.now());
    });
  });

  describe('isBackupLow()', () => {
    it('true when low', () => {
      expect(MfaChallengeService.isBackupLow(2)).toBe(true);
      expect(MfaChallengeService.isBackupLow(1)).toBe(true);
      expect(MfaChallengeService.isBackupLow(0)).toBe(true);
      expect(MfaChallengeService.isBackupLow(5)).toBe(false);
    });
  });

  describe('isStrongMethod()', () => {
    it('totp + webauthn are strong', () => {
      expect(MfaChallengeService.isStrongMethod('totp')).toBe(true);
      expect(MfaChallengeService.isStrongMethod('webauthn')).toBe(true);
      expect(MfaChallengeService.isStrongMethod('sms')).toBe(false);
      expect(MfaChallengeService.isStrongMethod('email')).toBe(false);
    });
  });
});

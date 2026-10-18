/**
 * OtpGeneratorService unit tests
 */
import { describe, it, expect } from '@jest/globals';
import { OtpGeneratorService } from '@domain/services/otp-generator.service.js';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

describe('OtpGeneratorService', () => {
  describe('config getters', () => {
    it('should return positive', () => {
      expect(OtpGeneratorService.length()).toBeGreaterThan(0);
      expect(OtpGeneratorService.expirySeconds()).toBeGreaterThan(0);
      expect(OtpGeneratorService.resendCooldownSeconds()).toBeGreaterThan(0);
      expect(OtpGeneratorService.maxAttempts()).toBeGreaterThan(0);
      expect(OtpGeneratorService.maxResend()).toBeGreaterThan(0);
    });
  });

  describe('generate()', () => {
    it('should produce correct length', () => {
      const otp = OtpGeneratorService.generate();
      expect(otp.length).toBe(OtpGeneratorService.length());
    });

    it('should be all digits', () => {
      for (let i = 0; i < 10; i++) {
        expect(OtpGeneratorService.generate()).toMatch(/^\d+$/);
      }
    });

    it('should never start with 0', () => {
      for (let i = 0; i < 20; i++) {
        expect(OtpGeneratorService.generate()[0]).not.toBe('0');
      }
    });

    it('should reject invalid length', () => {
      expect(() => OtpGeneratorService.generate(3)).toThrow(ValidationError);
      expect(() => OtpGeneratorService.generate(9)).toThrow(ValidationError);
    });

    it('should accept 4-8 length', () => {
      expect(OtpGeneratorService.generate(4).length).toBe(4);
      expect(OtpGeneratorService.generate(8).length).toBe(8);
    });
  });

  describe('expiresAt()', () => {
    it('should be future', () => {
      const d = OtpGeneratorService.expiresAt();
      expect(d.getTime()).toBeGreaterThan(Date.now());
    });
  });

  describe('canResend()', () => {
    it('true below max', () => {
      expect(OtpGeneratorService.canResend(0)).toBe(true);
      expect(OtpGeneratorService.canResend(1)).toBe(true);
    });

    it('false at max', () => {
      expect(OtpGeneratorService.canResend(OtpGeneratorService.maxResend())).toBe(false);
    });
  });

  describe('cooldownRemainingSeconds()', () => {
    it('should return remaining', () => {
      const now = Date.now();
      const justSent = now;
      const remaining = OtpGeneratorService.cooldownRemainingSeconds(justSent, now);
      expect(remaining).toBeLessThanOrEqual(OtpGeneratorService.resendCooldownSeconds());
      expect(remaining).toBeGreaterThanOrEqual(0);
    });

    it('should be 0 after cooldown', () => {
      const now = Date.now();
      const longAgo = now - 3600_000;
      expect(OtpGeneratorService.cooldownRemainingSeconds(longAgo, now)).toBe(0);
    });
  });
});

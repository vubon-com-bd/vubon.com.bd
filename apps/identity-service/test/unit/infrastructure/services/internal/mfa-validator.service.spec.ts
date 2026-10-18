/**
 * MfaValidatorService tests
 */
import { describe, it, expect } from '@jest/globals';
import { MfaValidatorService } from '@infrastructure/services/internal/mfa-validator.service.js';

describe('MfaValidatorService', () => {
  const service = new MfaValidatorService();

  describe('validate()', () => {
    it('should accept valid 6-digit code', () => {
      expect(service.validate('SECRET', '123456')).toBe(true);
    });

    it('should reject short code', () => {
      expect(service.validate('SECRET', '12345')).toBe(false);
    });

    it('should reject non-numeric', () => {
      expect(service.validate('SECRET', 'abcdef')).toBe(false);
    });

    it('should reject empty', () => {
      expect(service.validate('SECRET', '')).toBe(false);
    });
  });

  describe('validateBackupCode()', () => {
    it('should accept 10-char backup code', () => {
      expect(service.validateBackupCode('ABCD1234EF')).toBe(true);
    });

    it('should reject short backup code', () => {
      expect(service.validateBackupCode('SHORT')).toBe(false);
    });

    it('should reject empty', () => {
      expect(service.validateBackupCode('')).toBe(false);
    });
  });

  describe('generateSecret()', () => {
    it('should generate base32 secret', () => {
      const s = service.generateSecret();
      expect(s).toMatch(/^[A-Z2-7]+$/);
      expect(s.length).toBe(32);
    });
  });

  describe('buildOtpAuthUrl()', () => {
    it('should produce otpauth URL', () => {
      const url = service.buildOtpAuthUrl('SECRET', 'user@vubon.com.bd');
      expect(url).toContain('otpauth://totp/');
      expect(url).toContain('SECRET');
      expect(url).toContain('user%40vubon.com.bd');
    });
  });
});

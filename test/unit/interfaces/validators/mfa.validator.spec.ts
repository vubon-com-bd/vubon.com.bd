/**
 * MfaHttpValidator tests
 */
import { describe, it, expect } from '@jest/globals';
import { BadRequestException } from '@nestjs/common';
import { MfaHttpValidator } from '@interfaces/validators/mfa.validator.js';

describe('MfaHttpValidator', () => {
  describe('validateEnable()', () => {
    it('should pass valid enable', () => {
      expect(() =>
        MfaHttpValidator.validateEnable({ method: 'totp', code: '123456' }),
      ).not.toThrow();
    });

    it('should reject invalid method', () => {
      expect(() =>
        MfaHttpValidator.validateEnable({ method: 'fax', code: '123456' }),
      ).toThrow(BadRequestException);
    });

    it('should reject non-6-digit code', () => {
      expect(() =>
        MfaHttpValidator.validateEnable({ method: 'totp', code: '12345' }),
      ).toThrow(BadRequestException);
    });
  });

  describe('validateDisable()', () => {
    it('should pass valid disable', () => {
      expect(() =>
        MfaHttpValidator.validateDisable({ password: 'StrongP@ss123' }),
      ).not.toThrow();
    });

    it('should reject empty password', () => {
      expect(() =>
        MfaHttpValidator.validateDisable({ password: '' }),
      ).toThrow(BadRequestException);
    });
  });

  describe('validateVerify()', () => {
    it('should pass valid verify', () => {
      expect(() =>
        MfaHttpValidator.validateVerify({
          challengeId: '11111111-1111-4111-8111-111111111111',
          code: '123456',
          method: 'totp',
        }),
      ).not.toThrow();
    });

    it('should reject invalid challengeId', () => {
      expect(() =>
        MfaHttpValidator.validateVerify({
          challengeId: 'not-uuid',
          code: '123456',
          method: 'totp',
        }),
      ).toThrow(BadRequestException);
    });
  });

  describe('validateBackupCode()', () => {
    it('should pass valid backup code', () => {
      expect(() =>
        MfaHttpValidator.validateBackupCode({
          challengeId: '11111111-1111-4111-8111-111111111111',
          code: 'ABCD1234EF',
        }),
      ).not.toThrow();
    });
  });

  describe('validateSetup()', () => {
    it('should pass valid setup', () => {
      expect(() => MfaHttpValidator.validateSetup({ method: 'totp' })).not.toThrow();
    });
  });
});

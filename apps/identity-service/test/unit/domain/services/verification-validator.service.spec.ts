/**
 * VerificationValidatorService unit tests
 */
import { describe, it, expect } from '@jest/globals';
import { VerificationValidatorService } from '@domain/services/verification-validator.service.js';
import { BusinessRuleError } from '@vubon/shared-kernel/domain/errors/business-rule.error';

describe('VerificationValidatorService', () => {
  describe('assertValid()', () => {
    it('should pass on correct code', () => {
      const r = {
        code: '123456',
        expectedCode: '123456',
        expiresAtMs: Date.now() + 60000,
        attempts: 0,
        maxAttempts: 5,
      };
      expect(() => VerificationValidatorService.assertValid(r)).not.toThrow();
    });

    it('should throw on expired', () => {
      const r = {
        code: '123456',
        expectedCode: '123456',
        expiresAtMs: Date.now() - 1,
        attempts: 0,
        maxAttempts: 5,
      };
      expect(() => VerificationValidatorService.assertValid(r)).toThrow(BusinessRuleError);
    });

    it('should throw on max attempts', () => {
      const r = {
        code: '123456',
        expectedCode: '123456',
        expiresAtMs: Date.now() + 60000,
        attempts: 5,
        maxAttempts: 5,
      };
      expect(() => VerificationValidatorService.assertValid(r)).toThrow(BusinessRuleError);
    });

    it('should throw on wrong code', () => {
      const r = {
        code: '999999',
        expectedCode: '123456',
        expiresAtMs: Date.now() + 60000,
        attempts: 0,
        maxAttempts: 5,
      };
      expect(() => VerificationValidatorService.assertValid(r)).toThrow(BusinessRuleError);
    });
  });

  describe('isExpired()', () => {
    it('false for future', () => {
      expect(VerificationValidatorService.isExpired(Date.now() + 60000)).toBe(false);
    });

    it('true for past', () => {
      expect(VerificationValidatorService.isExpired(Date.now() - 1)).toBe(true);
    });
  });

  describe('remainingAttempts()', () => {
    it('should return correct count', () => {
      expect(VerificationValidatorService.remainingAttempts(0, 5)).toBe(5);
      expect(VerificationValidatorService.remainingAttempts(3, 5)).toBe(2);
    });

    it('should not go below 0', () => {
      expect(VerificationValidatorService.remainingAttempts(10, 5)).toBe(0);
    });
  });
});

/**
 * CredentialValidatorService unit tests
 */
import { describe, it, expect } from '@jest/globals';
import { CredentialValidatorService } from '@domain/services/credential-validator.service.js';
import { BusinessRuleError } from '@vubon/shared-kernel/domain/errors/business-rule.error';

describe('CredentialValidatorService', () => {
  describe('validatePassword()', () => {
    it('should reject empty', () => {
      const r = CredentialValidatorService.validatePassword('');
      expect(r.valid).toBe(false);
      expect(r.strength).toBe('weak');
      expect(r.reasons).toContain('empty');
    });

    it('should reject too short', () => {
      const r = CredentialValidatorService.validatePassword('Ab1@');
      expect(r.valid).toBe(false);
      expect(r.reasons).toContain('too_short');
    });

    it('should reject no uppercase', () => {
      const r = CredentialValidatorService.validatePassword('testpass@123');
      expect(r.valid).toBe(false);
      expect(r.reasons).toContain('no_uppercase');
    });

    it('should reject no lowercase', () => {
      const r = CredentialValidatorService.validatePassword('TESTPASS@123');
      expect(r.valid).toBe(false);
      expect(r.reasons).toContain('no_lowercase');
    });

    it('should reject no number', () => {
      const r = CredentialValidatorService.validatePassword('TestPass@abc');
      expect(r.valid).toBe(false);
      expect(r.reasons).toContain('no_number');
    });

    it('should reject no symbol', () => {
      const r = CredentialValidatorService.validatePassword('TestPass1234');
      expect(r.valid).toBe(false);
      expect(r.reasons).toContain('no_symbol');
    });

    it('should accept strong password', () => {
      const r = CredentialValidatorService.validatePassword('TestPass@1234');
      expect(r.valid).toBe(true);
      expect(r.score).toBeGreaterThanOrEqual(60);
    });

    it('should give higher score for longer', () => {
      const short = CredentialValidatorService.validatePassword('Aa1@aaaa');
      const long = CredentialValidatorService.validatePassword('Aa1@aaaaBBBB2222####');
      expect(long.score).toBeGreaterThan(short.score);
    });

    it('should penalize repeats', () => {
      const repeated = CredentialValidatorService.validatePassword('Aaa1234@bbbb');
      const varied = CredentialValidatorService.validatePassword('Abc1234@xyzq');
      expect(varied.score).toBeGreaterThanOrEqual(repeated.score);
    });

    it('should penalize common sequences', () => {
      const seq = CredentialValidatorService.validatePassword('Test1234@abcd');
      const varied = CredentialValidatorService.validatePassword('Test5729@kpwm');
      expect(varied.score).toBeGreaterThan(seq.score);
    });

    it('should map score to strength', () => {
      const weak = CredentialValidatorService.validatePassword('abc');
      expect(weak.strength).toBe('weak');

      const strong = CredentialValidatorService.validatePassword('VeryStr0ng!Pass@2024');
      expect(['strong', 'very_strong']).toContain(strong.strength);
    });
  });

  describe('enforcePasswordPolicy()', () => {
    it('should not throw on valid', () => {
      expect(() =>
        CredentialValidatorService.enforcePasswordPolicy('TestPass@1234'),
      ).not.toThrow();
    });

    it('should throw BusinessRuleError on invalid', () => {
      expect(() =>
        CredentialValidatorService.enforcePasswordPolicy('weak'),
      ).toThrow(BusinessRuleError);
    });
  });

  describe('isInHistory()', () => {
    it('should detect', () => {
      expect(CredentialValidatorService.isInHistory('hash-a', ['hash-a', 'hash-b'])).toBe(true);
      expect(CredentialValidatorService.isInHistory('hash-c', ['hash-a', 'hash-b'])).toBe(false);
    });

    it('empty history', () => {
      expect(CredentialValidatorService.isInHistory('x', [])).toBe(false);
    });
  });
});

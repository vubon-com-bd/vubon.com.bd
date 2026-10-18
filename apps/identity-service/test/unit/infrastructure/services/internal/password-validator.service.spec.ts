/**
 * PasswordValidatorService unit tests
 */
import { describe, it, expect, beforeEach } from '@jest/globals';
import { PasswordValidatorService } from '@infrastructure/services/internal/password-validator.service.js';
import { PasswordTooWeakError } from '@domain/errors/credential.errors.js';

describe('PasswordValidatorService', () => {
  let service: PasswordValidatorService;

  beforeEach(() => {
    service = new PasswordValidatorService();
  });

  describe('validate()', () => {
    it('valid strong password', () => {
      const result = service.validate('StrongPass@1234');
      expect(result.valid).toBe(true);
      expect(result.reasons).toEqual([]);
    });

    it('rejects empty password', () => {
      const result = service.validate('');
      expect(result.valid).toBe(false);
      expect(result.reasons).toContain('empty');
    });

    it('rejects non-string', () => {
      const result = service.validate(null as never);
      expect(result.valid).toBe(false);
    });

    it('rejects too-short password', () => {
      expect(service.validate('Ab@1').reasons).toContain('too_short');
    });

    it('rejects too-long password', () => {
      const long = 'Aa1@' + 'x'.repeat(200);
      expect(service.validate(long).reasons).toContain('too_long');
    });

    it('rejects no lowercase', () => {
      expect(service.validate('ABC123!@#').reasons).toContain('no_lowercase');
    });

    it('rejects no uppercase', () => {
      expect(service.validate('abc123!@#').reasons).toContain('no_uppercase');
    });

    it('rejects no number', () => {
      expect(service.validate('AbcDef!@#').reasons).toContain('no_number');
    });

    it('rejects no symbol', () => {
      expect(service.validate('AbcDef123').reasons).toContain('no_symbol');
    });

    it('rejects not strong per regex', () => {
      expect(service.validate('Aa1@').reasons).toContain('not_strong');
    });
  });

  describe('assertValid()', () => {
    it('no-throw on strong', () => {
      expect(() => service.assertValid('StrongPass@1234')).not.toThrow();
    });

    it('throws PasswordTooWeakError on weak', () => {
      expect(() => service.assertValid('weak')).toThrow(PasswordTooWeakError);
    });
  });

  describe('isStrong()', () => {
    it('true for strong', () => {
      expect(service.isStrong('StrongPass@1234')).toBe(true);
    });
    it('false for weak', () => {
      expect(service.isStrong('weak')).toBe(false);
    });
  });
});

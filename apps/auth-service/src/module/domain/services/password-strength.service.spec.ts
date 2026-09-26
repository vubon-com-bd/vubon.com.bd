/**
 * PasswordStrengthService — Unit Tests
 * @module auth-service/domain/services
 */
import { PasswordStrengthService } from './password-strength.service';
import { WeakPasswordError } from '../errors/password.errors';

describe('PasswordStrengthService', () => {
  // ═══════════════════════════════════════════════════════════
  // estimateEntropyBits
  // ═══════════════════════════════════════════════════════════

  describe('estimateEntropyBits()', () => {
    it('should return 0 for empty password', () => {
      expect(PasswordStrengthService.estimateEntropyBits('')).toBe(0);
    });

    it('should return higher bits for longer passwords', () => {
      const short = PasswordStrengthService.estimateEntropyBits('abc');
      const long = PasswordStrengthService.estimateEntropyBits('abcdefghijklmno');
      expect(long).toBeGreaterThan(short);
    });

    it('should return higher bits for mixed character sets', () => {
      const onlyLower = PasswordStrengthService.estimateEntropyBits('abcdefgh');
      const mixed = PasswordStrengthService.estimateEntropyBits('aBcD1!@#');
      expect(mixed).toBeGreaterThan(onlyLower);
    });
  });

  // ═══════════════════════════════════════════════════════════
  // score
  // ═══════════════════════════════════════════════════════════

  describe('score()', () => {
    it('should return a report object', () => {
      const report = PasswordStrengthService.score('TestP@ss123');
      expect(report).toHaveProperty('score');
      expect(report).toHaveProperty('entropyBits');
      expect(report).toHaveProperty('isStrong');
      expect(report).toHaveProperty('missing');
      expect(report).toHaveProperty('suggestions');
    });

    it('should score weak password low', () => {
      const report = PasswordStrengthService.score('abc');
      expect(report.score).toBeLessThan(50);
      expect(report.isStrong).toBe(false);
    });

    it('should score strong password high', () => {
      const report = PasswordStrengthService.score('Str0ng!P@ssw0rd#2024');
      expect(report.score).toBeGreaterThanOrEqual(50);
      expect(report.isStrong).toBe(true);
    });

    it('should list missing requirements for weak password', () => {
      const report = PasswordStrengthService.score('abc');
      expect(report.missing.length).toBeGreaterThan(0);
    });

    it('should cap score at 100', () => {
      const report = PasswordStrengthService.score(
        'SuperStr0ng!P@ssw0rd#WithManyExtraCharacters1234567890',
      );
      expect(report.score).toBeLessThanOrEqual(100);
    });

    it('should cap score at 20 for known weak password', () => {
      const report = PasswordStrengthService.score('password');
      expect(report.score).toBeLessThanOrEqual(20);
    });

    it('should suggest avoiding repeated characters', () => {
      const report = PasswordStrengthService.score('aaaBBBccc!111');
      expect(report.suggestions.some((s) => s.includes('repeated'))).toBe(true);
    });

    it('should suggest avoiding keyboard sequences', () => {
      const report = PasswordStrengthService.score('qwertyPass123!');
      expect(report.suggestions.some((s) => s.includes('keyboard'))).toBe(true);
    });
  });

  // ═══════════════════════════════════════════════════════════
  // validate
  // ═══════════════════════════════════════════════════════════

  describe('validate()', () => {
    it('should not throw for strong password', () => {
      expect(() =>
        PasswordStrengthService.validate('Str0ng!P@ssw0rd#2024'),
      ).not.toThrow();
    });

    it('should throw WeakPasswordError for weak password', () => {
      expect(() => PasswordStrengthService.validate('abc')).toThrow(WeakPasswordError);
    });

    it('should throw for common weak password', () => {
      expect(() => PasswordStrengthService.validate('password')).toThrow(WeakPasswordError);
    });

    it('should throw for empty string', () => {
      expect(() => PasswordStrengthService.validate('')).toThrow(WeakPasswordError);
    });
  });
});

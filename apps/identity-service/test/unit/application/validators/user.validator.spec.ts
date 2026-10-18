import { describe, it, expect } from '@jest/globals';
import { UserValidator } from '@application/validators/user.validator.js';
import { TEST_EMAIL, TEST_PASSWORD_PLAIN } from '@fixtures/index.js';

describe('UserValidator', () => {
  describe('validateCreate()', () => {
    it('accepts valid create input', () => {
      const r = UserValidator.validateCreate({
        email: TEST_EMAIL, password: TEST_PASSWORD_PLAIN,
        type: 'individual', acceptTerms: true,
      });
      expect(r.email).toBe(TEST_EMAIL);
    });
    it('throws on missing acceptTerms', () => {
      expect(() => UserValidator.validateCreate({
        email: TEST_EMAIL, password: TEST_PASSWORD_PLAIN, type: 'individual',
      })).toThrow();
    });
    it('throws on empty input', () => {
      expect(() => UserValidator.validateCreate({})).toThrow();
    });
  });

  describe('validateCreateSafe()', () => {
    it('success=false on invalid', () => {
      expect(UserValidator.validateCreateSafe({}).success).toBe(false);
    });
    it('success=true on valid', () => {
      expect(UserValidator.validateCreateSafe({
        email: TEST_EMAIL, password: TEST_PASSWORD_PLAIN, type: 'individual', acceptTerms: true,
      }).success).toBe(true);
    });
  });

  describe('validateUpdate()', () => {
    it('accepts valid username', () => {
      expect(UserValidator.validateUpdate({ username: 'validuser123' })).toBeDefined();
    });
    it('throws on invalid username type', () => {
      expect(() => UserValidator.validateUpdate({ username: 123 })).toThrow();
    });
  });

  describe('validateUpdateSafe()', () => {
    it('success=false on invalid', () => {
      expect(UserValidator.validateUpdateSafe({ username: 123 }).success).toBe(false);
    });
    it('success=true on valid', () => {
      expect(UserValidator.validateUpdateSafe({ username: 'valid' }).success).toBe(true);
    });
  });
});

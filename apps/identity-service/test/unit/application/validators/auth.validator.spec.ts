import { describe, it, expect } from '@jest/globals';
import { AuthValidator } from '@application/validators/auth.validator.js';
import { TEST_EMAIL, TEST_PASSWORD_PLAIN } from '@fixtures/index.js';

describe('AuthValidator', () => {
  describe('validateLogin()', () => {
    it('accepts valid input', () => {
      const r = AuthValidator.validateLogin({ identifier: TEST_EMAIL, password: TEST_PASSWORD_PLAIN });
      expect(r.identifier).toBe(TEST_EMAIL);
    });
    it('throws on empty identifier', () => {
      expect(() => AuthValidator.validateLogin({ identifier: '', password: TEST_PASSWORD_PLAIN })).toThrow();
    });
    it('throws on missing password', () => {
      expect(() => AuthValidator.validateLogin({ identifier: TEST_EMAIL })).toThrow();
    });
  });

  describe('validateLoginSafe()', () => {
    it('success=false on invalid', () => {
      expect(AuthValidator.validateLoginSafe({}).success).toBe(false);
    });
    it('success=true on valid', () => {
      expect(AuthValidator.validateLoginSafe({ identifier: TEST_EMAIL, password: TEST_PASSWORD_PLAIN }).success).toBe(true);
    });
  });

  describe('validateRegister()', () => {
    it('rejects mismatched passwords', () => {
      expect(() => AuthValidator.validateRegister({
        email: TEST_EMAIL, password: 'Xyz@1234', confirmPassword: 'other',
      })).toThrow();
    });
  });

  describe('validateRegisterSafe()', () => {
    it('success=false on invalid', () => {
      expect(AuthValidator.validateRegisterSafe({}).success).toBe(false);
    });
  });

  describe('validateResetPassword()', () => {
    it('accepts valid reset input', () => {
      const r = AuthValidator.validateResetPassword({
        token: 'reset-token-abcdefghij',
        newPassword: TEST_PASSWORD_PLAIN,
        confirmPassword: TEST_PASSWORD_PLAIN,
      });
      expect(r.token).toBeDefined();
    });
  });
});

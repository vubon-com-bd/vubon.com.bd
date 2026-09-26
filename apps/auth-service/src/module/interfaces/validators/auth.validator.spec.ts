/**
 * AuthValidator (interface) — Unit Tests
 * @module auth-service/interfaces/validators
 *
 * Real schema-compliant test data:
 * - Password: 8-128 chars, matches /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,128}$/
 * - acceptTerms: literal true
 * - verifyEmail: uses token (not code)
 * - forgotPassword: identifier + optional channel
 */
import { AuthValidator } from './auth.validator';

const STRONG = 'Str0ng!Pass@2024';
const TOKEN = 'a'.repeat(64);

describe('AuthValidator', () => {
  // ═══════════════════════════════════════════════════════════
  // login
  // ═══════════════════════════════════════════════════════════

  describe('login()', () => {
    it('should parse valid email login', () => {
      const result = AuthValidator.login({
        identifier: 'john@example.com',
        password: 'Test1234!',
      });
      expect(result.identifier).toBe('john@example.com');
    });

    it('should accept phone identifier', () => {
      const result = AuthValidator.login({
        identifier: '+8801712345678',
        password: 'Test1234!',
      });
      expect(result.identifier).toBe('+8801712345678');
    });

    it('should throw on missing identifier', () => {
      expect(() => AuthValidator.login({ password: 'x' })).toThrow();
    });

    it('should throw on missing password', () => {
      expect(() => AuthValidator.login({ identifier: 'a@b.com' })).toThrow();
    });

    it('should accept rememberMe flag', () => {
      const result = AuthValidator.login({
        identifier: 'john@example.com',
        password: 'Test1234!',
        rememberMe: true,
      });
      expect(result.rememberMe).toBe(true);
    });
  });

  // ═══════════════════════════════════════════════════════════
  // register
  // ═══════════════════════════════════════════════════════════

  describe('register()', () => {
    const valid = {
      email: 'new@example.com',
      password: STRONG,
      confirmPassword: STRONG,
      acceptTerms: true as const,
    };

    it('should parse valid register input', () => {
      const result = AuthValidator.register(valid);
      expect(result.email).toBe('new@example.com');
    });

    it('should reject mismatched passwords', () => {
      expect(() =>
        AuthValidator.register({
          ...valid,
          confirmPassword: 'Different@1234',
        }),
      ).toThrow();
    });

    it('should reject false acceptTerms', () => {
      expect(() => AuthValidator.register({ ...valid, acceptTerms: false })).toThrow();
    });

    it('should accept optional firstName/lastName', () => {
      const result = AuthValidator.register({
        ...valid,
        firstName: 'John',
        lastName: 'Doe',
      });
      expect(result.firstName).toBe('John');
    });
  });

  // ═══════════════════════════════════════════════════════════
  // logout
  // ═══════════════════════════════════════════════════════════

  describe('logout()', () => {
    it('should accept empty object', () => {
      expect(() => AuthValidator.logout({})).not.toThrow();
    });
  });

  // ═══════════════════════════════════════════════════════════
  // refresh
  // ═══════════════════════════════════════════════════════════

  describe('refresh()', () => {
    it('should parse valid refresh input', () => {
      const result = AuthValidator.refresh({ refreshToken: TOKEN });
      expect(result.refreshToken.length).toBe(64);
    });

    it('should throw on missing token', () => {
      expect(() => AuthValidator.refresh({})).toThrow();
    });
  });

  // ═══════════════════════════════════════════════════════════
  // forgotPassword — identifier + channel
  // ═══════════════════════════════════════════════════════════

  describe('forgotPassword()', () => {
    it('should parse email identifier', () => {
      const result = AuthValidator.forgotPassword({
        identifier: 'john@example.com',
      });
      expect(result.identifier).toBe('john@example.com');
    });

    it('should default channel to email', () => {
      const result = AuthValidator.forgotPassword({
        identifier: 'john@example.com',
      });
      expect(result.channel).toBe('email');
    });

    it('should accept channel=sms', () => {
      const result = AuthValidator.forgotPassword({
        identifier: '+8801712345678',
        channel: 'sms',
      });
      expect(result.channel).toBe('sms');
    });

    it('should throw on missing identifier', () => {
      expect(() => AuthValidator.forgotPassword({})).toThrow();
    });
  });

  // ═══════════════════════════════════════════════════════════
  // resetPassword
  // ═══════════════════════════════════════════════════════════

  describe('resetPassword()', () => {
    const valid = {
      token: TOKEN,
      newPassword: STRONG,
      confirmPassword: STRONG,
    };

    it('should parse valid reset input', () => {
      const result = AuthValidator.resetPassword(valid);
      expect(result.newPassword).toBe(STRONG);
    });

    it('should reject mismatched passwords', () => {
      expect(() =>
        AuthValidator.resetPassword({
          ...valid,
          confirmPassword: 'Different@1234',
        }),
      ).toThrow();
    });

    it('should reject weak newPassword', () => {
      expect(() =>
        AuthValidator.resetPassword({
          ...valid,
          newPassword: 'weak',
          confirmPassword: 'weak',
        }),
      ).toThrow();
    });
  });

  // ═══════════════════════════════════════════════════════════
  // verifyEmail — REAL: email + token (NOT code)
  // ═══════════════════════════════════════════════════════════

  describe('verifyEmail()', () => {
    it('should parse valid token', () => {
      const result = AuthValidator.verifyEmail({
        email: 'john@example.com',
        token: 'verification-token-abc',
      });
      expect(result.token).toBe('verification-token-abc');
    });

    it('should throw on missing token', () => {
      expect(() =>
        AuthValidator.verifyEmail({ email: 'john@example.com' } as never),
      ).toThrow();
    });

    it('should throw on unrecognized code field (.strict)', () => {
      expect(() =>
        AuthValidator.verifyEmail({
          email: 'john@example.com',
          code: '123456',
        } as never),
      ).toThrow();
    });
  });
});

/**
 * AuthValidator — Unit Tests (Schema-aware)
 * @module auth-service/application/validators
 *
 * Tests verify the wrapper contract against the REAL shared-schemas.
 */
import { AuthValidator } from './auth.validator';

describe('AuthValidator', () => {
  // ═══════════════════════════════════════════════════════════
  // login — { identifier, password, rememberMe?, mfaCode? }
  // ═══════════════════════════════════════════════════════════

  describe('login()', () => {
    it('should accept valid email + password', () => {
      const r = AuthValidator.login({
        identifier: 'john@example.com',
        password: 'Test1234!',
      });
      expect(r.identifier).toBe('john@example.com');
    });

    it('should accept phone as identifier', () => {
      const r = AuthValidator.login({
        identifier: '+8801712345678',
        password: 'Test1234!',
      });
      expect(r.identifier).toBe('+8801712345678');
    });

    it('should reject empty identifier', () => {
      expect(() =>
        AuthValidator.login({ identifier: '', password: 'Test1234!' }),
      ).toThrow();
    });

    it('should reject empty password', () => {
      expect(() =>
        AuthValidator.login({ identifier: 'a@b.com', password: '' }),
      ).toThrow();
    });

    it('should default rememberMe to false', () => {
      const r = AuthValidator.login({
        identifier: 'john@example.com',
        password: 'Test1234!',
      });
      expect(r.rememberMe).toBe(false);
    });

    it('should accept rememberMe=true', () => {
      const r = AuthValidator.login({
        identifier: 'john@example.com',
        password: 'Test1234!',
        rememberMe: true,
      });
      expect(r.rememberMe).toBe(true);
    });

    it('should accept mfaCode (6 digits)', () => {
      const r = AuthValidator.login({
        identifier: 'john@example.com',
        password: 'Test1234!',
        mfaCode: '123456',
      });
      expect(r.mfaCode).toBe('123456');
    });

    it('should reject non-6-digit mfaCode', () => {
      expect(() =>
        AuthValidator.login({
          identifier: 'john@example.com',
          password: 'Test1234!',
          mfaCode: '12345',
        }),
      ).toThrow();
    });

    it('should reject unknown fields (strict)', () => {
      expect(() =>
        AuthValidator.login({
          identifier: 'a@b.com',
          password: 'Test1234!',
          maliciousField: 'x',
        }),
      ).toThrow();
    });
  });

  // ═══════════════════════════════════════════════════════════
  // register — { email, password, confirmPassword, acceptTerms: true }
  // ═══════════════════════════════════════════════════════════

  describe('register()', () => {
    const valid = {
      email: 'newuser@example.com',
      password: 'Str0ng!Pass#2024',
      confirmPassword: 'Str0ng!Pass#2024',
      acceptTerms: true as const,
    };

    it('should accept valid input', () => {
      const r = AuthValidator.register(valid);
      expect(r.email).toBe('newuser@example.com');
    });

    it('should reject mismatched passwords', () => {
      expect(() =>
        AuthValidator.register({ ...valid, confirmPassword: 'Different!1' }),
      ).toThrow();
    });

    it('should reject acceptTerms=false', () => {
      expect(() =>
        AuthValidator.register({ ...valid, acceptTerms: false }),
      ).toThrow();
    });

    it('should reject weak password', () => {
      expect(() =>
        AuthValidator.register({
          ...valid,
          password: 'weak',
          confirmPassword: 'weak',
        }),
      ).toThrow();
    });

    it('should accept optional phone', () => {
      const r = AuthValidator.register({ ...valid, phone: '+8801712345678' });
      expect(r.phone).toBe('+8801712345678');
    });

    it('should accept firstName/lastName', () => {
      const r = AuthValidator.register({ ...valid, firstName: 'John', lastName: 'Doe' });
      expect(r.firstName).toBe('John');
      expect(r.lastName).toBe('Doe');
    });

    it('should default acceptMarketing to false', () => {
      const r = AuthValidator.register(valid);
      expect(r.acceptMarketing).toBe(false);
    });
  });

  // ═══════════════════════════════════════════════════════════
  // refresh — { refreshToken, deviceId? }
  // ═══════════════════════════════════════════════════════════

  describe('refresh()', () => {
    it('should accept valid refresh token', () => {
      const r = AuthValidator.refresh({ refreshToken: 'a'.repeat(64) });
      expect(r.refreshToken.length).toBe(64);
    });

    it('should reject empty refresh token', () => {
      expect(() => AuthValidator.refresh({ refreshToken: '' })).toThrow();
    });

    it('should accept optional deviceId', () => {
      const r = AuthValidator.refresh({
        refreshToken: 'a'.repeat(64),
        deviceId: 'device-abc',
      });
      expect(r.deviceId).toBe('device-abc');
    });
  });

  // ═══════════════════════════════════════════════════════════
  // logout — { sessionId?, allDevices?, refreshToken? }
  // ═══════════════════════════════════════════════════════════

  describe('logout()', () => {
    it('should accept empty logout', () => {
      expect(() => AuthValidator.logout({})).not.toThrow();
    });

    it('should default allDevices to false', () => {
      const r = AuthValidator.logout({});
      expect(r.allDevices).toBe(false);
    });

    it('should accept allDevices=true', () => {
      const r = AuthValidator.logout({ allDevices: true });
      expect(r.allDevices).toBe(true);
    });
  });

  // ═══════════════════════════════════════════════════════════
  // forgotPassword — { identifier, channel? }
  // ═══════════════════════════════════════════════════════════

  describe('forgotPassword()', () => {
    it('should accept email identifier', () => {
      const r = AuthValidator.forgotPassword({ identifier: 'john@example.com' });
      expect(r.identifier).toBe('john@example.com');
    });

    it('should accept phone identifier', () => {
      const r = AuthValidator.forgotPassword({ identifier: '+8801712345678' });
      expect(r.identifier).toBe('+8801712345678');
    });

    it('should reject missing identifier', () => {
      expect(() => AuthValidator.forgotPassword({})).toThrow();
    });
  });

  // ═══════════════════════════════════════════════════════════
  // resetPassword — { token, newPassword, confirmPassword }
  // ═══════════════════════════════════════════════════════════

  describe('resetPassword()', () => {
    it('should accept valid reset', () => {
      const r = AuthValidator.resetPassword({
        token: 'a'.repeat(32),
        newPassword: 'Str0ng!Pass#2024',
        confirmPassword: 'Str0ng!Pass#2024',
      });
      expect(r.newPassword).toBe('Str0ng!Pass#2024');
    });

    it('should reject mismatched passwords', () => {
      expect(() =>
        AuthValidator.resetPassword({
          token: 'a'.repeat(32),
          newPassword: 'Str0ng!Pass#2024',
          confirmPassword: 'Different!1',
        }),
      ).toThrow();
    });

    it('should reject missing token', () => {
      expect(() =>
        AuthValidator.resetPassword({
          newPassword: 'Str0ng!Pass#2024',
          confirmPassword: 'Str0ng!Pass#2024',
        } as never),
      ).toThrow();
    });
  });

  // ═══════════════════════════════════════════════════════════
  // verifyEmail — { email, token }
  // ═══════════════════════════════════════════════════════════

  describe('verifyEmail()', () => {
    it('should accept valid email + token', () => {
      const r = AuthValidator.verifyEmail({
        email: 'john@example.com',
        token: 'a'.repeat(32),
      });
      expect(r.email).toBe('john@example.com');
      expect(r.token.length).toBe(32);
    });

    it('should reject empty token', () => {
      expect(() =>
        AuthValidator.verifyEmail({ email: 'john@example.com', token: '' }),
      ).toThrow();
    });

    it('should reject invalid email', () => {
      expect(() =>
        AuthValidator.verifyEmail({ email: 'not-an-email', token: 'a'.repeat(32) }),
      ).toThrow();
    });
  });
});

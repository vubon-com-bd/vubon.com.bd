/**
 * MfaValidator — Unit Tests (Schema-aware)
 * @module auth-service/application/validators
 */
import { MfaValidator } from './mfa.validator';

describe('MfaValidator', () => {
  // ═══════════════════════════════════════════════════════════
  // enable — { method, code }
  // ═══════════════════════════════════════════════════════════

  describe('enable()', () => {
    it('should accept totp enable', () => {
      const r = MfaValidator.enable({ method: 'totp', code: '123456' });
      expect(r.method).toBe('totp');
      expect(r.code).toBe('123456');
    });

    it('should accept sms enable', () => {
      const r = MfaValidator.enable({ method: 'sms', code: '654321' });
      expect(r.method).toBe('sms');
    });

    it('should reject non-6-digit code', () => {
      expect(() => MfaValidator.enable({ method: 'totp', code: '12345' })).toThrow();
      expect(() => MfaValidator.enable({ method: 'totp', code: 'abcdef' })).toThrow();
    });

    it('should reject invalid method', () => {
      expect(() =>
        MfaValidator.enable({ method: 'unknown', code: '123456' }),
      ).toThrow();
    });
  });

  // ═══════════════════════════════════════════════════════════
  // disable — { password, code? }
  // ═══════════════════════════════════════════════════════════

  describe('disable()', () => {
    it('should accept valid disable', () => {
      const r = MfaValidator.disable({ password: 'Test1234!' });
      expect(r.password).toBe('Test1234!');
    });

    it('should accept optional code', () => {
      const r = MfaValidator.disable({ password: 'Test1234!', code: '123456' });
      expect(r.code).toBe('123456');
    });

    it('should reject empty password', () => {
      expect(() => MfaValidator.disable({ password: '' })).toThrow();
    });

    it('should reject non-6-digit code when provided', () => {
      expect(() =>
        MfaValidator.disable({ password: 'Test1234!', code: '12345' }),
      ).toThrow();
    });
  });

  // ═══════════════════════════════════════════════════════════
  // verify — { challengeId (UUID), code (6 digits), method }
  // ═══════════════════════════════════════════════════════════

  describe('verify()', () => {
    const valid = {
      challengeId: '12345678-1234-1234-1234-123456789012',
      code: '123456',
      method: 'totp',
    };

    it('should accept valid verify', () => {
      const r = MfaValidator.verify(valid);
      expect(r.code).toBe('123456');
      expect(r.method).toBe('totp');
    });

    it('should default rememberDevice to false', () => {
      const r = MfaValidator.verify(valid);
      expect(r.rememberDevice).toBe(false);
    });

    it('should accept rememberDevice=true', () => {
      const r = MfaValidator.verify({ ...valid, rememberDevice: true });
      expect(r.rememberDevice).toBe(true);
    });

    it('should reject non-UUID challengeId', () => {
      expect(() =>
        MfaValidator.verify({ ...valid, challengeId: 'not-a-uuid' }),
      ).toThrow();
    });

    it('should reject non-6-digit code', () => {
      expect(() =>
        MfaValidator.verify({ ...valid, code: 'abc' }),
      ).toThrow();
    });

    it('should reject missing method', () => {
      const { method: _, ...rest } = valid;
      expect(() => MfaValidator.verify(rest as never)).toThrow();
    });
  });

  // ═══════════════════════════════════════════════════════════
  // verifyBackupCode — { challengeId (UUID), backupCode (8-20) }
  // ═══════════════════════════════════════════════════════════

  describe('verifyBackupCode()', () => {
    const valid = {
      challengeId: '12345678-1234-1234-1234-123456789012',
      backupCode: 'ABCD1234',
    };

    it('should accept valid backup code', () => {
      const r = MfaValidator.verifyBackupCode(valid);
      expect(r.backupCode).toBe('ABCD1234');
    });

    it('should reject too-short code', () => {
      expect(() =>
        MfaValidator.verifyBackupCode({ ...valid, backupCode: 'abc' }),
      ).toThrow();
    });

    it('should reject too-long code', () => {
      expect(() =>
        MfaValidator.verifyBackupCode({ ...valid, backupCode: 'a'.repeat(30) }),
      ).toThrow();
    });
  });
});

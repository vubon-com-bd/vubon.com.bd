/**
 * MfaSecretVO — Unit Tests
 * @module auth-service/domain/value-objects/primitives
 */
import { MfaSecretVO } from './mfa-secret.vo';
import { MfaInvalidError } from '../../errors/mfa.errors';

describe('MfaSecretVO', () => {
  const VALID_SECRET = 'JBSWY3DPEHPK3PXP'; // 16 chars base32

  describe('of()', () => {
    it('should accept valid base32 secret', () => {
      const vo = MfaSecretVO.of(VALID_SECRET);
      expect(vo.value).toBe(VALID_SECRET);
    });

    it('should normalize to uppercase', () => {
      const vo = MfaSecretVO.of('jbswy3dpehpk3pxp');
      expect(vo.value).toBe('JBSWY3DPEHPK3PXP');
    });

    it('should strip whitespace', () => {
      const vo = MfaSecretVO.of('JBSW Y3DP EHPK 3PXP');
      expect(vo.value).toBe('JBSWY3DPEHPK3PXP');
    });

    it('should accept longer valid secret', () => {
      const longSecret = 'JBSWY3DPEHPK3PXP'.repeat(2); // 32 chars
      const vo = MfaSecretVO.of(longSecret);
      expect(vo.value).toBe(longSecret);
    });

    it('should reject too short (<16 chars)', () => {
      expect(() => MfaSecretVO.of('JBSWY3DP')).toThrow(MfaInvalidError);
    });

    it('should reject too long (>128 chars)', () => {
      const longSecret = 'A'.repeat(129);
      expect(() => MfaSecretVO.of(longSecret)).toThrow(MfaInvalidError);
    });

    it('should reject non-base32 characters (0, 1, 8, 9)', () => {
      expect(() => MfaSecretVO.of('0123456789ABCDEF')).toThrow(MfaInvalidError);
    });

    it('should reject lowercase-only secret after uppercase conversion — but succeed', () => {
      // lowercase gets converted — should work
      expect(() => MfaSecretVO.of('jbswy3dpehpk3pxp')).not.toThrow();
    });

    it('should reject non-string', () => {
      expect(() => MfaSecretVO.of(123 as never)).toThrow(MfaInvalidError);
    });
  });

  describe('masked getter', () => {
    it('should mask middle of secret', () => {
      const vo = MfaSecretVO.of(VALID_SECRET);
      // Format: first 4 + "****" + last 4
      expect(vo.masked).toBe('JBSW****3PXP');
    });

    it('should always show exactly 4 + 4 chars', () => {
      const vo = MfaSecretVO.of('ABCDEFGHIJKLMNOP');
      expect(vo.masked).toMatch(/^[A-Z2-7]{4}\*{4}[A-Z2-7]{4}$/);
    });
  });

  describe('toJSON()', () => {
    it('should return masked value', () => {
      const vo = MfaSecretVO.of(VALID_SECRET);
      const json = JSON.parse(JSON.stringify(vo));
      expect(json).toBe('JBSW****3PXP');
      expect(json).not.toContain(VALID_SECRET);
    });
  });
});

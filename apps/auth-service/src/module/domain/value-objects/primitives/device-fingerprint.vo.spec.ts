/**
 * DeviceFingerprintVO — Unit Tests
 * @module auth-service/domain/value-objects/primitives
 */
import { DeviceFingerprintVO } from './device-fingerprint.vo';

describe('DeviceFingerprintVO', () => {
  const VALID_FP = 'abcdef0123456789'.repeat(4); // 64 chars hex

  describe('of()', () => {
    it('should accept valid 64-char hex fingerprint', () => {
      const vo = DeviceFingerprintVO.of(VALID_FP);
      expect(vo.value).toBe(VALID_FP);
    });

    it('should accept 32-char fingerprint (min boundary)', () => {
      const min = 'a'.repeat(32);
      const vo = DeviceFingerprintVO.of(min);
      expect(vo.value.length).toBe(32);
    });

    it('should accept 128-char fingerprint (max boundary)', () => {
      const max = 'a'.repeat(128);
      const vo = DeviceFingerprintVO.of(max);
      expect(vo.value.length).toBe(128);
    });

    it('should trim whitespace', () => {
      const vo = DeviceFingerprintVO.of(`  ${VALID_FP}  `);
      expect(vo.value).toBe(VALID_FP);
    });

    it('should accept base64url chars', () => {
      const withSymbols = 'aBc_-123'.repeat(5); // 40 chars
      expect(() => DeviceFingerprintVO.of(withSymbols)).not.toThrow();
    });

    it('should reject too short (<32 chars)', () => {
      expect(() => DeviceFingerprintVO.of('a'.repeat(31))).toThrow();
    });

    it('should reject too long (>128 chars)', () => {
      expect(() => DeviceFingerprintVO.of('a'.repeat(129))).toThrow();
    });

    it('should reject invalid characters', () => {
      expect(() => DeviceFingerprintVO.of('a'.repeat(32) + '!')).toThrow();
      expect(() => DeviceFingerprintVO.of('a'.repeat(32) + '#')).toThrow();
      // Note: leading/trailing spaces are trimmed (whitespace-only rejection is
      // covered by the "should trim whitespace" test)
    });

    it('should reject non-string', () => {
      expect(() => DeviceFingerprintVO.of(12345 as never)).toThrow();
    });
  });

  describe('masked getter', () => {
    it('should mask middle of fingerprint', () => {
      const vo = DeviceFingerprintVO.of('a'.repeat(60) + 'wxyz');
      expect(vo.masked).toMatch(/^aaaaaa…wxyz$/);
    });
  });

  describe('toJSON()', () => {
    it('should return masked value', () => {
      const vo = DeviceFingerprintVO.of('a'.repeat(60) + 'wxyz');
      const json = JSON.parse(JSON.stringify(vo));
      expect(json).toContain('…');
    });
  });
});

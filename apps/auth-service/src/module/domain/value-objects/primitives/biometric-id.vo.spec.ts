/**
 * BiometricIdVO — Unit Tests
 * @module auth-service/domain/value-objects/primitives
 */
import { BiometricIdVO } from './biometric-id.vo';

describe('BiometricIdVO', () => {
  const VALID = 'bio_abc123-def456';

  describe('of()', () => {
    it('should accept valid biometric id', () => {
      const vo = BiometricIdVO.of(VALID);
      expect(vo.value).toBe(VALID);
    });

    it('should trim whitespace', () => {
      const vo = BiometricIdVO.of(`  ${VALID}  `);
      expect(vo.value).toBe(VALID);
    });

    it('should accept id with underscores/hyphens', () => {
      expect(() => BiometricIdVO.of('abc_def-ghi')).not.toThrow();
    });

    it('should reject too short (<8 chars)', () => {
      expect(() => BiometricIdVO.of('short')).toThrow();
    });

    it('should reject too long (>256 chars)', () => {
      expect(() => BiometricIdVO.of('a'.repeat(257))).toThrow();
    });

    it('should reject invalid characters', () => {
      expect(() => BiometricIdVO.of('bio id with spaces')).toThrow();
      expect(() => BiometricIdVO.of('bio@id!')).toThrow();
    });

    it('should reject non-string', () => {
      expect(() => BiometricIdVO.of(12345678 as never)).toThrow();
    });
  });

  describe('equals()', () => {
    it('should equal same id', () => {
      const a = BiometricIdVO.of(VALID);
      const b = BiometricIdVO.of(VALID);
      expect(a.equals(b)).toBe(true);
    });

    it('should not equal different id', () => {
      const a = BiometricIdVO.of('bio_abc12345');
      const b = BiometricIdVO.of('bio_abc12346');
      expect(a.equals(b)).toBe(false);
    });
  });
});

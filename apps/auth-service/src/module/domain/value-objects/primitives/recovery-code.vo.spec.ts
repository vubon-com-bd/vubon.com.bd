/**
 * RecoveryCodeVO — Unit Tests
 * @module auth-service/domain/value-objects/primitives
 */
import { RecoveryCodeVO } from './recovery-code.vo';

describe('RecoveryCodeVO', () => {
  const VALID_CODE = 'ABCD-1234';

  describe('of()', () => {
    it('should accept valid recovery code XXXX-XXXX', () => {
      const vo = RecoveryCodeVO.of(VALID_CODE);
      expect(vo.value).toBe(VALID_CODE);
    });

    it('should normalize to uppercase', () => {
      const vo = RecoveryCodeVO.of('abcd-1234');
      expect(vo.value).toBe('ABCD-1234');
    });

    it('should strip whitespace', () => {
      const vo = RecoveryCodeVO.of(' ABCD-1234 ');
      expect(vo.value).toBe('ABCD-1234');
    });

    it('should strip internal spaces', () => {
      const vo = RecoveryCodeVO.of('AB CD-12 34');
      expect(vo.value).toBe('ABCD-1234');
    });

    it('should reject missing hyphen', () => {
      expect(() => RecoveryCodeVO.of('ABCD1234')).toThrow();
    });

    it('should reject wrong length', () => {
      expect(() => RecoveryCodeVO.of('ABC-1234')).toThrow();
      expect(() => RecoveryCodeVO.of('ABCDE-1234')).toThrow();
    });

    it('should reject invalid characters', () => {
      expect(() => RecoveryCodeVO.of('abc!-1234')).toThrow();
      expect(() => RecoveryCodeVO.of('ABCD-12!4')).toThrow();
    });

    it('should reject non-string', () => {
      expect(() => RecoveryCodeVO.of(12345678 as never)).toThrow();
    });
  });

  describe('masked getter', () => {
    it('should mask first part', () => {
      const vo = RecoveryCodeVO.of(VALID_CODE);
      expect(vo.masked).toBe('****-1234');
    });

    it('should keep last 4 chars', () => {
      const vo = RecoveryCodeVO.of('WXYZ-5678');
      expect(vo.masked).toBe('****-5678');
    });
  });

  describe('toJSON()', () => {
    it('should return masked value', () => {
      const vo = RecoveryCodeVO.of(VALID_CODE);
      const json = JSON.parse(JSON.stringify(vo));
      expect(json).toBe('****-1234');
    });
  });
});

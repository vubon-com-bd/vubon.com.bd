/**
 * VerificationCodeVO — Unit Tests
 * @module auth-service/domain/value-objects/primitives
 */
import { VerificationCodeVO } from './verification-code.vo';
import { VerificationCodeMismatchError } from '../../errors/verification.errors';

describe('VerificationCodeVO', () => {
  describe('of()', () => {
    it('should accept 6-digit code', () => {
      const vo = VerificationCodeVO.of('123456');
      expect(vo.value).toBe('123456');
    });

    it('should accept 4-digit code', () => {
      const vo = VerificationCodeVO.of('1234');
      expect(vo.value).toBe('1234');
    });

    it('should accept 8-digit code', () => {
      const vo = VerificationCodeVO.of('12345678');
      expect(vo.value).toBe('12345678');
    });

    it('should trim whitespace', () => {
      const vo = VerificationCodeVO.of('  123456  ');
      expect(vo.value).toBe('123456');
    });

    it('should reject too short (<4 digits)', () => {
      expect(() => VerificationCodeVO.of('123')).toThrow();
    });

    it('should reject too long (>8 digits)', () => {
      expect(() => VerificationCodeVO.of('123456789')).toThrow();
    });

    it('should reject non-numeric', () => {
      expect(() => VerificationCodeVO.of('12a456')).toThrow('numeric');
      expect(() => VerificationCodeVO.of('abcdef')).toThrow('numeric');
    });

    it('should reject non-string', () => {
      expect(() => VerificationCodeVO.of(123456 as never)).toThrow();
    });
  });

  describe('equalsConstantTime()', () => {
    it('should return true for identical codes', () => {
      const a = VerificationCodeVO.of('123456');
      const b = VerificationCodeVO.of('123456');
      expect(a.equalsConstantTime(b)).toBe(true);
    });

    it('should return false for different codes', () => {
      const a = VerificationCodeVO.of('123456');
      const b = VerificationCodeVO.of('654321');
      expect(a.equalsConstantTime(b)).toBe(false);
    });

    it('should throw on different lengths', () => {
      const a = VerificationCodeVO.of('123456');
      const b = VerificationCodeVO.of('1234');
      expect(() => a.equalsConstantTime(b)).toThrow(VerificationCodeMismatchError);
    });
  });

  describe('toJSON() / toString()', () => {
    it('should redact in JSON', () => {
      const vo = VerificationCodeVO.of('123456');
      expect(JSON.parse(JSON.stringify(vo))).toBe('***');
    });

    it('should redact in toString', () => {
      const vo = VerificationCodeVO.of('123456');
      expect(vo.toString()).toBe('***');
    });
  });
});

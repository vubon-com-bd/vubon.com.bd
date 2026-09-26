/**
 * UserPhoneVO — Unit Tests
 * @module auth-service/domain/value-objects/primitives
 */
import { UserPhoneVO } from './user-phone.vo';
import { InvalidPhoneError } from '../../errors/user.errors';

describe('UserPhoneVO', () => {
  describe('of()', () => {
    it('should accept +8801XXXXXXXXX format', () => {
      const vo = UserPhoneVO.of('+8801712345678');
      expect(vo.value).toBe('+8801712345678');
    });

    it('should normalize 8801XXXXXXXXX to +8801XXXXXXXXX', () => {
      const vo = UserPhoneVO.of('8801712345678');
      expect(vo.value).toBe('+8801712345678');
    });

    it('should normalize 01XXXXXXXXX to +8801XXXXXXXXX', () => {
      const vo = UserPhoneVO.of('01712345678');
      expect(vo.value).toBe('+8801712345678');
    });

    it('should strip spaces', () => {
      const vo = UserPhoneVO.of('+880 1712 345 678');
      expect(vo.value).toBe('+8801712345678');
    });

    it('should strip hyphens and parens', () => {
      const vo = UserPhoneVO.of('+880-1712-345-678');
      expect(vo.value).toBe('+8801712345678');
    });

    it('should reject invalid format', () => {
      expect(() => UserPhoneVO.of('123')).toThrow(InvalidPhoneError);
      expect(() => UserPhoneVO.of('abc')).toThrow(InvalidPhoneError);
      expect(() => UserPhoneVO.of('')).toThrow(InvalidPhoneError);
    });

    it('should reject invalid BD operator prefix', () => {
      // Valid prefixes are 13-19
      expect(() => UserPhoneVO.of('+8801212345678')).toThrow(InvalidPhoneError);
    });

    it('should accept all valid BD operator prefixes (13-19)', () => {
      ['13', '14', '15', '16', '17', '18', '19'].forEach((prefix) => {
        const phone = `+880${prefix}12345678`;
        expect(() => UserPhoneVO.of(phone)).not.toThrow();
      });
    });
  });

  describe('localFormat getter', () => {
    it('should return 01XXXXXXXXX format', () => {
      const vo = UserPhoneVO.of('+8801712345678');
      expect(vo.localFormat).toBe('01712345678');
    });
  });

  describe('equals()', () => {
    it('should equal same normalized phone', () => {
      const a = UserPhoneVO.of('+8801712345678');
      const b = UserPhoneVO.of('01712345678');
      expect(a.equals(b)).toBe(true);
    });
  });
});

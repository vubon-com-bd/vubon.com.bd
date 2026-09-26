/**
 * MfaTypeVO — Unit Tests
 * @module auth-service/domain/value-objects/primitives
 */
import { MfaTypeVO } from './mfa-type.vo';
import { MfaInvalidError } from '../../errors/mfa.errors';

describe('MfaTypeVO', () => {
  describe('of()', () => {
    it('should accept all valid MFA types', () => {
      ['totp', 'sms', 'email', 'webauthn', 'push'].forEach((t) => {
        const vo = MfaTypeVO.of(t);
        expect(vo.value).toBe(t);
      });
    });

    it('should reject unknown type', () => {
      expect(() => MfaTypeVO.of('unknown')).toThrow(MfaInvalidError);
      expect(() => MfaTypeVO.of('')).toThrow(MfaInvalidError);
      expect(() => MfaTypeVO.of('TOTP')).toThrow(MfaInvalidError);
    });
  });

  describe('isHardware()', () => {
    it('should return true only for webauthn', () => {
      expect(MfaTypeVO.of('webauthn').isHardware()).toBe(true);
      ['totp', 'sms', 'email', 'push'].forEach((t) => {
        expect(MfaTypeVO.of(t).isHardware()).toBe(false);
      });
    });
  });

  describe('isOutOfBand()', () => {
    it('should return true for sms', () => {
      expect(MfaTypeVO.of('sms').isOutOfBand()).toBe(true);
    });

    it('should return true for email', () => {
      expect(MfaTypeVO.of('email').isOutOfBand()).toBe(true);
    });

    it('should return true for push', () => {
      expect(MfaTypeVO.of('push').isOutOfBand()).toBe(true);
    });

    it('should return false for totp', () => {
      expect(MfaTypeVO.of('totp').isOutOfBand()).toBe(false);
    });

    it('should return false for webauthn', () => {
      expect(MfaTypeVO.of('webauthn').isOutOfBand()).toBe(false);
    });
  });
});

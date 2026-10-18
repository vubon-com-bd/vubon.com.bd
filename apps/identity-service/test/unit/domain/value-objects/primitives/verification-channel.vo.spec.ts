/**
 * VerificationChannelVO unit tests
 */
import { describe, it, expect } from '@jest/globals';
import { VerificationChannelVO } from '@domain/value-objects/primitives/verification-channel.vo.js';
import { InvalidVerificationChannelError } from '@domain/errors/verification.errors.js';

describe('VerificationChannelVO', () => {
  describe('create()', () => {
    it('should create valid channels', () => {
      for (const c of ['email', 'sms', 'whatsapp', 'push']) {
        expect(VerificationChannelVO.create(c).value).toBe(c);
      }
    });

    it('should normalize case', () => {
      expect(VerificationChannelVO.create(' EMAIL ').value).toBe('email');
    });

    it('should throw on empty', () => {
      expect(() => VerificationChannelVO.create('')).toThrow(InvalidVerificationChannelError);
    });

    it('should throw on invalid', () => {
      expect(() => VerificationChannelVO.create('xxx')).toThrow(InvalidVerificationChannelError);
    });
  });

  describe('static factories', () => {
    it('email/sms/whatsapp/push', () => {
      expect(VerificationChannelVO.email().value).toBe('email');
      expect(VerificationChannelVO.sms().value).toBe('sms');
      expect(VerificationChannelVO.whatsapp().value).toBe('whatsapp');
      expect(VerificationChannelVO.push().value).toBe('push');
    });
  });

  describe('predicates', () => {
    it('isEmail()', () => {
      expect(VerificationChannelVO.email().isEmail()).toBe(true);
      expect(VerificationChannelVO.sms().isEmail()).toBe(false);
    });

    it('isSms()', () => {
      expect(VerificationChannelVO.sms().isSms()).toBe(true);
      expect(VerificationChannelVO.email().isSms()).toBe(false);
    });

    it('isWhatsapp()', () => {
      expect(VerificationChannelVO.whatsapp().isWhatsapp()).toBe(true);
    });

    it('isPush()', () => {
      expect(VerificationChannelVO.push().isPush()).toBe(true);
    });
  });

  describe('reconstitute()', () => {
    it('should skip validation', () => {
      expect(VerificationChannelVO.reconstitute('anything').value).toBe('anything');
    });
  });
});

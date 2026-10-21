/**
 * VerificationMethodVO unit tests
 */
import { describe, it, expect } from '@jest/globals';
import { VerificationMethodVO } from '@domain/primitives/verification-method.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

describe('VerificationMethodVO', () => {
  describe('create()', () => {
    it('accepts all methods', () => {
      for (const m of ['otp_sms', 'otp_email', 'card_cvv', 'card_3ds', 'biometric', 'manual']) {
        expect(VerificationMethodVO.create(m).value).toBe(m);
      }
    });
    it('normalizes case', () => {
      expect(VerificationMethodVO.create('OTP_SMS').value).toBe('otp_sms');
    });
    it('throws on invalid', () => {
      expect(() => VerificationMethodVO.create('unknown')).toThrow(ValidationError);
    });
    it('throws on non-string', () => {
      expect(() => VerificationMethodVO.create(123 as unknown as string)).toThrow(ValidationError);
    });
  });

  describe('reconstitute()', () => {
    it('preserves value', () => {
      expect(VerificationMethodVO.reconstitute('otp_sms').value).toBe('otp_sms');
    });
  });

  describe('predicates', () => {
    it('isOtp for sms/email', () => {
      expect(VerificationMethodVO.create('otp_sms').isOtp()).toBe(true);
      expect(VerificationMethodVO.create('otp_email').isOtp()).toBe(true);
      expect(VerificationMethodVO.create('card_cvv').isOtp()).toBe(false);
    });
    it('isCard for cvv/3ds', () => {
      expect(VerificationMethodVO.create('card_cvv').isCard()).toBe(true);
      expect(VerificationMethodVO.create('card_3ds').isCard()).toBe(true);
    });
    it('isBiometric', () => {
      expect(VerificationMethodVO.create('biometric').isBiometric()).toBe(true);
    });
    it('isManual', () => {
      expect(VerificationMethodVO.create('manual').isManual()).toBe(true);
    });
  });
});

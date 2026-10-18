/**
 * VerificationPurposeVO unit tests
 */
import { describe, it, expect } from '@jest/globals';
import { VerificationPurposeVO } from '@domain/value-objects/primitives/verification-purpose.vo.js';
import { InvalidVerificationPurposeError } from '@domain/errors/verification.errors.js';

describe('VerificationPurposeVO', () => {
  describe('create()', () => {
    it('should create valid purposes', () => {
      for (const p of ['email_verify', 'phone_verify', 'login', 'password_reset', 'mfa_setup']) {
        expect(VerificationPurposeVO.create(p).value).toBe(p);
      }
    });

    it('should normalize case', () => {
      expect(VerificationPurposeVO.create(' EMAIL_VERIFY ').value).toBe('email_verify');
    });

    it('should throw on empty', () => {
      expect(() => VerificationPurposeVO.create('')).toThrow(InvalidVerificationPurposeError);
    });

    it('should throw on invalid', () => {
      expect(() => VerificationPurposeVO.create('xxx')).toThrow(InvalidVerificationPurposeError);
    });
  });

  describe('static factories', () => {
    it('emailVerify/phoneVerify/login/passwordReset/mfaSetup', () => {
      expect(VerificationPurposeVO.emailVerify().value).toBe('email_verify');
      expect(VerificationPurposeVO.phoneVerify().value).toBe('phone_verify');
      expect(VerificationPurposeVO.login().value).toBe('login');
      expect(VerificationPurposeVO.passwordReset().value).toBe('password_reset');
      expect(VerificationPurposeVO.mfaSetup().value).toBe('mfa_setup');
    });
  });

  describe('predicates', () => {
    it('isEmailVerify()', () => {
      expect(VerificationPurposeVO.emailVerify().isEmailVerify()).toBe(true);
      expect(VerificationPurposeVO.login().isEmailVerify()).toBe(false);
    });

    it('isPhoneVerify()', () => {
      expect(VerificationPurposeVO.phoneVerify().isPhoneVerify()).toBe(true);
    });

    it('isLogin()', () => {
      expect(VerificationPurposeVO.login().isLogin()).toBe(true);
    });

    it('isPasswordReset()', () => {
      expect(VerificationPurposeVO.passwordReset().isPasswordReset()).toBe(true);
    });

    it('isMfaSetup()', () => {
      expect(VerificationPurposeVO.mfaSetup().isMfaSetup()).toBe(true);
    });
  });

  describe('reconstitute()', () => {
    it('should skip validation', () => {
      expect(VerificationPurposeVO.reconstitute('anything').value).toBe('anything');
    });
  });
});

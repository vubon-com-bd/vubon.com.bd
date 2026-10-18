/**
 * AuthMethodVO unit tests
 */
import { describe, it, expect } from '@jest/globals';
import { AuthMethodVO } from '@domain/value-objects/primitives/auth-method.vo.js';
import { InvalidAuthMethodError } from '@domain/errors/auth.errors.js';

describe('AuthMethodVO', () => {
  describe('create()', () => {
    it('should create all valid methods', () => {
      for (const m of [
        'email_password',
        'phone_password',
        'username_password',
        'email_otp',
        'phone_otp',
        'magic_link',
        'social_login',
        'oauth2',
        'saml',
        'biometric',
      ]) {
        expect(AuthMethodVO.create(m).value).toBe(m);
      }
    });

    it('should normalize case', () => {
      expect(AuthMethodVO.create(' EMAIL_PASSWORD ').value).toBe('email_password');
    });

    it('should throw on empty', () => {
      expect(() => AuthMethodVO.create('')).toThrow(InvalidAuthMethodError);
    });

    it('should throw on invalid', () => {
      expect(() => AuthMethodVO.create('xxx')).toThrow(InvalidAuthMethodError);
    });
  });

  describe('static factories', () => {
    it('emailPassword/phonePassword/emailOtp/socialLogin', () => {
      expect(AuthMethodVO.emailPassword().value).toBe('email_password');
      expect(AuthMethodVO.phonePassword().value).toBe('phone_password');
      expect(AuthMethodVO.emailOtp().value).toBe('email_otp');
      expect(AuthMethodVO.socialLogin().value).toBe('social_login');
    });
  });

  describe('predicates', () => {
    it('isPasswordBased()', () => {
      expect(AuthMethodVO.emailPassword().isPasswordBased()).toBe(true);
      expect(AuthMethodVO.phonePassword().isPasswordBased()).toBe(true);
      expect(AuthMethodVO.emailOtp().isPasswordBased()).toBe(false);
    });

    it('isOtpBased()', () => {
      expect(AuthMethodVO.emailOtp().isOtpBased()).toBe(true);
      expect(AuthMethodVO.emailPassword().isOtpBased()).toBe(false);
    });

    it('isFederated()', () => {
      expect(AuthMethodVO.socialLogin().isFederated()).toBe(true);
      expect(AuthMethodVO.emailPassword().isFederated()).toBe(false);
    });
  });

  describe('reconstitute()', () => {
    it('should skip validation', () => {
      expect(AuthMethodVO.reconstitute('anything').value).toBe('anything');
    });
  });
});

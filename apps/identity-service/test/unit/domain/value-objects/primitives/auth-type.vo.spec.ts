/**
 * AuthTypeVO unit tests
 */
import { describe, it, expect } from '@jest/globals';
import { AuthTypeVO } from '@domain/value-objects/primitives/auth-type.vo.js';
import { InvalidAuthTypeError } from '@domain/errors/auth.errors.js';

describe('AuthTypeVO', () => {
  describe('create()', () => {
    it('should create each valid type', () => {
      const types = ['password', 'otp', 'magic_link', 'social', 'oauth', 'sso', 'biometric', 'api_key', 'anonymous'];
      for (const t of types) {
        expect(AuthTypeVO.create(t).value).toBe(t);
      }
    });

    it('should normalize case + trim', () => {
      expect(AuthTypeVO.create(' PASSWORD ').value).toBe('password');
    });

    it('should throw on invalid type', () => {
      expect(() => AuthTypeVO.create('nonsense')).toThrow(InvalidAuthTypeError);
    });

    it('should throw on empty', () => {
      expect(() => AuthTypeVO.create('')).toThrow(InvalidAuthTypeError);
    });
  });

  describe('static factories', () => {
    it('password()', () => expect(AuthTypeVO.password().value).toBe('password'));
    it('otp()', () => expect(AuthTypeVO.otp().value).toBe('otp'));
    it('social()', () => expect(AuthTypeVO.social().value).toBe('social'));
    it('oauth()', () => expect(AuthTypeVO.oauth().value).toBe('oauth'));
    it('sso()', () => expect(AuthTypeVO.sso().value).toBe('sso'));
    it('biometric()', () => expect(AuthTypeVO.biometric().value).toBe('biometric'));
    it('apiKey()', () => expect(AuthTypeVO.apiKey().value).toBe('api_key'));
    it('anonymous()', () => expect(AuthTypeVO.anonymous().value).toBe('anonymous'));
  });

  describe('predicates', () => {
    it('isPassword()', () => {
      expect(AuthTypeVO.password().isPassword()).toBe(true);
      expect(AuthTypeVO.otp().isPassword()).toBe(false);
    });

    it('isOtp()', () => {
      expect(AuthTypeVO.otp().isOtp()).toBe(true);
      expect(AuthTypeVO.password().isOtp()).toBe(false);
    });

    it('isSocial()', () => {
      expect(AuthTypeVO.social().isSocial()).toBe(true);
      expect(AuthTypeVO.password().isSocial()).toBe(false);
    });

    it('isFederated()', () => {
      expect(AuthTypeVO.social().isFederated()).toBe(true);
      expect(AuthTypeVO.oauth().isFederated()).toBe(true);
      expect(AuthTypeVO.sso().isFederated()).toBe(true);
      expect(AuthTypeVO.password().isFederated()).toBe(false);
    });

    it('requiresPassword()', () => {
      expect(AuthTypeVO.password().requiresPassword()).toBe(true);
      expect(AuthTypeVO.otp().requiresPassword()).toBe(false);
    });

    it('requiresMfa()', () => {
      expect(AuthTypeVO.password().requiresMfa()).toBe(true);
      expect(AuthTypeVO.otp().requiresMfa()).toBe(true);
      expect(AuthTypeVO.biometric().requiresMfa()).toBe(true);
      expect(AuthTypeVO.social().requiresMfa()).toBe(false);
    });

    it('isInteractive()', () => {
      expect(AuthTypeVO.password().isInteractive()).toBe(true);
      expect(AuthTypeVO.apiKey().isInteractive()).toBe(false);
      expect(AuthTypeVO.anonymous().isInteractive()).toBe(false);
    });
  });

  describe('reconstitute()', () => {
    it('should skip validation', () => {
      expect(AuthTypeVO.reconstitute('anything').value).toBe('anything');
    });
  });
});

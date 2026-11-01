/**
 * OAuthGrantTypeVO unit tests
 */
import { describe, it, expect } from '@jest/globals';
import { OAuthGrantTypeVO } from '@domain/value-objects/primitives/oauth-grant-type.vo.js';
import { InvalidOAuthGrantTypeError } from '@domain/errors/social.errors.js';

describe('OAuthGrantTypeVO', () => {
  describe('create()', () => {
    it('should create authorization_code', () => {
      expect(OAuthGrantTypeVO.create('authorization_code').value).toBe('authorization_code');
    });

    it('should create client_credentials', () => {
      expect(OAuthGrantTypeVO.create('client_credentials').value).toBe('client_credentials');
    });

    it('should create refresh_token', () => {
      expect(OAuthGrantTypeVO.create('refresh_token').value).toBe('refresh_token');
    });

    it('should create password', () => {
      expect(OAuthGrantTypeVO.create('password').value).toBe('password');
    });

    it('should normalize uppercase + trim', () => {
      expect(OAuthGrantTypeVO.create(' AUTHORIZATION_CODE ').value).toBe('authorization_code');
    });

    it('should throw on empty', () => {
      expect(() => OAuthGrantTypeVO.create('')).toThrow(InvalidOAuthGrantTypeError);
    });

    it('should throw on invalid', () => {
      expect(() => OAuthGrantTypeVO.create('nonsense')).toThrow(InvalidOAuthGrantTypeError);
    });
  });

  describe('static factories', () => {
    it('authorizationCode()', () => {
      expect(OAuthGrantTypeVO.authorizationCode().value).toBe('authorization_code');
    });

    it('clientCredentials()', () => {
      expect(OAuthGrantTypeVO.clientCredentials().value).toBe('client_credentials');
    });

    it('refreshToken()', () => {
      expect(OAuthGrantTypeVO.refreshToken().value).toBe('refresh_token');
    });

    it('password()', () => {
      expect(OAuthGrantTypeVO.password().value).toBe('password');
    });
  });

  describe('requiresRedirectUri()', () => {
    it('true for authorization_code', () => {
      expect(OAuthGrantTypeVO.authorizationCode().requiresRedirectUri()).toBe(true);
    });

    it('false for others', () => {
      expect(OAuthGrantTypeVO.clientCredentials().requiresRedirectUri()).toBe(false);
      expect(OAuthGrantTypeVO.refreshToken().requiresRedirectUri()).toBe(false);
      expect(OAuthGrantTypeVO.password().requiresRedirectUri()).toBe(false);
    });
  });

  describe('requiresClientSecret()', () => {
    it('true for non-authorization_code', () => {
      expect(OAuthGrantTypeVO.clientCredentials().requiresClientSecret()).toBe(true);
      expect(OAuthGrantTypeVO.refreshToken().requiresClientSecret()).toBe(true);
      expect(OAuthGrantTypeVO.password().requiresClientSecret()).toBe(true);
    });

    it('false for authorization_code', () => {
      expect(OAuthGrantTypeVO.authorizationCode().requiresClientSecret()).toBe(false);
    });
  });

  describe('reconstitute()', () => {
    it('should skip validation', () => {
      expect(OAuthGrantTypeVO.reconstitute('anything').value).toBe('anything');
    });
  });
});

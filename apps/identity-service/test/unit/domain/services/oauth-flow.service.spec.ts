/**
 * OAuthFlowService unit tests
 */
import { describe, it, expect } from '@jest/globals';
import { OAuthFlowService } from '@domain/services/oauth-flow.service.js';
import { BusinessRuleError } from '@vubon/shared-kernel/domain/errors/business-rule.error';

describe('OAuthFlowService', () => {
  describe('config getters', () => {
    it('should return positive', () => {
      expect(OAuthFlowService.stateLength()).toBeGreaterThan(0);
      expect(OAuthFlowService.codeVerifierLength()).toBeGreaterThan(0);
      expect(OAuthFlowService.pkceMethod()).toBe('S256');
    });

    it('should expose endpoints', () => {
      expect(OAuthFlowService.authorizationEndpoint()).toContain('/');
      expect(OAuthFlowService.tokenEndpoint()).toContain('/');
      expect(OAuthFlowService.revokeEndpoint()).toContain('/');
      expect(OAuthFlowService.introspectEndpoint()).toContain('/');
      expect(OAuthFlowService.userInfoEndpoint()).toContain('/');
    });
  });

  describe('assertAuthorizeRequest()', () => {
    it('should pass on valid', () => {
      expect(() =>
        OAuthFlowService.assertAuthorizeRequest({
          responseType: 'code',
          clientId: 'c1',
          redirectUri: 'https://app.example.com/cb',
          state: 'abcdef1234567890',
        }),
      ).not.toThrow();
    });

    it('should throw on invalid responseType', () => {
      expect(() =>
        OAuthFlowService.assertAuthorizeRequest({
          responseType: 'invalid',
          clientId: 'c1',
          redirectUri: 'https://x.com',
          state: '12345678',
        }),
      ).toThrow(BusinessRuleError);
    });

    it('should throw on missing clientId', () => {
      expect(() =>
        OAuthFlowService.assertAuthorizeRequest({
          responseType: 'code',
          clientId: '',
          redirectUri: 'https://x.com',
          state: '12345678',
        }),
      ).toThrow(BusinessRuleError);
    });

    it('should throw on missing redirectUri', () => {
      expect(() =>
        OAuthFlowService.assertAuthorizeRequest({
          responseType: 'code',
          clientId: 'c1',
          redirectUri: '',
          state: '12345678',
        }),
      ).toThrow(BusinessRuleError);
    });

    it('should throw on short state', () => {
      expect(() =>
        OAuthFlowService.assertAuthorizeRequest({
          responseType: 'code',
          clientId: 'c1',
          redirectUri: 'https://x.com',
          state: 'abc',
        }),
      ).toThrow(BusinessRuleError);
    });
  });

  describe('requiresPkce()', () => {
    it('true for public client', () => {
      expect(OAuthFlowService.requiresPkce(true)).toBe(true);
    });

    it('false for confidential client', () => {
      expect(OAuthFlowService.requiresPkce(false)).toBe(false);
    });
  });

  describe('assertPkceVerifier()', () => {
    it('should pass valid verifier', () => {
      const verifier = 'a'.repeat(64);
      expect(() => OAuthFlowService.assertPkceVerifier(verifier)).not.toThrow();
    });

    it('should throw too short', () => {
      expect(() => OAuthFlowService.assertPkceVerifier('short')).toThrow(BusinessRuleError);
    });

    it('should throw too long', () => {
      expect(() => OAuthFlowService.assertPkceVerifier('a'.repeat(129))).toThrow(BusinessRuleError);
    });

    it('should throw invalid chars', () => {
      expect(() => OAuthFlowService.assertPkceVerifier('a'.repeat(60) + '!!!')).toThrow(
        BusinessRuleError,
      );
    });
  });
});

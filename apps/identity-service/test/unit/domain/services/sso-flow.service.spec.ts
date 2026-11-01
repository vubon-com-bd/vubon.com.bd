/**
 * SsoFlowService unit tests
 */
import { describe, it, expect } from '@jest/globals';
import { SsoFlowService } from '@domain/services/sso-flow.service.js';
import { BusinessRuleError } from '@vubon/shared-kernel/domain/errors/business-rule.error';

describe('SsoFlowService', () => {
  describe('supportedProviders()', () => {
    it('should include common', () => {
      const p = SsoFlowService.supportedProviders();
      expect(p).toContain('saml');
      expect(p).toContain('oidc');
    });
  });

  describe('isSupported()', () => {
    it('true for saml', () => {
      expect(SsoFlowService.isSupported('saml')).toBe(true);
    });

    it('false for unknown', () => {
      expect(SsoFlowService.isSupported('xyz')).toBe(false);
    });
  });

  describe('assertSupported()', () => {
    it('should pass for saml', () => {
      expect(() => SsoFlowService.assertSupported('saml')).not.toThrow();
    });

    it('should throw for unknown', () => {
      expect(() => SsoFlowService.assertSupported('xyz')).toThrow(BusinessRuleError);
    });
  });

  describe('config getters', () => {
    it('should return positive values', () => {
      expect(SsoFlowService.sessionExpirySeconds()).toBeGreaterThan(0);
      expect(SsoFlowService.sessionRefreshWindowSeconds()).toBeGreaterThan(0);
    });

    it('isSingleLogoutEnabled returns boolean', () => {
      expect(typeof SsoFlowService.isSingleLogoutEnabled()).toBe('boolean');
    });
  });

  describe('assertSamlAssertion()', () => {
    it('should pass valid', () => {
      expect(() =>
        SsoFlowService.assertSamlAssertion({
          hasIssuer: true,
          hasSubject: true,
          notExpired: true,
        }),
      ).not.toThrow();
    });

    it('should throw without issuer', () => {
      expect(() =>
        SsoFlowService.assertSamlAssertion({
          hasIssuer: false,
          hasSubject: true,
          notExpired: true,
        }),
      ).toThrow(BusinessRuleError);
    });

    it('should throw without subject', () => {
      expect(() =>
        SsoFlowService.assertSamlAssertion({
          hasIssuer: true,
          hasSubject: false,
          notExpired: true,
        }),
      ).toThrow(BusinessRuleError);
    });

    it('should throw when expired', () => {
      expect(() =>
        SsoFlowService.assertSamlAssertion({
          hasIssuer: true,
          hasSubject: true,
          notExpired: false,
        }),
      ).toThrow(BusinessRuleError);
    });
  });

  describe('sessionExpiresAt()', () => {
    it('should be future', () => {
      const d = SsoFlowService.sessionExpiresAt();
      expect(d.getTime()).toBeGreaterThan(Date.now());
    });
  });
});

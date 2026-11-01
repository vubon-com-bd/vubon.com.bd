/**
 * SocialAccountLinkerService unit tests
 */
import { describe, it, expect } from '@jest/globals';
import { SocialAccountLinkerService } from '@domain/services/social-account-linker.service.js';
import { BusinessRuleError } from '@vubon/shared-kernel/domain/errors/business-rule.error';

describe('SocialAccountLinkerService', () => {
  describe('supportedProviders()', () => {
    it('should include common providers', () => {
      const providers = SocialAccountLinkerService.supportedProviders();
      expect(providers).toContain('google');
      expect(providers).toContain('facebook');
      expect(providers).toContain('github');
    });
  });

  describe('isSupported()', () => {
    it('true for known', () => {
      expect(SocialAccountLinkerService.isSupported('google')).toBe(true);
    });

    it('false for unknown', () => {
      expect(SocialAccountLinkerService.isSupported('unknown-provider')).toBe(false);
    });
  });

  describe('assertSupported()', () => {
    it('should not throw on known', () => {
      expect(() => SocialAccountLinkerService.assertSupported('google')).not.toThrow();
    });

    it('should throw on unknown', () => {
      expect(() => SocialAccountLinkerService.assertSupported('xyz')).toThrow(BusinessRuleError);
    });
  });

  describe('canLink()', () => {
    it('should allow when all conditions met', () => {
      const r = SocialAccountLinkerService.canLink({
        provider: 'google',
        alreadyLinked: false,
        emailVerified: true,
      });
      expect(r.allowed).toBe(true);
    });

    it('should reject unsupported provider', () => {
      const r = SocialAccountLinkerService.canLink({
        provider: 'xyz',
        alreadyLinked: false,
        emailVerified: true,
      });
      expect(r.allowed).toBe(false);
      expect(r.reason).toBe('unsupported_provider');
    });

    it('should reject already linked', () => {
      const r = SocialAccountLinkerService.canLink({
        provider: 'google',
        alreadyLinked: true,
        emailVerified: true,
      });
      expect(r.allowed).toBe(false);
      expect(r.reason).toBe('already_linked');
    });

    it('should reject unverified email', () => {
      const r = SocialAccountLinkerService.canLink({
        provider: 'google',
        alreadyLinked: false,
        emailVerified: false,
      });
      expect(r.allowed).toBe(false);
      expect(r.reason).toBe('email_not_verified');
    });
  });

  describe('canUnlink()', () => {
    it('true when multiple auth methods', () => {
      expect(
        SocialAccountLinkerService.canUnlink({ totalAuthMethods: 2, hasPassword: false }),
      ).toBe(true);
    });

    it('true when has password', () => {
      expect(
        SocialAccountLinkerService.canUnlink({ totalAuthMethods: 1, hasPassword: true }),
      ).toBe(true);
    });

    it('false when only one method without password', () => {
      expect(
        SocialAccountLinkerService.canUnlink({ totalAuthMethods: 1, hasPassword: false }),
      ).toBe(false);
    });
  });
});

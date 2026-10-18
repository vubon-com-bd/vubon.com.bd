/**
 * CanLinkSocialSpecification unit tests
 */
import { describe, it, expect } from '@jest/globals';
import { CanLinkSocialSpecification } from '@domain/specifications/can-link-social.specification.js';
import { activeLocalAuth, revokedAuth, pendingAuth } from '@fixtures/index';

const spec = new CanLinkSocialSpecification();

const baseCtx = {
  provider: 'google',
  alreadyLinked: false,
  providerUserId: 'google-user-123',
};

describe('CanLinkSocialSpecification', () => {
  describe('isSatisfiedBy()', () => {
    it('true when all met', () => {
      expect(spec.isSatisfiedBy({ auth: activeLocalAuth(), context: baseCtx })).toBe(true);
    });

    it('false for revoked auth', () => {
      expect(spec.isSatisfiedBy({ auth: revokedAuth(), context: baseCtx })).toBe(false);
    });

    it('false for pending auth', () => {
      expect(spec.isSatisfiedBy({ auth: pendingAuth(), context: baseCtx })).toBe(false);
    });

    it('false for unsupported provider', () => {
      expect(
        spec.isSatisfiedBy({
          auth: activeLocalAuth(),
          context: { ...baseCtx, provider: 'unknown' },
        }),
      ).toBe(false);
    });

    it('false when already linked', () => {
      expect(
        spec.isSatisfiedBy({
          auth: activeLocalAuth(),
          context: { ...baseCtx, alreadyLinked: true },
        }),
      ).toBe(false);
    });

    it('false when no providerUserId', () => {
      expect(
        spec.isSatisfiedBy({
          auth: activeLocalAuth(),
          context: { ...baseCtx, providerUserId: '' },
        }),
      ).toBe(false);
    });
  });

  describe('explain()', () => {
    it('null when passes', () => {
      expect(spec.explain({ auth: activeLocalAuth(), context: baseCtx })).toBeNull();
    });

    it('explains terminal', () => {
      expect(spec.explain({ auth: revokedAuth(), context: baseCtx })).toContain('terminal');
    });

    it('explains inactive status', () => {
      expect(spec.explain({ auth: pendingAuth(), context: baseCtx })).toContain('not active');
    });

    it('explains unsupported provider', () => {
      expect(
        spec.explain({
          auth: activeLocalAuth(),
          context: { ...baseCtx, provider: 'unknown' },
        }),
      ).toContain('Unsupported');
    });

    it('explains already linked', () => {
      expect(
        spec.explain({
          auth: activeLocalAuth(),
          context: { ...baseCtx, alreadyLinked: true },
        }),
      ).toContain('already linked');
    });

    it('explains missing providerUserId', () => {
      expect(
        spec.explain({
          auth: activeLocalAuth(),
          context: { ...baseCtx, providerUserId: '' },
        }),
      ).toContain('Provider user id');
    });
  });

  describe('strict()', () => {
    it('should return instance', () => {
      expect(CanLinkSocialSpecification.strict()).toBeInstanceOf(CanLinkSocialSpecification);
    });
  });
});

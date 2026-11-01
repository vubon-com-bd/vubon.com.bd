/**
 * CanEnableMfaSpecification unit tests
 */
import { describe, it, expect } from '@jest/globals';
import { CanEnableMfaSpecification } from '@domain/specifications/can-enable-mfa.specification.js';
import {
  activeLocalAuth,
  mfaEnabledAuth,
  pendingAuth,
  makeAuthEntity,
} from '@fixtures/index';

const spec = new CanEnableMfaSpecification();

describe('CanEnableMfaSpecification', () => {
  describe('isSatisfiedBy()', () => {
    it('true for active + verified + not enabled + secret provisioned', () => {
      expect(
        spec.isSatisfiedBy({
          auth: activeLocalAuth(),
          context: { method: 'totp', secretProvisioned: true },
        }),
      ).toBe(true);
    });

    it('false when MFA already enabled', () => {
      expect(
        spec.isSatisfiedBy({
          auth: mfaEnabledAuth(),
          context: { method: 'totp', secretProvisioned: true },
        }),
      ).toBe(false);
    });

    it('false when not active', () => {
      expect(
        spec.isSatisfiedBy({
          auth: pendingAuth(),
          context: { method: 'totp', secretProvisioned: true },
        }),
      ).toBe(false);
    });

    it('false when no email or phone verified', () => {
      const auth = makeAuthEntity({ isEmailVerified: false, isPhoneVerified: false });
      expect(
        spec.isSatisfiedBy({
          auth,
          context: { method: 'totp', secretProvisioned: true },
        }),
      ).toBe(false);
    });

    it('false when TOTP without secret', () => {
      expect(
        spec.isSatisfiedBy({
          auth: activeLocalAuth(),
          context: { method: 'totp', secretProvisioned: false },
        }),
      ).toBe(false);
    });

    it('true when SMS without secret', () => {
      expect(
        spec.isSatisfiedBy({
          auth: activeLocalAuth(),
          context: { method: 'sms', secretProvisioned: false },
        }),
      ).toBe(true);
    });
  });

  describe('explain()', () => {
    it('null when passes', () => {
      expect(
        spec.explain({
          auth: activeLocalAuth(),
          context: { method: 'totp', secretProvisioned: true },
        }),
      ).toBeNull();
    });

    it('explains already enabled', () => {
      expect(
        spec.explain({
          auth: mfaEnabledAuth(),
          context: { method: 'totp', secretProvisioned: true },
        }),
      ).toContain('already enabled');
    });

    it('explains not active', () => {
      expect(
        spec.explain({
          auth: pendingAuth(),
          context: { method: 'totp', secretProvisioned: true },
        }),
      ).toContain('not active');
    });

    it('explains verification required', () => {
      const auth = makeAuthEntity({ isEmailVerified: false, isPhoneVerified: false });
      expect(
        spec.explain({
          auth,
          context: { method: 'totp', secretProvisioned: true },
        }),
      ).toContain('verification required');
    });

    it('explains missing secret', () => {
      expect(
        spec.explain({
          auth: activeLocalAuth(),
          context: { method: 'totp', secretProvisioned: false },
        }),
      ).toContain('secret');
    });
  });

  describe('strict()', () => {
    it('should return instance', () => {
      expect(CanEnableMfaSpecification.strict()).toBeInstanceOf(CanEnableMfaSpecification);
    });
  });
});

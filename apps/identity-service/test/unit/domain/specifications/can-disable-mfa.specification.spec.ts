/**
 * CanDisableMfaSpecification — Unit Tests
 */
import { CanDisableMfaSpecification } from '@domain/specifications/can-disable-mfa.specification.js';

const SPEC = new CanDisableMfaSpecification();

function makeAuth(overrides?: { isMfaEnabled?: boolean }) {
  return {
    isMfaEnabled: overrides?.isMfaEnabled ?? true,
  } as unknown as Parameters<typeof SPEC.isSatisfiedBy>[0]['auth'];
}

describe('CanDisableMfaSpecification', () => {
  describe('isSatisfiedBy', () => {
    it('returns false when MFA not enabled', () => {
      expect(
        SPEC.isSatisfiedBy({
          auth: makeAuth({ isMfaEnabled: false }),
          context: {},
        }),
      ).toBe(false);
    });

    it('returns true with adminOverride (line 39 — true branch)', () => {
      expect(
        SPEC.isSatisfiedBy({
          auth: makeAuth(),
          context: { adminOverride: true },
        }),
      ).toBe(true);
    });

    it('returns true with currentPasswordProvided', () => {
      expect(
        SPEC.isSatisfiedBy({
          auth: makeAuth(),
          context: { currentPasswordProvided: true },
        }),
      ).toBe(true);
    });

    it('returns true with mfaVerifiedRecently', () => {
      expect(
        SPEC.isSatisfiedBy({
          auth: makeAuth(),
          context: { mfaVerifiedRecently: true },
        }),
      ).toBe(true);
    });

    it('returns false with no proof and no override (line 39 — false branch)', () => {
      expect(
        SPEC.isSatisfiedBy({
          auth: makeAuth(),
          context: {},
        }),
      ).toBe(false);
    });

    it('returns false when context is undefined', () => {
      expect(
        SPEC.isSatisfiedBy({
          auth: makeAuth(),
        }),
      ).toBe(false);
    });
  });

  describe('explain', () => {
    it('returns null when adminOverride', () => {
      expect(
        SPEC.explain({
          auth: makeAuth(),
          context: { adminOverride: true },
        }),
      ).toBeNull();
    });

    it('returns null when currentPasswordProvided', () => {
      expect(
        SPEC.explain({
          auth: makeAuth(),
          context: { currentPasswordProvided: true },
        }),
      ).toBeNull();
    });

    it('returns null when mfaVerifiedRecently', () => {
      expect(
        SPEC.explain({
          auth: makeAuth(),
          context: { mfaVerifiedRecently: true },
        }),
      ).toBeNull();
    });

    it('explains MFA not enabled', () => {
      expect(
        SPEC.explain({
          auth: makeAuth({ isMfaEnabled: false }),
        }),
      ).toBe('MFA is not currently enabled');
    });

    it('explains missing proof', () => {
      expect(
        SPEC.explain({
          auth: makeAuth(),
          context: {},
        }),
      ).toBe('Current password or recent MFA verification required to disable MFA');
    });
  });

  it('strict factory returns instance', () => {
    expect(CanDisableMfaSpecification.strict()).toBeInstanceOf(
      CanDisableMfaSpecification,
    );
  });
});

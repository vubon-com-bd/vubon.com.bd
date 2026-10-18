/**
 * CanLoginSpecification — Unit Tests (Complete)
 */
import { CanLoginSpecification } from '@domain/specifications/can-login.specification.js';

const SPEC = new CanLoginSpecification();

function makeAuth(overrides?: {
  isFinal?: boolean;
  isActive?: boolean;
  isLockedNow?: boolean;
  isEmailVerified?: boolean;
  isPhoneVerified?: boolean;
  isMfaEnabled?: boolean;
  statusValue?: string;
  lockedUntil?: string;
}) {
  return {
    isFinal: () => overrides?.isFinal ?? false,
    isActive: () => overrides?.isActive ?? true,
    isLockedNow: () => overrides?.isLockedNow ?? false,
    isEmailVerified: overrides?.isEmailVerified ?? true,
    isPhoneVerified: overrides?.isPhoneVerified ?? true,
    isMfaEnabled: overrides?.isMfaEnabled ?? false,
    status: { value: overrides?.statusValue ?? 'active' },
    lockedUntil: overrides?.lockedUntil,
  } as unknown as Parameters<typeof SPEC.isSatisfiedBy>[0]['auth'];
}

describe('CanLoginSpecification', () => {
  describe('isSatisfiedBy', () => {
    it('returns true for active, unlocked, verified user', () => {
      expect(SPEC.isSatisfiedBy({ auth: makeAuth() })).toBe(true);
    });

    it('returns false for final status (line 57)', () => {
      expect(
        SPEC.isSatisfiedBy({
          auth: makeAuth({ isFinal: true, statusValue: 'revoked' }),
        }),
      ).toBe(false);
    });

    it('returns false when inactive', () => {
      expect(SPEC.isSatisfiedBy({ auth: makeAuth({ isActive: false }) })).toBe(false);
    });

    it('returns false when locked', () => {
      expect(SPEC.isSatisfiedBy({ auth: makeAuth({ isLockedNow: true }) })).toBe(false);
    });

    it('returns false when email verification required but not verified', () => {
      expect(
        SPEC.isSatisfiedBy({
          auth: makeAuth({ isEmailVerified: false }),
          context: { requiresEmailVerification: true },
        }),
      ).toBe(false);
    });

    it('returns false when phone verification required but not verified', () => {
      expect(
        SPEC.isSatisfiedBy({
          auth: makeAuth({ isPhoneVerified: false }),
          context: { requiresPhoneVerification: true },
        }),
      ).toBe(false);
    });

    it('returns false when MFA required but not verified', () => {
      expect(
        SPEC.isSatisfiedBy({
          auth: makeAuth({ isMfaEnabled: true }),
          context: { requireMfaVerified: true, mfaVerified: false },
        }),
      ).toBe(false);
    });

    it('returns true when MFA required and verified', () => {
      expect(
        SPEC.isSatisfiedBy({
          auth: makeAuth({ isMfaEnabled: true }),
          context: { requireMfaVerified: true, mfaVerified: true },
        }),
      ).toBe(true);
    });
  });

  describe('explain', () => {
    it('returns null when satisfied', () => {
      expect(SPEC.explain({ auth: makeAuth() })).toBeNull();
    });

    it('explains final status (line 51)', () => {
      expect(
        SPEC.explain({ auth: makeAuth({ isFinal: true, statusValue: 'revoked' }) }),
      ).toBe('Auth status "revoked" is terminal');
    });

    it('explains inactive status', () => {
      expect(
        SPEC.explain({ auth: makeAuth({ isActive: false, statusValue: 'inactive' }) }),
      ).toBe('Auth status "inactive" is not active');
    });

    it('explains locked status', () => {
      expect(
        SPEC.explain({
          auth: makeAuth({ isLockedNow: true, lockedUntil: '2026-12-31T00:00:00Z' }),
        }),
      ).toBe('Auth is locked until 2026-12-31T00:00:00Z');
    });

    it('explains email verification required', () => {
      expect(
        SPEC.explain({
          auth: makeAuth({ isEmailVerified: false }),
          context: { requiresEmailVerification: true },
        }),
      ).toBe('Email verification required');
    });

    it('explains phone verification required', () => {
      expect(
        SPEC.explain({
          auth: makeAuth({ isPhoneVerified: false }),
          context: { requiresPhoneVerification: true },
        }),
      ).toBe('Phone verification required');
    });

    it('explains MFA required', () => {
      expect(
        SPEC.explain({
          auth: makeAuth({ isMfaEnabled: true }),
          context: { requireMfaVerified: true, mfaVerified: false },
        }),
      ).toBe('MFA verification required');
    });
  });

  it('strict factory returns instance', () => {
    expect(CanLoginSpecification.strict()).toBeInstanceOf(CanLoginSpecification);
  });
});

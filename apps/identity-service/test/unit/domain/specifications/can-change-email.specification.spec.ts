/**
 * CanChangeEmailSpecification — Unit Tests
 */
import { CanChangeEmailSpecification } from '@domain/specifications/can-change-email.specification.js';

const SPEC = new CanChangeEmailSpecification();

function make(overrides?: {
  userActive?: boolean;
  cooldownPassed?: boolean;
  isNewEmailVerified?: boolean;
  currentEmailVerified?: boolean;
  currentEmail?: string;
  newEmail?: string;
}) {
  return {
    userId: 'user-1',
    currentEmail: overrides?.currentEmail ?? 'old@example.com',
    newEmail: overrides?.newEmail ?? 'new@example.com',
    context: {
      userActive: overrides?.userActive ?? true,
      cooldownPassed: overrides?.cooldownPassed ?? true,
      isNewEmailVerified: overrides?.isNewEmailVerified ?? true,
      currentEmailVerified: overrides?.currentEmailVerified ?? true,
    },
  };
}

describe('CanChangeEmailSpecification', () => {
  describe('isSatisfiedBy', () => {
    it('returns true when all conditions met', () => {
      expect(SPEC.isSatisfiedBy(make())).toBe(true);
    });

    it('returns false when user inactive', () => {
      expect(SPEC.isSatisfiedBy(make({ userActive: false }))).toBe(false);
    });

    it('returns false when cooldown not passed', () => {
      expect(SPEC.isSatisfiedBy(make({ cooldownPassed: false }))).toBe(false);
    });

    it('returns false when new email not verified', () => {
      expect(SPEC.isSatisfiedBy(make({ isNewEmailVerified: false }))).toBe(false);
    });

    it('returns false when same email (case insensitive)', () => {
      expect(
        SPEC.isSatisfiedBy(make({ currentEmail: 'Test@X.com', newEmail: 'test@x.com' })),
      ).toBe(false);
    });
  });

  describe('explain', () => {
    it('returns null when satisfied', () => {
      expect(SPEC.explain(make())).toBeNull();
    });

    it('explains inactive user', () => {
      expect(SPEC.explain(make({ userActive: false }))).toBe('user is not active');
    });

    it('explains cooldown', () => {
      expect(SPEC.explain(make({ cooldownPassed: false }))).toBe(
        'email change cooldown active',
      );
    });

    it('explains same email', () => {
      expect(
        SPEC.explain(make({ currentEmail: 'a@b.com', newEmail: 'a@b.com' })),
      ).toBe('new email is same as current');
    });

    it('explains unverified new email', () => {
      expect(SPEC.explain(make({ isNewEmailVerified: false }))).toBe(
        'new email must be verified',
      );
    });
  });

  it('strict factory returns instance', () => {
    expect(CanChangeEmailSpecification.strict()).toBeInstanceOf(
      CanChangeEmailSpecification,
    );
  });
});

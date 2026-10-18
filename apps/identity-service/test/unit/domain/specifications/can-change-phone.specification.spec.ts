/**
 * CanChangePhoneSpecification — Unit Tests
 */
import { CanChangePhoneSpecification } from '@domain/specifications/can-change-phone.specification.js';

const SPEC = new CanChangePhoneSpecification();

function make(overrides?: {
  userActive?: boolean;
  cooldownPassed?: boolean;
  isNewPhoneVerified?: boolean;
  currentPhoneVerified?: boolean;
  currentPhone?: string | undefined;
  newPhone?: string;
}) {
  return {
    userId: 'user-1',
    currentPhone: 'currentPhone' in (overrides ?? {}) ? overrides?.currentPhone : '+8801700000000',
    newPhone: overrides?.newPhone ?? '+8801800000000',
    context: {
      userActive: overrides?.userActive ?? true,
      cooldownPassed: overrides?.cooldownPassed ?? true,
      isNewPhoneVerified: overrides?.isNewPhoneVerified ?? true,
      currentPhoneVerified: overrides?.currentPhoneVerified ?? true,
    },
  };
}

describe('CanChangePhoneSpecification', () => {
  it('returns true when all conditions met', () => {
    expect(SPEC.isSatisfiedBy(make())).toBe(true);
  });

  it('returns false when user inactive', () => {
    expect(SPEC.isSatisfiedBy(make({ userActive: false }))).toBe(false);
  });

  it('returns false when cooldown not passed', () => {
    expect(SPEC.isSatisfiedBy(make({ cooldownPassed: false }))).toBe(false);
  });

  it('returns false when new phone not verified', () => {
    expect(SPEC.isSatisfiedBy(make({ isNewPhoneVerified: false }))).toBe(false);
  });

  it('returns false when new phone same as current', () => {
    expect(
      SPEC.isSatisfiedBy(make({ currentPhone: '+8801700000000', newPhone: '+8801700000000' })),
    ).toBe(false);
  });

  it('returns true when currentPhone undefined (first time)', () => {
    expect(SPEC.isSatisfiedBy(make({ currentPhone: undefined }))).toBe(true);
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
        'phone change cooldown active',
      );
    });

    it('explains same phone', () => {
      expect(
        SPEC.explain(make({ currentPhone: '+8801700000000', newPhone: '+8801700000000' })),
      ).toBe('new phone is same as current');
    });

    it('explains unverified new phone', () => {
      expect(SPEC.explain(make({ isNewPhoneVerified: false }))).toBe(
        'new phone must be verified',
      );
    });
  });

  it('strict factory returns instance', () => {
    expect(CanChangePhoneSpecification.strict()).toBeInstanceOf(
      CanChangePhoneSpecification,
    );
  });
});

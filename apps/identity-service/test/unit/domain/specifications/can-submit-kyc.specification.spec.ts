/**
 * CanSubmitKycSpecification — Unit Tests
 */
import { CanSubmitKycSpecification } from '@domain/specifications/can-submit-kyc.specification.js';

const SPEC = new CanSubmitKycSpecification();

function makeUser(overrides?: {
  isActive?: boolean;
  emailVerified?: boolean;
  statusValue?: string;
}) {
  return {
    isActive: () => overrides?.isActive ?? true,
    emailVerified: overrides?.emailVerified ?? true,
    status: { value: overrides?.statusValue ?? 'active' },
  } as unknown as Parameters<typeof SPEC.isSatisfiedBy>[0]['user'];
}

function makeKyc(overrides?: {
  verified?: boolean;
  pending?: boolean;
  resubmitted?: boolean;
  rejected?: boolean;
  documentsLength?: number;
}) {
  return {
    status: {
      isVerified: () => overrides?.verified ?? false,
      isPending: () => overrides?.pending ?? false,
      isResubmitted: () => overrides?.resubmitted ?? false,
      isRejected: () => overrides?.rejected ?? false,
      value: overrides?.verified
        ? 'verified'
        : overrides?.pending
          ? 'pending'
          : 'pending',
    },
    documents: Array(overrides?.documentsLength ?? 1).fill({}),
  } as unknown as Parameters<typeof SPEC.isSatisfiedBy>[0]['kyc'];
}

describe('CanSubmitKycSpecification', () => {
  it('returns true when user active, verified email, no kyc', () => {
    expect(
      SPEC.isSatisfiedBy({
        user: makeUser(),
        kyc: undefined,
        context: { documentCount: 1 },
      }),
    ).toBe(true);
  });

  it('returns false when user inactive', () => {
    expect(
      SPEC.isSatisfiedBy({
        user: makeUser({ isActive: false }),
        context: { documentCount: 1 },
      }),
    ).toBe(false);
  });

  it('returns false when email not verified', () => {
    expect(
      SPEC.isSatisfiedBy({
        user: makeUser({ emailVerified: false }),
        context: { documentCount: 1 },
      }),
    ).toBe(false);
  });

  it('returns false when no documents', () => {
    expect(
      SPEC.isSatisfiedBy({
        user: makeUser(),
        context: { documentCount: 0 },
      }),
    ).toBe(false);
  });

  it('returns false when kyc already verified', () => {
    expect(
      SPEC.isSatisfiedBy({
        user: makeUser(),
        kyc: makeKyc({ verified: true }),
        context: { documentCount: 1 },
      }),
    ).toBe(false);
  });

  it('returns false when kyc already pending', () => {
    expect(
      SPEC.isSatisfiedBy({
        user: makeUser(),
        kyc: makeKyc({ pending: true }),
        context: { documentCount: 1 },
      }),
    ).toBe(false);
  });

  describe('explain', () => {
    it('returns null when satisfied', () => {
      expect(
        SPEC.explain({
          user: makeUser(),
          context: { documentCount: 1 },
        }),
      ).toBeNull();
    });

    it('explains inactive user', () => {
      expect(
        SPEC.explain({
          user: makeUser({ isActive: false, statusValue: 'suspended' }),
          context: { documentCount: 1 },
        }),
      ).toBe('User status "suspended" is not active');
    });

    it('explains unverified email', () => {
      expect(
        SPEC.explain({
          user: makeUser({ emailVerified: false }),
          context: { documentCount: 1 },
        }),
      ).toBe('Email verification required before KYC');
    });

    it('explains no documents', () => {
      expect(
        SPEC.explain({
          user: makeUser(),
          context: { documentCount: 0 },
        }),
      ).toBe('At least one document is required');
    });

    it('explains verified KYC', () => {
      expect(
        SPEC.explain({
          user: makeUser(),
          kyc: makeKyc({ verified: true }),
          context: { documentCount: 1 },
        }),
      ).toBe('KYC already verified');
    });

    it('explains pending KYC', () => {
      expect(
        SPEC.explain({
          user: makeUser(),
          kyc: makeKyc({ pending: true }),
          context: { documentCount: 1 },
        }),
      ).toBe('KYC is already pending review');
    });
  });

  it('strict factory returns instance', () => {
    expect(CanSubmitKycSpecification.strict()).toBeInstanceOf(
      CanSubmitKycSpecification,
    );
  });
});

/**
 * CanVerifyKycSpecification — Unit Tests
 */
import { CanVerifyKycSpecification } from '@domain/specifications/can-verify-kyc.specification.js';

const SPEC = new CanVerifyKycSpecification();

function makeKyc(overrides?: {
  pending?: boolean;
  resubmitted?: boolean;
  verified?: boolean;
  rejected?: boolean;
  documentsLength?: number;
}) {
  return {
    status: {
      isPending: () => overrides?.pending ?? true,
      isResubmitted: () => overrides?.resubmitted ?? false,
      isVerified: () => overrides?.verified ?? false,
      isRejected: () => overrides?.rejected ?? false,
      value: overrides?.verified ? 'verified' : 'pending',
    },
    documents: Array(overrides?.documentsLength ?? 1).fill({}),
  } as unknown as Parameters<typeof SPEC.isSatisfiedBy>[0]['kyc'];
}

function makeCtx(overrides?: {
  reviewerRole?: string;
  reviewerHasPermission?: boolean;
  isSameAsSubmitter?: boolean;
}) {
  return {
    reviewerRole: overrides?.reviewerRole ?? 'admin',
    reviewerHasPermission: overrides?.reviewerHasPermission ?? true,
    isSameAsSubmitter: overrides?.isSameAsSubmitter ?? false,
  };
}

describe('CanVerifyKycSpecification', () => {
  it('returns true for admin verifying pending kyc', () => {
    expect(SPEC.isSatisfiedBy({ kyc: makeKyc(), context: makeCtx() })).toBe(true);
  });

  it('returns true for moderator', () => {
    expect(
      SPEC.isSatisfiedBy({
        kyc: makeKyc(),
        context: makeCtx({ reviewerRole: 'moderator' }),
      }),
    ).toBe(true);
  });

  it('returns false for customer role', () => {
    expect(
      SPEC.isSatisfiedBy({
        kyc: makeKyc(),
        context: makeCtx({ reviewerRole: 'customer' }),
      }),
    ).toBe(false);
  });

  it('returns false when permission denied', () => {
    expect(
      SPEC.isSatisfiedBy({
        kyc: makeKyc(),
        context: makeCtx({ reviewerHasPermission: false }),
      }),
    ).toBe(false);
  });

  it('returns false when reviewer is submitter', () => {
    expect(
      SPEC.isSatisfiedBy({
        kyc: makeKyc(),
        context: makeCtx({ isSameAsSubmitter: true }),
      }),
    ).toBe(false);
  });

  it('returns false when kyc already verified', () => {
    expect(
      SPEC.isSatisfiedBy({
        kyc: makeKyc({ pending: false, verified: true }),
        context: makeCtx(),
      }),
    ).toBe(false);
  });

  it('returns false when no documents', () => {
    expect(
      SPEC.isSatisfiedBy({
        kyc: makeKyc({ documentsLength: 0 }),
        context: makeCtx(),
      }),
    ).toBe(false);
  });

  describe('explain', () => {
    it('returns null when satisfied', () => {
      expect(SPEC.explain({ kyc: makeKyc(), context: makeCtx() })).toBeNull();
    });

    it('explains role not allowed', () => {
      expect(
        SPEC.explain({
          kyc: makeKyc(),
          context: makeCtx({ reviewerRole: 'customer' }),
        }),
      ).toContain('cannot verify KYC');
    });

    it('explains missing permission', () => {
      expect(
        SPEC.explain({
          kyc: makeKyc(),
          context: makeCtx({ reviewerHasPermission: false }),
        }),
      ).toBe('Reviewer does not have KYC verification permission');
    });

    it('explains same submitter', () => {
      expect(
        SPEC.explain({
          kyc: makeKyc(),
          context: makeCtx({ isSameAsSubmitter: true }),
        }),
      ).toBe('Cannot verify own KYC submission');
    });

    it('explains no documents', () => {
      expect(
        SPEC.explain({
          kyc: makeKyc({ documentsLength: 0 }),
          context: makeCtx(),
        }),
      ).toBe('KYC has no documents');
    });

    it('explains non-verifiable status', () => {
      expect(
        SPEC.explain({
          kyc: makeKyc({ pending: false, verified: true }),
          context: makeCtx(),
        }),
      ).toContain('not verifiable');
    });
  });

  it('strict factory returns instance', () => {
    expect(CanVerifyKycSpecification.strict()).toBeInstanceOf(
      CanVerifyKycSpecification,
    );
  });
});

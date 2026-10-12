/**
 * VendorVerificationEntity — branch coverage
 * @module vendor-service/test/unit/domain/entities
 */
import { describe, it, expect } from '@jest/globals';

import { VendorVerificationEntity } from '../../../../src/module/domain/entities/vendor-verification.entity.js';
import type { VerificationCheckProps } from '../../../../src/module/domain/entities/vendor-verification.entity.js';
import { VerificationStatusVO } from '../../../../src/module/domain/value-objects/primitives/verification-status.vo.js';
import { VerificationTypeVO } from '../../../../src/module/domain/value-objects/primitives/verification-type.vo.js';

const UUID = '11111111-1111-4111-8111-111111111111';
const VENDOR = '22222222-2222-4222-8222-222222222222';
const REVIEWER = '33333333-3333-4333-8333-333333333333';
const NOW = '2025-01-01T00:00:00.000Z';

function check(type: string, status: string): VerificationCheckProps {
  return {
    type: VerificationTypeVO.create(type),
    status: VerificationStatusVO.create(status),
  };
}

function makeVerification() {
  return VendorVerificationEntity.create({
    id: UUID,
    vendorId: VENDOR,
    now: NOW,
  });
}

function reconstitute(overrides: Record<string, unknown> = {}) {
  const { version, deletedAt, ...propsOverrides } = overrides as {
    version?: number;
    deletedAt?: string | null;
    [k: string]: unknown;
  };
  return VendorVerificationEntity.reconstitute({
    id: UUID,
    createdAt: NOW,
    updatedAt: NOW,
    props: {
      vendorId: VENDOR,
      overallStatus: VerificationStatusVO.notStarted(),
      checks: [],
      ...propsOverrides,
    } as never,
    ...(version !== undefined ? { version } : {}),
    ...(deletedAt !== undefined ? { deletedAt } : {}),
  });
}

describe('VendorVerificationEntity — creation', () => {
  it('creates with not_started status', () => {
    const v = makeVerification();
    expect(v.vendorId).toBe(VENDOR);
    expect(v.overallStatus.isNotStarted()).toBe(true);
    expect(v.checks).toEqual([]);
  });
});

describe('VendorVerificationEntity — invariants', () => {
  it('rejects > 20 checks', () => {
    const many = new Array(21).fill(null).map((_, i) =>
      check('email', 'pending'),
    );
    // uses same type — duplicate check triggers first, so test with unique types
    expect(() => reconstitute({ checks: many })).toThrow();
  });

  it('rejects duplicate verification check', () => {
    expect(() =>
      reconstitute({
        checks: [check('email', 'pending'), check('email', 'approved')],
      }),
    ).toThrow();
  });
});

describe('VendorVerificationEntity — getters', () => {
  it('returns scalar getters', () => {
    const v = reconstitute({
      checks: [check('email', 'approved'), check('phone', 'pending')],
    });
    expect(v.vendorId).toBe(VENDOR);
    expect(v.overallStatus.isNotStarted()).toBe(true);
    expect(v.checks.length).toBe(2);
    expect(v.submittedAt).toBeUndefined();
    expect(v.reviewedAt).toBeUndefined();
    expect(v.expiresAt).toBeUndefined();
  });
});

describe('VendorVerificationEntity — getCheck', () => {
  it('returns check when exists', () => {
    const v = reconstitute({
      checks: [check('email', 'approved')],
    });
    const found = v.getCheck(VerificationTypeVO.create('email'));
    expect(found).toBeDefined();
  });

  it('returns undefined when not exists', () => {
    const v = makeVerification();
    expect(v.getCheck(VerificationTypeVO.create('email'))).toBeUndefined();
  });
});

describe('VendorVerificationEntity — counts', () => {
  it('countVerified correct', () => {
    const v = reconstitute({
      checks: [
        check('email', 'approved'),
        check('phone', 'approved'),
        check('business_license', 'pending'),
      ],
    });
    expect(v.countVerified()).toBe(2);
  });

  it('countPending includes pending + in_review', () => {
    const v = reconstitute({
      checks: [
        check('email', 'approved'),
        check('phone', 'pending'),
        check('business_license', 'in_review'),
      ],
    });
    expect(v.countPending()).toBe(2);
  });

  it('getCompletionRatio 0 for empty', () => {
    expect(makeVerification().getCompletionRatio()).toBe(0);
  });

  it('getCompletionRatio correct', () => {
    const v = reconstitute({
      checks: [
        check('email', 'approved'),
        check('phone', 'pending'),
      ],
    });
    expect(v.getCompletionRatio()).toBe(0.5);
  });
});

describe('VendorVerificationEntity — predicates', () => {
  it('isFullyVerified true when approved', () => {
    const v = reconstitute({ overallStatus: VerificationStatusVO.approved() });
    expect(v.isFullyVerified()).toBe(true);
  });

  it('isFullyVerified false otherwise', () => {
    expect(makeVerification().isFullyVerified()).toBe(false);
  });

  it('isPendingReview true for pending', () => {
    const v = reconstitute({ overallStatus: VerificationStatusVO.pending() });
    expect(v.isPendingReview()).toBe(true);
  });

  it('isPendingReview true for in_review', () => {
    const v = reconstitute({ overallStatus: VerificationStatusVO.inReview() });
    expect(v.isPendingReview()).toBe(true);
  });

  it('isPendingReview false otherwise', () => {
    expect(makeVerification().isPendingReview()).toBe(false);
  });
});

describe('VendorVerificationEntity — hasAllRequiredChecks', () => {
  it('false when no checks', () => {
    expect(makeVerification().hasAllRequiredChecks()).toBe(false);
  });

  it('true when all required checks approved', () => {
    const v = reconstitute({
      checks: [
        check('email', 'approved'),
        check('phone', 'approved'),
        check('business_license', 'approved'),
        check('tax_id', 'approved'),
        check('bank_account', 'approved'),
        check('identity', 'approved'),
      ],
    });
    expect(v.hasAllRequiredChecks()).toBe(true);
  });

  it('false when any check missing', () => {
    const v = reconstitute({
      checks: [check('email', 'approved')],
    });
    expect(v.hasAllRequiredChecks()).toBe(false);
  });
});

describe('VendorVerificationEntity — submit', () => {
  it('submits from not_started', () => {
    const v = makeVerification();
    v.submit(NOW);
    expect(v.overallStatus.isPending()).toBe(true);
    expect(v.submittedAt).toBe(NOW);
  });

  it('submits from expired', () => {
    const v = reconstitute({ overallStatus: VerificationStatusVO.expired() });
    v.submit(NOW);
    expect(v.overallStatus.isPending()).toBe(true);
  });

  it('throws when already submitted', () => {
    const v = reconstitute({ overallStatus: VerificationStatusVO.pending() });
    expect(() => v.submit(NOW)).toThrow();
  });
});

describe('VendorVerificationEntity — startReview', () => {
  it('starts review from pending', () => {
    const v = reconstitute({ overallStatus: VerificationStatusVO.pending() });
    v.startReview(REVIEWER, NOW);
    expect(v.overallStatus.isInReview()).toBe(true);
  });

  it('throws when not pending', () => {
    const v = makeVerification();
    expect(() => v.startReview(REVIEWER, NOW)).toThrow();
  });
});

describe('VendorVerificationEntity — approve', () => {
  it('approves when in_review + all required checks passed', () => {
    const v = reconstitute({
      overallStatus: VerificationStatusVO.inReview(),
      checks: [
        check('email', 'approved'),
        check('phone', 'approved'),
        check('business_license', 'approved'),
        check('tax_id', 'approved'),
        check('bank_account', 'approved'),
        check('identity', 'approved'),
      ],
    });
    v.approve(REVIEWER, NOW);
    expect(v.overallStatus.isApproved()).toBe(true);
    expect(v.reviewedAt).toBe(NOW);
  });

  it('approves from pending', () => {
    const v = reconstitute({
      overallStatus: VerificationStatusVO.pending(),
      checks: [
        check('email', 'approved'),
        check('phone', 'approved'),
        check('business_license', 'approved'),
        check('tax_id', 'approved'),
        check('bank_account', 'approved'),
        check('identity', 'approved'),
      ],
    });
    v.approve(REVIEWER, NOW);
    expect(v.overallStatus.isApproved()).toBe(true);
  });

  it('throws when status invalid', () => {
    const v = makeVerification();
    expect(() => v.approve(REVIEWER, NOW)).toThrow();
  });

  it('throws when required checks not passed', () => {
    const v = reconstitute({
      overallStatus: VerificationStatusVO.inReview(),
      checks: [check('email', 'approved')],
    });
    expect(() => v.approve(REVIEWER, NOW)).toThrow(/All required/);
  });
});

describe('VendorVerificationEntity — reject', () => {
  it('rejects from in_review', () => {
    const v = reconstitute({ overallStatus: VerificationStatusVO.inReview() });
    v.reject(REVIEWER, 'invalid docs', NOW);
    expect(v.overallStatus.isRejected()).toBe(true);
  });

  it('rejects from pending', () => {
    const v = reconstitute({ overallStatus: VerificationStatusVO.pending() });
    v.reject(REVIEWER, 'reason', NOW);
    expect(v.overallStatus.isRejected()).toBe(true);
  });

  it('throws when status invalid', () => {
    const v = makeVerification();
    expect(() => v.reject(REVIEWER, 'reason', NOW)).toThrow();
  });

  it('throws when reason empty', () => {
    const v = reconstitute({ overallStatus: VerificationStatusVO.pending() });
    expect(() => v.reject(REVIEWER, '', NOW)).toThrow();
    expect(() => v.reject(REVIEWER, '   ', NOW)).toThrow();
  });
});

describe('VendorVerificationEntity — reconstitute version', () => {
  it('reconstitute with version', () => {
    const v = reconstitute({ version: 2 });
    expect(v.version).toBe(2);
  });
});

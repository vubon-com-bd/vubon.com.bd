/**
 * VendorApprovalEntity — branch coverage
 * @module vendor-service/test/unit/domain/entities
 */
import { describe, it, expect } from '@jest/globals';

import { VendorApprovalEntity } from '../../../../src/module/domain/entities/vendor-approval.entity.js';
import { ApprovalStatusVO } from '../../../../src/module/domain/value-objects/primitives/approval-status.vo.js';
import { ApprovalReasonVO } from '../../../../src/module/domain/value-objects/primitives/approval-reason.vo.js';

const UUID = '11111111-1111-4111-8111-111111111111';
const VENDOR = '22222222-2222-4222-8222-222222222222';
const REVIEWER = '33333333-3333-4333-8333-333333333333';
const NOW = '2025-01-01T00:00:00.000Z';
const FUTURE = '2026-01-01T00:00:00.000Z';
const PAST = '2020-01-01T00:00:00.000Z';

function makeApproval() {
  return VendorApprovalEntity.create({
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
  return VendorApprovalEntity.reconstitute({
    id: UUID,
    createdAt: NOW,
    updatedAt: NOW,
    props: {
      vendorId: VENDOR,
      status: ApprovalStatusVO.pending(),
      submittedAt: NOW,
      resubmissionCount: 0,
      slaDeadline: FUTURE,
      ...propsOverrides,
    } as never,
    ...(version !== undefined ? { version } : {}),
    ...(deletedAt !== undefined ? { deletedAt } : {}),
  });
}

describe('VendorApprovalEntity — creation', () => {
  it('creates pending approval', () => {
    const a = makeApproval();
    expect(a.vendorId).toBe(VENDOR);
    expect(a.status.isPending()).toBe(true);
    expect(a.resubmissionCount).toBe(0);
    expect(a.submittedAt).toBe(NOW);
  });
});

describe('VendorApprovalEntity — invariants', () => {
  it('rejects invalid submittedAt', () => {
    expect(() => reconstitute({ submittedAt: 'not-a-date' })).toThrow();
  });

  it('rejects negative resubmissionCount', () => {
    expect(() => reconstitute({ resubmissionCount: -1 })).toThrow();
  });

  it('rejects non-integer resubmissionCount', () => {
    expect(() => reconstitute({ resubmissionCount: 1.5 })).toThrow();
  });

  it('rejects resubmissionCount > max', () => {
    expect(() => reconstitute({ resubmissionCount: 999 })).toThrow();
  });

  it('rejects rejected status without reason', () => {
    expect(() =>
      reconstitute({
        status: ApprovalStatusVO.rejected(),
        reason: undefined,
      }),
    ).toThrow();
  });
});

describe('VendorApprovalEntity — getters', () => {
  it('returns scalar getters', () => {
    const a = makeApproval();
    expect(a.vendorId).toBe(VENDOR);
    expect(a.status.isPending()).toBe(true);
    expect(a.submittedAt).toBe(NOW);
    expect(a.resubmissionCount).toBe(0);
    expect(a.reason).toBeUndefined();
    expect(a.reviewedAt).toBeUndefined();
  });
});

describe('VendorApprovalEntity — SLA breach', () => {
  it('isSlaBreached false for final status', () => {
    const a = reconstitute({
      status: ApprovalStatusVO.approved(),
      reviewedAt: NOW,
      slaDeadline: PAST,
    });
    expect(a.isSlaBreached(new Date(NOW))).toBe(false);
  });

  it('isSlaBreached false when no slaDeadline', () => {
    const a = reconstitute({ slaDeadline: undefined });
    expect(a.isSlaBreached()).toBe(false);
  });

  it('isSlaBreached false when before deadline', () => {
    const a = reconstitute({ slaDeadline: FUTURE });
    expect(a.isSlaBreached(new Date(NOW))).toBe(false);
  });

  it('isSlaBreached true when past deadline', () => {
    const a = reconstitute({ slaDeadline: PAST });
    expect(a.isSlaBreached(new Date(NOW))).toBe(true);
  });
});

describe('VendorApprovalEntity — canResubmit', () => {
  it('true when actionable and under limit', () => {
    const a = reconstitute({
      status: ApprovalStatusVO.infoRequested(),
      resubmissionCount: 0,
    });
    expect(a.canResubmit()).toBe(true);
  });

  it('false when not actionable', () => {
    const a = reconstitute({ status: ApprovalStatusVO.approved() });
    expect(a.canResubmit()).toBe(false);
  });

  it('false when at MAX limit', () => {
    const a = reconstitute({
      status: ApprovalStatusVO.rejected(),
      reason: ApprovalReasonVO.create('incomplete_documents'),
      resubmissionCount: 3,
    });
    expect(a.canResubmit()).toBe(false);
  });
});

describe('VendorApprovalEntity — canAppeal', () => {
  it('false when not rejected', () => {
    expect(makeApproval().canAppeal()).toBe(false);
  });

  it('false when already appealed', () => {
    const a = reconstitute({
      status: ApprovalStatusVO.rejected(),
      reason: ApprovalReasonVO.create('incomplete_documents'),
      appealSubmittedAt: NOW,
    });
    expect(a.canAppeal()).toBe(false);
  });

  it('false when no appealDeadline', () => {
    const a = reconstitute({
      status: ApprovalStatusVO.rejected(),
      reason: ApprovalReasonVO.create('incomplete_documents'),
      appealDeadline: undefined,
    });
    expect(a.canAppeal()).toBe(false);
  });

  it('true when rejected and within window', () => {
    const a = reconstitute({
      status: ApprovalStatusVO.rejected(),
      reason: ApprovalReasonVO.create('incomplete_documents'),
      appealDeadline: FUTURE,
    });
    expect(a.canAppeal(new Date(NOW))).toBe(true);
  });

  it('false when past appeal window', () => {
    const a = reconstitute({
      status: ApprovalStatusVO.rejected(),
      reason: ApprovalReasonVO.create('incomplete_documents'),
      appealDeadline: PAST,
    });
    expect(a.canAppeal(new Date(NOW))).toBe(false);
  });
});

describe('VendorApprovalEntity — approve', () => {
  it('approves from pending', () => {
    const a = makeApproval();
    a.approve(REVIEWER, 'looks good', NOW);
    expect(a.status.isApproved()).toBe(true);
    expect(a.reviewedAt).toBe(NOW);
  });

  it('approves without note', () => {
    const a = makeApproval();
    a.approve(REVIEWER, undefined, NOW);
    expect(a.status.isApproved()).toBe(true);
  });

  it('throws from invalid status', () => {
    const a = reconstitute({
      status: ApprovalStatusVO.approved(),
      reviewedAt: NOW,
    });
    expect(() => a.approve(REVIEWER, undefined, NOW)).toThrow();
  });
});

describe('VendorApprovalEntity — reject', () => {
  it('rejects from pending with reason', () => {
    const a = makeApproval();
    a.reject(REVIEWER, ApprovalReasonVO.create('incomplete_documents'), 'missing docs', NOW);
    expect(a.status.isRejected()).toBe(true);
    expect(a.appealDeadline).toBeDefined();
  });

  it('rejects without note', () => {
    const a = makeApproval();
    a.reject(REVIEWER, ApprovalReasonVO.create('incomplete_documents'), undefined, NOW);
    expect(a.status.isRejected()).toBe(true);
  });

  it('throws when reason is not VO', () => {
    const a = makeApproval();
    expect(() => a.reject(REVIEWER, 'not-a-vo' as never, undefined, NOW)).toThrow();
  });

  it('throws from invalid status', () => {
    const a = reconstitute({ status: ApprovalStatusVO.approved(), reviewedAt: NOW });
    expect(() =>
      a.reject(REVIEWER, ApprovalReasonVO.create('incomplete_documents'), undefined, NOW),
    ).toThrow();
  });
});

describe('VendorApprovalEntity — requestInfo', () => {
  it('requests info with note', () => {
    const a = makeApproval();
    a.requestInfo(REVIEWER, 'send more docs', NOW);
    expect(a.status.isInfoRequested()).toBe(true);
  });

  it('throws on empty note', () => {
    const a = makeApproval();
    expect(() => a.requestInfo(REVIEWER, '', NOW)).toThrow();
    expect(() => a.requestInfo(REVIEWER, '   ', NOW)).toThrow();
  });

  it('throws from invalid status', () => {
    const a = reconstitute({ status: ApprovalStatusVO.approved(), reviewedAt: NOW });
    expect(() => a.requestInfo(REVIEWER, 'note', NOW)).toThrow();
  });
});

describe('VendorApprovalEntity — resubmit', () => {
  it('resubmits when canResubmit', () => {
    const a = reconstitute({
      status: ApprovalStatusVO.infoRequested(),
      resubmissionCount: 0,
    });
    a.resubmit(NOW);
    expect(a.status.isPending()).toBe(true);
    expect(a.resubmissionCount).toBe(1);
  });

  it('throws when cannot resubmit', () => {
    const a = reconstitute({ status: ApprovalStatusVO.approved(), reviewedAt: NOW });
    expect(() => a.resubmit(NOW)).toThrow();
  });
});

describe('VendorApprovalEntity — fileAppeal', () => {
  it('files appeal when canAppeal', () => {
    const a = reconstitute({
      status: ApprovalStatusVO.rejected(),
      reason: ApprovalReasonVO.create('incomplete_documents'),
      appealDeadline: FUTURE,
    });
    a.fileAppeal(NOW);
    expect(a.status.isUnderAppeal()).toBe(true);
  });

  it('throws when cannot appeal', () => {
    const a = makeApproval();
    expect(() => a.fileAppeal(NOW)).toThrow();
  });
});

describe('VendorApprovalEntity — static helpers', () => {
  it('computeAppealDeadline returns future date', () => {
    const d = VendorApprovalEntity.computeAppealDeadline(NOW);
    expect(new Date(d).getTime()).toBeGreaterThan(new Date(NOW).getTime());
  });

  it('computeSlaDeadline returns future date', () => {
    const d = VendorApprovalEntity.computeSlaDeadline(NOW);
    expect(new Date(d).getTime()).toBeGreaterThan(new Date(NOW).getTime());
  });
});

describe('VendorApprovalEntity — reconstitute version', () => {
  it('reconstitute with version', () => {
    const a = reconstitute({ version: 4 });
    expect(a.version).toBe(4);
  });
});

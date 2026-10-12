import { VendorApprovalSummaryVO } from '../../../../../src/module/domain/value-objects/composites/vendor-approval-summary.vo.js';
import { ApprovalStatusVO } from '../../../../../src/module/domain/value-objects/primitives/approval-status.vo.js';
import { ApprovalReasonVO } from '../../../../../src/module/domain/value-objects/primitives/approval-reason.vo.js';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

const NOW = '2026-01-01T00:00:00.000Z';
const LATER = '2026-01-05T00:00:00.000Z';
const APPEAL_FUTURE = '2026-03-01T00:00:00.000Z';

function makeSummary(overrides: {
  status?: ApprovalStatusVO;
  reason?: ApprovalReasonVO;
  resubmissionCount?: number;
  reviewedAt?: string;
  appealDeadline?: string;
} = {}): VendorApprovalSummaryVO {
  return VendorApprovalSummaryVO.create({
    status: overrides.status ?? ApprovalStatusVO.pending(),
    reason: overrides.reason,
    submittedAt: NOW,
    reviewedAt: overrides.reviewedAt,
    resubmissionCount: overrides.resubmissionCount ?? 0,
    appealDeadline: overrides.appealDeadline,
  });
}

describe('VendorApprovalSummaryVO', () => {
  describe('create()', () => {
    it('creates with pending status', () => {
      const v = makeSummary();
      expect(v.status.isPending()).toBe(true);
      expect(v.resubmissionCount).toBe(0);
    });

    it('throws on invalid submittedAt', () => {
      expect(() =>
        VendorApprovalSummaryVO.create({
          status: ApprovalStatusVO.pending(),
          submittedAt: 'not-a-date',
          resubmissionCount: 0,
        }),
      ).toThrow(ValidationError);
    });

    it('throws on negative resubmissionCount', () => {
      expect(() => makeSummary({ resubmissionCount: -1 })).toThrow(ValidationError);
    });

    it('throws when resubmissions exceed max', () => {
      expect(() => makeSummary({ resubmissionCount: 999 })).toThrow(ValidationError);
    });

    it('throws when rejected missing reason', () => {
      expect(() =>
        makeSummary({ status: ApprovalStatusVO.rejected() }),
      ).toThrow(ValidationError);
    });

    it('throws when final missing reviewedAt', () => {
      expect(() =>
        makeSummary({ status: ApprovalStatusVO.approved(), reviewedAt: undefined }),
      ).toThrow(ValidationError);
    });
  });

  describe('isSlaBreached()', () => {
    it('false for fresh submission', () => {
      expect(makeSummary().isSlaBreached(new Date('2026-01-01T01:00:00Z'))).toBe(false);
    });

    it('true for stale submission', () => {
      expect(makeSummary().isSlaBreached(new Date('2026-02-01T00:00:00Z'))).toBe(true);
    });

    it('false for final status', () => {
      const v = makeSummary({
        status: ApprovalStatusVO.approved(),
        reviewedAt: LATER,
      });
      expect(v.isSlaBreached(new Date('2027-01-01T00:00:00Z'))).toBe(false);
    });
  });

  describe('hoursInReview()', () => {
    it('returns hours since submittedAt', () => {
      expect(makeSummary().hoursInReview(new Date('2026-01-01T05:00:00Z'))).toBe(5);
    });

    it('0 for immediate check', () => {
      expect(makeSummary().hoursInReview(new Date(NOW))).toBe(0);
    });
  });

  describe('canResubmit()', () => {
    it('false for pending', () => {
      expect(makeSummary().canResubmit()).toBe(false);
    });

    it('true for info_requested under limit', () => {
      const v = makeSummary({ status: ApprovalStatusVO.infoRequested() });
      expect(v.canResubmit()).toBe(true);
    });

    it('true for rejected under limit', () => {
      const v = makeSummary({
        status: ApprovalStatusVO.rejected(),
        reason: ApprovalReasonVO.create('invalid_documents'),
        reviewedAt: LATER,
      });
      expect(v.canResubmit()).toBe(true);
    });
  });

  describe('canAppeal()', () => {
    it('false for pending', () => {
      expect(makeSummary().canAppeal()).toBe(false);
    });

    it('true within window', () => {
      const v = makeSummary({
        status: ApprovalStatusVO.rejected(),
        reason: ApprovalReasonVO.create('invalid_documents'),
        reviewedAt: LATER,
        appealDeadline: APPEAL_FUTURE,
      });
      expect(v.canAppeal(new Date('2026-02-01T00:00:00Z'))).toBe(true);
    });

    it('false after window', () => {
      const v = makeSummary({
        status: ApprovalStatusVO.rejected(),
        reason: ApprovalReasonVO.create('invalid_documents'),
        reviewedAt: LATER,
        appealDeadline: '2026-02-01T00:00:00Z',
      });
      expect(v.canAppeal(new Date('2026-06-01T00:00:00Z'))).toBe(false);
    });
  });

  describe('static computeAppealDeadline()', () => {
    it('returns date after rejection', () => {
      const d = VendorApprovalSummaryVO.computeAppealDeadline(NOW);
      expect(Date.parse(d)).toBeGreaterThan(Date.parse(NOW));
    });
  });
});

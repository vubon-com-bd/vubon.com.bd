import { VendorVerificationSummaryVO } from '../../../../../src/module/domain/value-objects/composites/vendor-verification-summary.vo.js';
import { VerificationStatusVO } from '../../../../../src/module/domain/value-objects/primitives/verification-status.vo.js';
import { VerificationTypeVO } from '../../../../../src/module/domain/value-objects/primitives/verification-type.vo.js';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

function allApproved() {
  return [
    { type: VerificationTypeVO.create('email'), status: VerificationStatusVO.approved() },
    { type: VerificationTypeVO.create('phone'), status: VerificationStatusVO.approved() },
    { type: VerificationTypeVO.create('business_license'), status: VerificationStatusVO.approved() },
    { type: VerificationTypeVO.create('tax_id'), status: VerificationStatusVO.approved() },
    { type: VerificationTypeVO.create('bank_account'), status: VerificationStatusVO.approved() },
    { type: VerificationTypeVO.create('identity'), status: VerificationStatusVO.approved() },
  ];
}

function makeSummary(overrides: {
  overallStatus?: VerificationStatusVO;
  checks?: Array<{ type: VerificationTypeVO; status: VerificationStatusVO }>;
} = {}): VendorVerificationSummaryVO {
  return VendorVerificationSummaryVO.create({
    overallStatus: overrides.overallStatus ?? VerificationStatusVO.pending(),
    checks: overrides.checks ?? [],
  });
}

describe('VendorVerificationSummaryVO', () => {
  describe('create()', () => {
    it('creates valid summary', () => {
      const v = makeSummary({ checks: allApproved() });
      expect(v.checks).toHaveLength(6);
    });

    it('throws on duplicate check types', () => {
      expect(() =>
        makeSummary({
          checks: [
            { type: VerificationTypeVO.create('email'), status: VerificationStatusVO.approved() },
            { type: VerificationTypeVO.create('email'), status: VerificationStatusVO.pending() },
          ],
        }),
      ).toThrow(ValidationError);
    });

    it('throws when too many checks', () => {
      expect(() => makeSummary({ checks: new Array(25).fill(null).map((_, i) => ({
        type: VerificationTypeVO.create(`type-${i}`),
        status: VerificationStatusVO.pending(),
      })) })).toThrow(ValidationError);
    });
  });

  describe('countVerified / countPending / countRejected', () => {
    it('countVerified', () => {
      expect(makeSummary({ checks: allApproved() }).countVerified()).toBe(6);
    });

    it('countPending', () => {
      const v = makeSummary({ checks: [
        { type: VerificationTypeVO.create('email'), status: VerificationStatusVO.pending() },
        { type: VerificationTypeVO.create('phone'), status: VerificationStatusVO.inReview() },
      ]});
      expect(v.countPending()).toBe(2);
    });

    it('countRejected', () => {
      const v = makeSummary({ checks: [
        { type: VerificationTypeVO.create('email'), status: VerificationStatusVO.rejected() },
      ]});
      expect(v.countRejected()).toBe(1);
    });
  });

  describe('completionRatio', () => {
    it('1 when all approved', () => {
      expect(makeSummary({ checks: allApproved() }).completionRatio()).toBe(1);
    });

    it('0.5 when half approved', () => {
      const v = makeSummary({ checks: [
        { type: VerificationTypeVO.create('email'), status: VerificationStatusVO.approved() },
        { type: VerificationTypeVO.create('phone'), status: VerificationStatusVO.pending() },
      ]});
      expect(v.completionRatio()).toBe(0.5);
    });
  });

  describe('getCheck / hasCheck', () => {
    it('getCheck returns match', () => {
      const v = makeSummary({ checks: allApproved() });
      const c = v.getCheck(VerificationTypeVO.create('email'));
      expect(c).toBeDefined();
    });

    it('hasCheck true for existing', () => {
      const v = makeSummary({ checks: allApproved() });
      expect(v.hasCheck(VerificationTypeVO.create('email'))).toBe(true);
    });

    it('hasCheck false for missing', () => {
      expect(makeSummary().hasCheck(VerificationTypeVO.create('email'))).toBe(false);
    });
  });

  describe('allRequiredChecksPassed', () => {
    it('true with all 6 checks approved', () => {
      expect(makeSummary({ checks: allApproved() }).allRequiredChecksPassed()).toBe(true);
    });

    it('false with missing checks', () => {
      expect(makeSummary({ checks: [] }).allRequiredChecksPassed()).toBe(false);
    });
  });

  describe('isFullyVerified / isPendingReview', () => {
    it('isFullyVerified when overallStatus approved', () => {
      expect(makeSummary({ overallStatus: VerificationStatusVO.approved() }).isFullyVerified()).toBe(true);
    });

    it('isPendingReview when in_review', () => {
      expect(makeSummary({ overallStatus: VerificationStatusVO.inReview() }).isPendingReview()).toBe(true);
    });
  });
});

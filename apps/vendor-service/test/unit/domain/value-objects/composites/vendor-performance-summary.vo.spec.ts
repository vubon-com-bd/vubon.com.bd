import { VendorPerformanceSummaryVO } from '../../../../../src/module/domain/value-objects/composites/vendor-performance-summary.vo.js';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

const NOW = '2026-01-01T00:00:00.000Z';
const END = '2026-01-31T00:00:00.000Z';

function makeSummary(overrides: {
  grade?: string;
  overallScore?: number;
  orderCount?: number;
  isSuspended?: boolean;
} = {}): VendorPerformanceSummaryVO {
  return VendorPerformanceSummaryVO.create({
    grade: (overrides.grade ?? 'a') as never,
    overallScore: overrides.overallScore ?? 92,
    metrics: [
      { name: 'order_fulfillment_rate', value: 95, target: 100 },
      { name: 'on_time_shipping_rate', value: 90, target: 100 },
    ],
    evaluationPeriodStart: NOW,
    evaluationPeriodEnd: END,
    orderCount: overrides.orderCount ?? 100,
    isSuspended: overrides.isSuspended ?? false,
    warningIssued: false,
  });
}

describe('VendorPerformanceSummaryVO', () => {
  describe('create()', () => {
    it('creates valid summary', () => {
      const v = makeSummary();
      expect(v.grade).toBe('a');
      expect(v.overallScore).toBe(92);
    });

    it('throws on invalid grade', () => {
      expect(() => makeSummary({ grade: 'z' })).toThrow(ValidationError);
    });

    it('throws on score out of range', () => {
      expect(() => makeSummary({ overallScore: -1 })).toThrow(ValidationError);
      expect(() => makeSummary({ overallScore: 101 })).toThrow(ValidationError);
    });

    it('throws on negative orderCount', () => {
      expect(() => makeSummary({ orderCount: -1 })).toThrow(ValidationError);
    });

    it('throws on invalid period', () => {
      expect(() =>
        VendorPerformanceSummaryVO.create({
          grade: 'a' as never,
          overallScore: 92,
          metrics: [],
          evaluationPeriodStart: END,
          evaluationPeriodEnd: NOW,
          orderCount: 10,
          isSuspended: false,
          warningIssued: false,
        }),
      ).toThrow(ValidationError);
    });
  });

  describe('isTopPerformer', () => {
    it('true for a_plus', () => {
      expect(makeSummary({ grade: 'a_plus' }).isTopPerformer()).toBe(true);
    });

    it('true for a', () => {
      expect(makeSummary({ grade: 'a' }).isTopPerformer()).toBe(true);
    });

    it('false for b', () => {
      expect(makeSummary({ grade: 'b' }).isTopPerformer()).toBe(false);
    });
  });

  describe('isAtRisk / shouldAutoSuspend', () => {
    it('isAtRisk for low score', () => {
      expect(makeSummary({ overallScore: 50 }).isAtRisk()).toBe(true);
    });

    it('isAtRisk false for good score', () => {
      expect(makeSummary({ overallScore: 90 }).isAtRisk()).toBe(false);
    });

    it('shouldAutoSuspend for very low score', () => {
      expect(makeSummary({ overallScore: 30 }).shouldAutoSuspend()).toBe(true);
    });

    it('shouldAutoSuspend false for warning score', () => {
      expect(makeSummary({ overallScore: 50 }).shouldAutoSuspend()).toBe(false);
    });
  });

  describe('hasEnoughData', () => {
    it('true with enough orders', () => {
      expect(makeSummary({ orderCount: 20 }).hasEnoughData()).toBe(true);
    });

    it('false with too few', () => {
      expect(makeSummary({ orderCount: 5 }).hasEnoughData()).toBe(false);
    });
  });

  describe('getGradeLabel', () => {
    it('returns display label', () => {
      expect(makeSummary({ grade: 'a_plus' }).getGradeLabel()).toBe('A+');
      expect(makeSummary({ grade: 'a' }).getGradeLabel()).toBe('A');
      expect(makeSummary({ grade: 'f' }).getGradeLabel()).toBe('F');
    });
  });

  describe('getWorstMetric / getBestMetric', () => {
    it('getWorstMetric returns lowest ratio', () => {
      const v = makeSummary();
      expect(v.getWorstMetric()?.name).toBe('on_time_shipping_rate');
    });

    it('getBestMetric returns highest ratio', () => {
      const v = makeSummary();
      expect(v.getBestMetric()?.name).toBe('order_fulfillment_rate');
    });

    it('returns undefined for empty metrics', () => {
      const v = VendorPerformanceSummaryVO.create({
        grade: 'a' as never,
        overallScore: 92,
        metrics: [],
        evaluationPeriodStart: NOW,
        evaluationPeriodEnd: END,
        orderCount: 10,
        isSuspended: false,
        warningIssued: false,
      });
      expect(v.getWorstMetric()).toBeUndefined();
      expect(v.getBestMetric()).toBeUndefined();
    });
  });

  describe('static gradeFromScore', () => {
    it('96 → a_plus', () => {
      expect(VendorPerformanceSummaryVO.gradeFromScore(96)).toBe('a_plus');
    });
    it('92 → a', () => {
      expect(VendorPerformanceSummaryVO.gradeFromScore(92)).toBe('a');
    });
    it('30 → f', () => {
      expect(VendorPerformanceSummaryVO.gradeFromScore(30)).toBe('f');
    });
  });
});

/**
 * VendorPerformanceEvaluatorService — unit tests
 * @module vendor-service/test/unit/domain/services
 */
import { VendorPerformanceEvaluatorService } from '../../../../src/module/domain/services/vendor-performance-evaluator.service.js';
import { PerformanceMetricTypeVO } from '../../../../src/module/domain/value-objects/primitives/performance-metric-type.vo.js';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import type { MetricInput } from '../../../../src/module/domain/services/vendor-performance-evaluator.service.js';

function metric(name: string, value: number, target: number): MetricInput {
  return {
    metric: PerformanceMetricTypeVO.create(name),
    value,
    target,
  };
}

describe('VendorPerformanceEvaluatorService', () => {
  describe('computeOverallScore()', () => {
    it('returns 0 for empty metrics', () => {
      expect(VendorPerformanceEvaluatorService.computeOverallScore([])).toBe(0);
    });

    it('scores higher-better metric by value/target ratio', () => {
      const score = VendorPerformanceEvaluatorService.computeOverallScore([
        metric('order_fulfillment_rate', 90, 100),
      ]);
      expect(score).toBe(90);
    });

    it('caps higher-better at 100 (ratio <= 1)', () => {
      const score = VendorPerformanceEvaluatorService.computeOverallScore([
        metric('order_fulfillment_rate', 150, 100),
      ]);
      expect(score).toBe(100);
    });

    it('scores lower-better metric by target/value ratio', () => {
      const score = VendorPerformanceEvaluatorService.computeOverallScore([
        metric('return_rate', 5, 5),
      ]);
      expect(score).toBe(100);
    });

    it('penalizes lower-better metric above target', () => {
      const score = VendorPerformanceEvaluatorService.computeOverallScore([
        metric('return_rate', 10, 5),
      ]);
      expect(score).toBe(50);
    });
  });

  describe('gradeFromScore()', () => {
    it('96 → A+', () => {
      expect(VendorPerformanceEvaluatorService.gradeFromScore(96).value).toBe('a_plus');
    });
    it('92 → A', () => {
      expect(VendorPerformanceEvaluatorService.gradeFromScore(92).value).toBe('a');
    });
    it('85 → B', () => {
      expect(VendorPerformanceEvaluatorService.gradeFromScore(85).value).toBe('b');
    });
    it('75 → C', () => {
      expect(VendorPerformanceEvaluatorService.gradeFromScore(75).value).toBe('c');
    });
    it('65 → D', () => {
      expect(VendorPerformanceEvaluatorService.gradeFromScore(65).value).toBe('d');
    });
    it('30 → F', () => {
      expect(VendorPerformanceEvaluatorService.gradeFromScore(30).value).toBe('f');
    });
  });

  describe('decideAction()', () => {
    it('suspend when below auto-suspend threshold', () => {
      const r = VendorPerformanceEvaluatorService.decideAction(30);
      expect(r.action).toBe('suspend');
    });
    it('warn when between suspend and warning', () => {
      const r = VendorPerformanceEvaluatorService.decideAction(50);
      expect(r.action).toBe('warn');
    });
    it('none when healthy', () => {
      const r = VendorPerformanceEvaluatorService.decideAction(85);
      expect(r.action).toBe('none');
    });
  });

  describe('evaluate()', () => {
    it('throws on invalid metric value', () => {
      expect(() =>
        VendorPerformanceEvaluatorService.evaluate([
          metric('order_fulfillment_rate', -1, 100),
        ]),
      ).toThrow(ValidationError);
    });

    it('throws on invalid target', () => {
      expect(() =>
        VendorPerformanceEvaluatorService.evaluate([
          metric('order_fulfillment_rate', 90, 0),
        ]),
      ).toThrow(ValidationError);
    });

    it('returns grade + action for healthy metrics', () => {
      const r = VendorPerformanceEvaluatorService.evaluate([
        metric('order_fulfillment_rate', 95, 100),
      ]);
      expect(r.overallScore).toBe(95);
      expect(r.grade.value).toBe('a_plus');
      expect(r.action).toBe('none');
    });
  });

  describe('shouldSuspend() / shouldWarn()', () => {
    it('suspend below 40', () => {
      expect(VendorPerformanceEvaluatorService.shouldSuspend(30)).toBe(true);
      expect(VendorPerformanceEvaluatorService.shouldSuspend(50)).toBe(false);
    });
    it('warn between 40-60', () => {
      expect(VendorPerformanceEvaluatorService.shouldWarn(50)).toBe(true);
      expect(VendorPerformanceEvaluatorService.shouldWarn(30)).toBe(false);
      expect(VendorPerformanceEvaluatorService.shouldWarn(70)).toBe(false);
    });
  });

  describe('isTopPerformer()', () => {
    it('false when orderCount below min', () => {
      expect(VendorPerformanceEvaluatorService.isTopPerformer(95, 5)).toBe(false);
    });
    it('true when score >= 90 and enough orders', () => {
      expect(VendorPerformanceEvaluatorService.isTopPerformer(95, 20)).toBe(true);
    });
  });

  describe('shouldReinstate()', () => {
    it('true when score >= 80 and enough orders', () => {
      expect(VendorPerformanceEvaluatorService.shouldReinstate(85, 15)).toBe(true);
    });
    it('false when score below 80', () => {
      expect(VendorPerformanceEvaluatorService.shouldReinstate(70, 15)).toBe(false);
    });
  });

  describe('worstMetric() / bestMetric()', () => {
    it('returns worst metric by ratio', () => {
      const metrics = [
        metric('order_fulfillment_rate', 95, 100),
        metric('return_rate', 10, 5),
        metric('on_time_shipping_rate', 80, 100),
      ];
      const worst = VendorPerformanceEvaluatorService.worstMetric(metrics);
      expect(worst?.metric.value).toBe('return_rate');
    });

    it('returns best metric by ratio', () => {
      const metrics = [
        metric('order_fulfillment_rate', 95, 100),
        metric('return_rate', 10, 5),
      ];
      const best = VendorPerformanceEvaluatorService.bestMetric(metrics);
      expect(best?.metric.value).toBe('order_fulfillment_rate');
    });

    it('returns undefined for empty array', () => {
      expect(VendorPerformanceEvaluatorService.worstMetric([])).toBeUndefined();
      expect(VendorPerformanceEvaluatorService.bestMetric([])).toBeUndefined();
    });
  });
});

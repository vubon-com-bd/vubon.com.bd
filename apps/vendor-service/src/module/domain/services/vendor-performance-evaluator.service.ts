/**
 * VendorPerformanceEvaluatorService
 * @module vendor-service/domain/services
 *
 * Compute performance score from raw metrics, decide on actions.
 */
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { PerformanceMetricTypeVO } from '../value-objects/primitives/performance-metric-type.vo.js';
import { PerformanceGradeVO } from '../value-objects/primitives/performance-grade.vo.js';
import { VENDOR_PERFORMANCE } from '@vubon/shared-constants/business';

export interface MetricInput {
  readonly metric: PerformanceMetricTypeVO;
  readonly value: number;
  readonly target: number;
}

export interface MetricResult {
  readonly metric: PerformanceMetricTypeVO;
  readonly value: number;
  readonly target: number;
  readonly grade: PerformanceGradeVO;
}

export type PerformanceAction = 'none' | 'warn' | 'suspend';

export interface EvaluationResult {
  readonly overallScore: number;
  readonly grade: PerformanceGradeVO;
  readonly metrics: readonly MetricResult[];
  readonly action: PerformanceAction;
  readonly reason?: string;
}

export class VendorPerformanceEvaluatorService {
  /** Score contribution of one metric (0-100). */
  private static metricRatio(input: MetricInput): number {
    if (input.target <= 0) return 1;
    if (input.metric.isHigherBetter()) {
      return Math.min(1, input.value / input.target);
    }
    // lower is better (e.g. cancellation rate, response time)
    return Math.min(1, input.target / Math.max(input.value, 0.0001));
  }

  /** Compute overall score as average of metric ratios × 100. */
  static computeOverallScore(metrics: readonly MetricInput[]): number {
    if (metrics.length === 0) return 0;
    let sum = 0;
    for (const m of metrics) {
      sum += VendorPerformanceEvaluatorService.metricRatio(m);
    }
    return Math.round((sum / metrics.length) * 10000) / 100;
  }

  /** Grade from a numeric score. */
  static gradeFromScore(score: number): PerformanceGradeVO {
    return PerformanceGradeVO.reconstitute(
      score >= VENDOR_PERFORMANCE.A_PLUS_THRESHOLD ? 'a_plus'
      : score >= VENDOR_PERFORMANCE.A_THRESHOLD ? 'a'
      : score >= VENDOR_PERFORMANCE.B_THRESHOLD ? 'b'
      : score >= VENDOR_PERFORMANCE.C_THRESHOLD ? 'c'
      : score >= VENDOR_PERFORMANCE.D_THRESHOLD ? 'd'
      : 'f',
    );
  }

  /** Decide the next action given a score. */
  static decideAction(score: number): { action: PerformanceAction; reason?: string } {
    if (score < VENDOR_PERFORMANCE.AUTO_SUSPEND_BELOW) {
      return { action: 'suspend', reason: `score ${score} below auto-suspend threshold` };
    }
    if (score < VENDOR_PERFORMANCE.WARNING_BELOW) {
      return { action: 'warn', reason: `score ${score} below warning threshold` };
    }
    return { action: 'none' };
  }

  /** Full evaluation from raw metrics. */
  static evaluate(metrics: readonly MetricInput[]): EvaluationResult {
    if (!Array.isArray(metrics)) {
      throw new ValidationError('Metrics must be an array', 'metrics');
    }
    if (metrics.length > 20) {
      throw new ValidationError('Metrics cannot exceed 20 items', 'metrics');
    }
    for (const m of metrics) {
      if (!Number.isFinite(m.value) || m.value < 0) {
        throw new ValidationError('Metric value must be non-negative', 'value');
      }
      if (!Number.isFinite(m.target) || m.target <= 0) {
        throw new ValidationError('Metric target must be positive', 'target');
      }
    }

    const overallScore = VendorPerformanceEvaluatorService.computeOverallScore(metrics);
    const grade = VendorPerformanceEvaluatorService.gradeFromScore(overallScore);
    const metricResults: MetricResult[] = metrics.map((m) => ({
      metric: m.metric,
      value: m.value,
      target: m.target,
      grade: VendorPerformanceEvaluatorService.gradeFromScore(
        Math.round(VendorPerformanceEvaluatorService.metricRatio(m) * 10000) / 100,
      ),
    }));
    const decision = VendorPerformanceEvaluatorService.decideAction(overallScore);

    return {
      overallScore,
      grade,
      metrics: metricResults,
      action: decision.action,
      reason: decision.reason,
    };
  }

  /** Should the vendor be auto-suspended? */
  static shouldSuspend(score: number): boolean {
    return score < VENDOR_PERFORMANCE.AUTO_SUSPEND_BELOW;
  }

  /** Should the vendor receive a warning? */
  static shouldWarn(score: number): boolean {
    return score >= VENDOR_PERFORMANCE.AUTO_SUSPEND_BELOW
      && score < VENDOR_PERFORMANCE.WARNING_BELOW;
  }

  /** Is this vendor eligible for a "top performer" badge? */
  static isTopPerformer(score: number, orderCount: number): boolean {
    if (orderCount < VENDOR_PERFORMANCE.MIN_ORDERS_FOR_EVALUATION) return false;
    return score >= VENDOR_PERFORMANCE.A_THRESHOLD;
  }

  /** Should the vendor be reinstated from a warning/suspension? */
  static shouldReinstate(score: number, orderCount: number): boolean {
    if (orderCount < VENDOR_PERFORMANCE.MIN_ORDERS_FOR_EVALUATION) return false;
    return score >= VENDOR_PERFORMANCE.B_THRESHOLD;
  }

  /**
   * Identify the metric most in need of attention.
   * Returns the metric with the lowest ratio.
   */
  static worstMetric(metrics: readonly MetricInput[]): MetricInput | undefined {
    if (metrics.length === 0) return undefined;
    return [...metrics].sort(
      (a, b) =>
        VendorPerformanceEvaluatorService.metricRatio(a)
        - VendorPerformanceEvaluatorService.metricRatio(b),
    )[0];
  }

  /**
   * Identify the best-performing metric.
   */
  static bestMetric(metrics: readonly MetricInput[]): MetricInput | undefined {
    if (metrics.length === 0) return undefined;
    return [...metrics].sort(
      (a, b) =>
        VendorPerformanceEvaluatorService.metricRatio(b)
        - VendorPerformanceEvaluatorService.metricRatio(a),
    )[0];
  }
}

/**
 * PerformanceCalculatorService — Real business logic
 * @module vendor-service/domain/services
 *
 * Responsibilities:
 *  - Compute overall performance score (weighted)
 *  - Determine performance grade
 *  - Detect warning / auto-suspend thresholds
 *  - Compute performance delta between periods
 */
import { BusinessRuleError } from '@vubon/shared-kernel/domain/errors/business-rule.error';
import { VENDOR_PERFORMANCE } from '@vubon/shared-constants/business';
import type { PerformanceGradeValue } from '../value-objects/primitives/score-value.vo.js';
export type { PerformanceGradeValue };

// ─── Raw Metrics Input ────────────────────
export interface PerformanceMetricsInput {
  readonly orderFulfillmentRate: number; // 0-100
  readonly onTimeShippingRate: number; // 0-100
  readonly orderCancellationRate: number; // 0-100 (lower is better)
  readonly returnRate: number; // 0-100 (lower is better)
  readonly customerSatisfaction: number; // 0-100
  readonly averageResponseTimeHours: number;
  readonly averageResolutionTimeHours: number;
  readonly totalOrders: number;
}

// ─── Weighted Score Weights ──────────────
const METRIC_WEIGHTS = {
  orderFulfillmentRate: 0.25,
  onTimeShippingRate: 0.20,
  orderCancellationRate: 0.15,
  returnRate: 0.10,
  customerSatisfaction: 0.20,
  averageResponseTimeHours: 0.05,
  averageResolutionTimeHours: 0.05,
} as const;

// ─── Score Result ────────────────────────
export interface PerformanceScoreResult {
  readonly overallScore: number;
  readonly grade: PerformanceGradeValue;
  readonly metricScores: Readonly<Record<string, number>>;
  readonly warnings: readonly string[];
  readonly triggersAutoSuspend: boolean;
  readonly triggersWarning: boolean;
}

// ─── Delta Result ────────────────────────
export interface PerformanceDelta {
  readonly previousScore: number;
  readonly currentScore: number;
  readonly delta: number;
  readonly improved: boolean;
  readonly declined: boolean;
  readonly gradeChanged: boolean;
  readonly previousGrade: PerformanceGradeValue;
  readonly currentGrade: PerformanceGradeValue;
}

// ─── Reference values for time-based metrics ─
const RESPONSE_TIME_MAX_HOURS = 24;
const RESOLUTION_TIME_MAX_HOURS = 72;

export class PerformanceCalculatorService {
  /**
   * Raw metrics থেকে overall score + grade calculate করো।
   */
  static computeScore(input: PerformanceMetricsInput): PerformanceScoreResult {
    this.validateInput(input);

    const warnings: string[] = [];

    const responseScore = this.invertTimeMetric(
      input.averageResponseTimeHours,
      RESPONSE_TIME_MAX_HOURS,
    );
    const resolutionScore = this.invertTimeMetric(
      input.averageResolutionTimeHours,
      RESOLUTION_TIME_MAX_HOURS,
    );

    const cancellationScore = 100 - input.orderCancellationRate;
    const returnScore = 100 - input.returnRate;

    const metricScores = {
      orderFulfillmentRate: input.orderFulfillmentRate,
      onTimeShippingRate: input.onTimeShippingRate,
      orderCancellationRate: cancellationScore,
      returnRate: returnScore,
      customerSatisfaction: input.customerSatisfaction,
      averageResponseTimeHours: responseScore,
      averageResolutionTimeHours: resolutionScore,
    };

    let overall = 0;
    for (const [key, weight] of Object.entries(METRIC_WEIGHTS)) {
      const score = metricScores[key as keyof typeof metricScores] ?? 0;
      overall += score * weight;
    }
    overall = this.round(overall);

    const grade = this.computeGrade(overall);
    const triggersAutoSuspend = overall < VENDOR_PERFORMANCE.AUTO_SUSPEND_BELOW;
    const triggersWarning = overall < VENDOR_PERFORMANCE.WARNING_BELOW;

    if (input.orderFulfillmentRate < 80) {
      warnings.push(`Low fulfillment rate: ${input.orderFulfillmentRate}%`);
    }
    if (input.onTimeShippingRate < 80) {
      warnings.push(`Low on-time shipping: ${input.onTimeShippingRate}%`);
    }
    if (input.orderCancellationRate > 10) {
      warnings.push(`High cancellation rate: ${input.orderCancellationRate}%`);
    }
    if (input.returnRate > 15) {
      warnings.push(`High return rate: ${input.returnRate}%`);
    }
    if (input.customerSatisfaction < 70) {
      warnings.push(`Low customer satisfaction: ${input.customerSatisfaction}%`);
    }
    if (triggersAutoSuspend) {
      warnings.push('Performance below auto-suspend threshold');
    } else if (triggersWarning) {
      warnings.push('Performance below warning threshold');
    }

    return {
      overallScore: overall,
      grade,
      metricScores,
      warnings,
      triggersAutoSuspend,
      triggersWarning,
    };
  }

  static computeGrade(score: number): PerformanceGradeValue {
    if (!Number.isFinite(score) || score < 0 || score > 100) {
      throw new BusinessRuleError(
        'score must be between 0 and 100',
        'INVALID_SCORE',
        { score },
      );
    }
    if (score >= VENDOR_PERFORMANCE.A_PLUS_THRESHOLD) return 'a_plus';
    if (score >= VENDOR_PERFORMANCE.A_THRESHOLD) return 'a';
    if (score >= VENDOR_PERFORMANCE.B_THRESHOLD) return 'b';
    if (score >= VENDOR_PERFORMANCE.C_THRESHOLD) return 'c';
    if (score >= VENDOR_PERFORMANCE.D_THRESHOLD) return 'd';
    return 'f';
  }

  static computeDelta(
    previousScore: number,
    currentScore: number,
  ): PerformanceDelta {
    const previousGrade = this.computeGrade(previousScore);
    const currentGrade = this.computeGrade(currentScore);
    const delta = this.round(currentScore - previousScore);

    return {
      previousScore,
      currentScore,
      delta,
      improved: delta > 0,
      declined: delta < 0,
      gradeChanged: previousGrade !== currentGrade,
      previousGrade,
      currentGrade,
    };
  }

  static shouldAutoSuspend(score: number): boolean {
    return score < VENDOR_PERFORMANCE.AUTO_SUSPEND_BELOW;
  }

  static shouldWarn(score: number): boolean {
    return score < VENDOR_PERFORMANCE.WARNING_BELOW;
  }

  static hasEnoughOrders(totalOrders: number): boolean {
    return totalOrders >= VENDOR_PERFORMANCE.MIN_ORDERS_FOR_EVALUATION;
  }

  static getMetricBreakdown(input: PerformanceMetricsInput): readonly {
    readonly metric: string;
    readonly rawValue: number;
    readonly normalizedScore: number;
    readonly weight: number;
    readonly contribution: number;
  }[] {
    const result = this.computeScore(input);
    return Object.entries(METRIC_WEIGHTS).map(([metric, weight]) => {
      const normalized =
        result.metricScores[metric as keyof typeof result.metricScores] ?? 0;
      const rawValue = input[metric as keyof PerformanceMetricsInput] as number;
      return {
        metric,
        rawValue,
        normalizedScore: normalized,
        weight,
        contribution: this.round(normalized * weight),
      };
    });
  }

  static compareWithPeer(
    vendorScore: number,
    peerAverageScore: number,
  ): {
    readonly diff: number;
    readonly status: 'above' | 'below' | 'equal';
    readonly message: string;
  } {
    const diff = this.round(vendorScore - peerAverageScore);
    if (Math.abs(diff) < 0.01) {
      return { diff: 0, status: 'equal', message: 'On par with peers' };
    }
    if (diff > 0) {
      return {
        diff,
        status: 'above',
        message: `${diff} points above peer average`,
      };
    }
    return {
      diff,
      status: 'below',
      message: `${Math.abs(diff)} points below peer average`,
    };
  }

  private static invertTimeMetric(hours: number, maxHours: number): number {
    if (hours <= 0) return 100;
    if (hours >= maxHours) return 0;
    const raw = 100 - (hours / maxHours) * 100;
    return Math.max(0, Math.min(100, this.round(raw)));
  }

  private static round(n: number): number {
    return Math.round(n * 100) / 100;
  }

  private static validateInput(input: PerformanceMetricsInput): void {
    const rateFields = [
      'orderFulfillmentRate',
      'onTimeShippingRate',
      'orderCancellationRate',
      'returnRate',
      'customerSatisfaction',
    ] as const;
    for (const key of rateFields) {
      const val = input[key];
      if (!Number.isFinite(val) || val < 0 || val > 100) {
        throw new BusinessRuleError(
          `${key} must be between 0 and 100`,
          'INVALID_RATE',
          { field: key, value: val },
        );
      }
    }
    if (input.averageResponseTimeHours < 0) {
      throw new BusinessRuleError(
        'averageResponseTimeHours must be non-negative',
        'INVALID_RESPONSE_TIME',
      );
    }
    if (input.averageResolutionTimeHours < 0) {
      throw new BusinessRuleError(
        'averageResolutionTimeHours must be non-negative',
        'INVALID_RESOLUTION_TIME',
      );
    }
    if (!Number.isInteger(input.totalOrders) || input.totalOrders < 0) {
      throw new BusinessRuleError(
        'totalOrders must be a non-negative integer',
        'INVALID_TOTAL_ORDERS',
      );
    }
  }
}

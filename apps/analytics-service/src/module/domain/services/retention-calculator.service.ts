/**
 * Retention Calculator Service
 * @module analytics-service/domain/services
 *
 * Retention rate calculation for D1/D7/D30/D90 etc.
 * Business Rule:
 * - Retention = (active in period N) / (cohort size)
 * - Period 0 = 100%
 */
export interface RetentionInput {
  readonly cohortSize: number;
  readonly activeInPeriod: readonly number[];
}

export interface RetentionResult {
  readonly d1: number;
  readonly d7: number;
  readonly d30: number;
  readonly d90: number;
  readonly d180: number;
  readonly d365: number;
  readonly curve: readonly number[];
}

export class RetentionCalculatorService {
  /**
   * Compute standard retention milestones
   */
  compute(input: RetentionInput): RetentionResult {
    const size = input.cohortSize;
    if (size <= 0) {
      return this.emptyResult();
    }

    const rates = input.activeInPeriod.map((count) =>
      Math.round((count / size) * 10000) / 10000
    );

    return {
      d1: rates[1] ?? 0,
      d7: rates[7] ?? 0,
      d30: rates[30] ?? 0,
      d90: rates[90] ?? 0,
      d180: rates[180] ?? 0,
      d365: rates[365] ?? 0,
      curve: Object.freeze(rates),
    };
  }

  /**
   * Compute rolling retention (active at least once since D0)
   */
  computeRolling(activeByPeriod: readonly number[], cohortSize: number): readonly number[] {
    if (cohortSize <= 0) return [];
    const rolling: number[] = [];
    let cumUsers = new Set<number>();

    // Assume activeByPeriod[i] represents NEW active users in period i
    // Rolling = cumulative unique actives up to period i
    let total = 0;
    for (let i = 0; i < activeByPeriod.length; i++) {
      total += activeByPeriod[i];
      rolling.push(Math.round((Math.min(total, cohortSize) / cohortSize) * 10000) / 10000);
    }
    return rolling;
  }

  /**
   * Compute churn rate between two periods
   */
  churnRate(prevRetention: number, currRetention: number): number {
    if (prevRetention <= 0) return 0;
    return Math.round(((prevRetention - currRetention) / prevRetention) * 10000) / 10000;
  }

  /**
   * Estimate half-life in periods
   */
  halfLife(curve: readonly number[]): number | null {
    for (let i = 1; i < curve.length; i++) {
      if (curve[i] < 0.5) {
        const prev = curve[i - 1];
        const curr = curve[i];
        const ratio = (prev - 0.5) / (prev - curr);
        return Math.round((i - 1 + ratio) * 100) / 100;
      }
    }
    return null;
  }

  /**
   * Retention health classification
   */
  classify(result: RetentionResult): 'excellent' | 'good' | 'fair' | 'poor' {
    if (result.d1 >= 0.5 && result.d30 >= 0.2) return 'excellent';
    if (result.d1 >= 0.4 && result.d30 >= 0.15) return 'good';
    if (result.d1 >= 0.3 && result.d30 >= 0.1) return 'fair';
    return 'poor';
  }

  private emptyResult(): RetentionResult {
    return {
      d1: 0,
      d7: 0,
      d30: 0,
      d90: 0,
      d180: 0,
      d365: 0,
      curve: [],
    };
  }
}

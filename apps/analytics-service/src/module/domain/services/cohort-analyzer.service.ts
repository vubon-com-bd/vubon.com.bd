/**
 * Cohort Analyzer Service
 * @module analytics-service/domain/services
 *
 * Cohort retention analysis।
 * Business Rule:
 * - Period 0 retention = 100%
 * - Retention monotonically decreases
 * - Compute D1/D7/D30 retention
 */
export interface UserActivity {
  readonly userId: string;
  readonly activeAt: number; // epoch ms
}

export interface RetentionMatrix {
  readonly cohortLabel: string;
  readonly cohortSize: number;
  readonly retentionRates: readonly number[];
}

export class CohortAnalyzerService {
  /**
   * Analyze retention for a single cohort
   */
  analyzeCohort(params: {
    cohortLabel: string;
    cohortUserIds: readonly string[];
    cohortStartMs: number;
    periodMs: number;
    maxPeriods: number;
    activities: readonly UserActivity[];
  }): RetentionMatrix {
    const cohortSet = new Set(params.cohortUserIds);
    const cohortSize = cohortSet.size;

    if (cohortSize === 0) {
      return {
        cohortLabel: params.cohortLabel,
        cohortSize: 0,
        retentionRates: [],
      };
    }

    // Bucket activities by user
    const userActivities = new Map<string, number[]>();
    for (const a of params.activities) {
      if (!cohortSet.has(a.userId)) continue;
      const arr = userActivities.get(a.userId) ?? [];
      arr.push(a.activeAt);
      userActivities.set(a.userId, arr);
    }

    // Compute retention per period
    const retentionRates: number[] = [];
    for (let p = 0; p < params.maxPeriods; p++) {
      const periodStart = params.cohortStartMs + p * params.periodMs;
      const periodEnd = periodStart + params.periodMs;

      let retained = 0;
      for (const [, timestamps] of userActivities.entries()) {
        if (timestamps.some((t) => t >= periodStart && t < periodEnd)) {
          retained++;
        }
      }

      retentionRates.push(
        Math.round((retained / cohortSize) * 10000) / 10000
      );
    }

    return {
      cohortLabel: params.cohortLabel,
      cohortSize,
      retentionRates: Object.freeze(retentionRates),
    };
  }

  /**
   * Compute average retention across cohorts
   */
  averageRetention(matrices: readonly RetentionMatrix[], period: number): number {
    const validMatrices = matrices.filter(
      (m) => m.retentionRates.length > period
    );
    if (validMatrices.length === 0) return 0;

    const total = validMatrices.reduce(
      (sum, m) => sum + m.retentionRates[period],
      0
    );
    return Math.round((total / validMatrices.length) * 10000) / 10000;
  }

  /**
   * Compute D1/D7/D30 retention (assuming daily periods)
   */
  computeStandardRetention(matrix: RetentionMatrix): {
    readonly d1: number;
    readonly d7: number;
    readonly d30: number;
  } {
    return {
      d1: matrix.retentionRates[1] ?? 0,
      d7: matrix.retentionRates[7] ?? 0,
      d30: matrix.retentionRates[30] ?? 0,
    };
  }

  /**
   * Detect if retention is healthy (D1 > 30%)
   */
  isHealthy(matrix: RetentionMatrix): boolean {
    return (matrix.retentionRates[1] ?? 0) >= 0.3;
  }

  /**
   * Compute half-life (periods until 50% retention)
   */
  halfLife(matrix: RetentionMatrix): number | null {
    const rates = matrix.retentionRates;
    for (let i = 1; i < rates.length; i++) {
      if (rates[i] < 0.5) {
        // Linear interpolation
        const prev = rates[i - 1];
        const curr = rates[i];
        const ratio = (prev - 0.5) / (prev - curr);
        return Math.round((i - 1 + ratio) * 100) / 100;
      }
    }
    return null;
  }
}

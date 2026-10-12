/**
 * KPI Evaluator Service
 * @module analytics-service/domain/services
 *
 * KPI evaluation + status determination।
 * Business Rule:
 * - On track: ≥ threshold%
 * - At risk: ≥ 50% and < threshold
 * - Breached: < 50%
 * - Achieved: ≥ 100%
 * - Exceeded: ≥ 110%
 */
import { KpiEntity } from '../entities/kpi.entity.js';
import { KpiResultVO } from '../value-objects/composites/kpi-result.vo.js';
import { KpiIdVO } from '../value-objects/primitives/kpi-id.vo.js';
import { ANALYTICS_KPI_STATUS } from '@vubon/shared-constants/platform/analytics';

export interface KpiEvaluation {
  readonly kpiId: string;
  readonly kpiName: string;
  readonly actual: number;
  readonly target: number;
  readonly achievementPercent: number;
  readonly status: string;
  readonly requiresAlert: boolean;
}

export class KpiEvaluatorService {
  /**
   * Evaluate a single KPI
   */
  evaluate(kpi: KpiEntity, actual: number): KpiEvaluation {
    if (!kpi.isActive) {
      throw new Error(`KPI "${kpi.name.value}" is inactive`);
    }

    const result = KpiResultVO.evaluate({
      kpiId: KpiIdVO.create(kpi.id),
      actual,
      target: kpi.target.numeric,
      thresholdPercent: kpi.threshold.percent,
    });

    return {
      kpiId: kpi.id,
      kpiName: kpi.name.value,
      actual,
      target: kpi.target.numeric,
      achievementPercent: result.achievementPercent,
      status: result.status,
      requiresAlert: result.requiresAlert(),
    };
  }

  /**
   * Evaluate multiple KPIs
   */
  evaluateMany(
    kpis: readonly KpiEntity[],
    actuals: ReadonlyMap<string, number>
  ): readonly KpiEvaluation[] {
    const results: KpiEvaluation[] = [];

    for (const kpi of kpis) {
      const actual = actuals.get(kpi.id);
      if (actual === undefined) continue;
      if (!kpi.isActive) continue;

      try {
        results.push(this.evaluate(kpi, actual));
      } catch {
        // Skip failed evaluations
        continue;
      }
    }

    return results;
  }

  /**
   * Determine status without full evaluation
   */
  determineStatus(achievementPercent: number, thresholdPercent: number): string {
    if (achievementPercent >= 110) return ANALYTICS_KPI_STATUS.EXCEEDED;
    if (achievementPercent >= 100) return ANALYTICS_KPI_STATUS.ACHIEVED;
    if (achievementPercent >= thresholdPercent) return ANALYTICS_KPI_STATUS.ON_TRACK;
    if (achievementPercent >= 50) return ANALYTICS_KPI_STATUS.AT_RISK;
    return ANALYTICS_KPI_STATUS.BREACHED;
  }

  /**
   * Filter KPIs needing attention
   */
  filterCritical(evaluations: readonly KpiEvaluation[]): readonly KpiEvaluation[] {
    return evaluations.filter(
      (e) => e.status === ANALYTICS_KPI_STATUS.BREACHED || e.status === ANALYTICS_KPI_STATUS.AT_RISK
    );
  }

  /**
   * Summary of KPI states
   */
  summarize(evaluations: readonly KpiEvaluation[]): {
    readonly total: number;
    readonly achieved: number;
    readonly onTrack: number;
    readonly atRisk: number;
    readonly breached: number;
  } {
    const summary = {
      total: evaluations.length,
      achieved: 0,
      onTrack: 0,
      atRisk: 0,
      breached: 0,
    };

    for (const e of evaluations) {
      if (e.status === ANALYTICS_KPI_STATUS.ACHIEVED || e.status === ANALYTICS_KPI_STATUS.EXCEEDED) summary.achieved++;
      else if (e.status === ANALYTICS_KPI_STATUS.ON_TRACK) summary.onTrack++;
      else if (e.status === ANALYTICS_KPI_STATUS.AT_RISK) summary.atRisk++;
      else if (e.status === ANALYTICS_KPI_STATUS.BREACHED) summary.breached++;
    }

    return summary;
  }
}

/**
 * KPI Threshold Service
 * @module analytics-service/domain/services
 *
 * KPI threshold breach detection + alert generation।
 */
import { KpiEntity } from '../entities/kpi.entity.js';

export interface ThresholdAlert {
  readonly kpiId: string;
  readonly kpiName: string;
  readonly severity: 'info' | 'warning' | 'critical';
  readonly message: string;
  readonly actual: number;
  readonly target: number;
  readonly achievementPercent: number;
}

export class KpiThresholdService {
  /**
   * Check threshold and generate alert if needed
   */
  check(kpi: KpiEntity, actual: number): ThresholdAlert | null {
    const percent = kpi.achievementPercent(actual);

    // Critical: breach
    if (percent < 50) {
      return {
        kpiId: kpi.id,
        kpiName: kpi.name.value,
        severity: 'critical',
        message: `KPI "${kpi.name.value}" breached: ${percent.toFixed(1)}% of target`,
        actual,
        target: kpi.target.numeric,
        achievementPercent: percent,
      };
    }

    // Warning: at risk
    if (percent < kpi.threshold.percent) {
      return {
        kpiId: kpi.id,
        kpiName: kpi.name.value,
        severity: 'warning',
        message: `KPI "${kpi.name.value}" at risk: ${percent.toFixed(1)}% of target`,
        actual,
        target: kpi.target.numeric,
        achievementPercent: percent,
      };
    }

    return null;
  }

  /**
   * Check multiple KPIs
   */
  checkMany(
    kpis: readonly KpiEntity[],
    actuals: ReadonlyMap<string, number>
  ): readonly ThresholdAlert[] {
    const alerts: ThresholdAlert[] = [];
    for (const kpi of kpis) {
      if (!kpi.isActive) continue;
      const actual = actuals.get(kpi.id);
      if (actual === undefined) continue;

      const alert = this.check(kpi, actual);
      if (alert) alerts.push(alert);
    }
    return alerts;
  }

  /**
   * Sort alerts by severity
   */
  sortBySeverity(alerts: readonly ThresholdAlert[]): readonly ThresholdAlert[] {
    const order: Record<string, number> = { critical: 0, warning: 1, info: 2 };
    return [...alerts].sort((a, b) => order[a.severity] - order[b.severity]);
  }

  /**
   * Group by severity
   */
  groupBySeverity(alerts: readonly ThresholdAlert[]): {
    readonly critical: readonly ThresholdAlert[];
    readonly warning: readonly ThresholdAlert[];
  } {
    return {
      critical: alerts.filter((a) => a.severity === 'critical'),
      warning: alerts.filter((a) => a.severity === 'warning'),
    };
  }
}

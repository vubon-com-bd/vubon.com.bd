/**
 * KPI Monitoring Saga
 * @module analytics-service/application/sagas
 *
 * Periodically evaluate KPIs + send alerts।
 */
import { BaseSaga } from '@vubon/shared-kernel/application/sagas';

export interface KpiMonitoringContext {
  evaluatedKpis: readonly string[];
  breachedKpis: readonly string[];
  alertsSent: readonly string[];
}

export class KpiMonitoringSaga extends BaseSaga<KpiMonitoringContext> {
  readonly name = 'kpi-monitoring';

  async execute(input: { kpiIds: readonly string[] }): Promise<void> {
    this.setContext({
      evaluatedKpis: [],
      breachedKpis: [],
      alertsSent: [],
    });

    const ctx = this.getContext();
    const evaluated: string[] = [];
    const breached: string[] = [];
    const sent: string[] = [];

    for (const kpiId of input.kpiIds) {
      // Step 1: Load KPI entity
      // Step 2: Load metric value
      // Step 3: Evaluate KPI
      evaluated.push(kpiId);

      // Step 4: Check threshold
      // const alert = thresholdService.check(kpi, actual);
      // if (alert) breached.push(kpiId);

      // Step 5: Send notification
      // await notificationService.send(kpiId);
      // sent.push(kpiId);
    }

    this.setContext({
      evaluatedKpis: evaluated,
      breachedKpis: breached,
      alertsSent: sent,
    });
  }

  async compensate(): Promise<void> {
    const ctx = this.getContext();
    if (!ctx) return;
    // Rollback: mark evaluations as pending
  }

  /**
   * Threshold constant reference
   */
  static defaultThreshold(): number {
    return 80;
  }
}

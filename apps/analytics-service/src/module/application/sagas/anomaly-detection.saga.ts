/**
 * Anomaly Detection Saga
 * @module analytics-service/application/sagas
 */
import { BaseSaga } from '@vubon/shared-kernel/application/sagas';

export interface AnomalyDetectionContext {
  metricName: string;
  anomalyCount: number;
  notificationsSent: number;
}

export class AnomalyDetectionSaga extends BaseSaga<AnomalyDetectionContext> {
  readonly name = 'anomaly-detection';

  async execute(input: {
    metricName: string;
    fromDate: string;
    toDate: string;
  }): Promise<void> {
    this.setContext({
      metricName: input.metricName,
      anomalyCount: 0,
      notificationsSent: 0,
    });

    const ctx = this.getContext();
    // Step 1: Load metric data points
    // Step 2: Run anomaly detector
    // Step 3: If anomalies found → notify
    ctx.anomalyCount = 0;
    ctx.notificationsSent = 0;
  }

  async compensate(): Promise<void> {
    const ctx = this.getContext();
    if (!ctx) return;
    // No rollback needed — read-only saga
  }
}

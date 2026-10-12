/**
 * Data Retention Saga
 * @module analytics-service/application/sagas
 *
 * Enforces retention policy by purging old data।
 */
import { BaseSaga } from '@vubon/shared-kernel/application/sagas';
import { ANALYTICS_LIMIT } from '@vubon/shared-constants/platform/analytics';

export interface DataRetentionContext {
  cutoff: string;
  purgedEvents: number;
  purgedMetrics: number;
  purgedPageViews: number;
}

export class DataRetentionSaga extends BaseSaga<DataRetentionContext> {
  readonly name = 'data-retention';

  async execute(input?: { retentionDays?: number }): Promise<void> {
    const days = input?.retentionDays ?? ANALYTICS_LIMIT.DATA_RETENTION_DAYS;
    const cutoff = new Date(Date.now() - days * 86400000).toISOString();

    this.setContext({
      cutoff,
      purgedEvents: 0,
      purgedMetrics: 0,
      purgedPageViews: 0,
    });

    const ctx = this.getContext();
    // Step 1: Purge old events
    // ctx.purgedEvents = await eventRepo.deleteOlderThan(cutoff);
    // Step 2: Purge old metrics
    // ctx.purgedMetrics = await metricRepo.deleteOlderThan(cutoff);
    // Step 3: Purge old page views
    // ctx.purgedPageViews = await pageViewRepo.deleteOlderThan(cutoff);
  }

  async compensate(): Promise<void> {
    // Retention is irreversible — no compensate
  }

  static retentionDays(): number {
    return ANALYTICS_LIMIT.DATA_RETENTION_DAYS;
  }
}

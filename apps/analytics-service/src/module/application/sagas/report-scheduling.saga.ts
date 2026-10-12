/**
 * Report Scheduling Saga
 * @module analytics-service/application/sagas
 */
import { BaseSaga } from '@vubon/shared-kernel/application/sagas';

export interface ReportSchedulingContext {
  reportId: string;
  nextRunAt: string | null;
  scheduled: boolean;
}

export class ReportSchedulingSaga extends BaseSaga<ReportSchedulingContext> {
  readonly name = 'report-scheduling';

  async execute(input: {
    reportId: string;
    frequency: string;
    lastRunAt?: string;
  }): Promise<void> {
    this.setContext({
      reportId: input.reportId,
      nextRunAt: null,
      scheduled: false,
    });

    const ctx = this.getContext();
    // Compute next run based on frequency
    const intervals: Record<string, number> = {
      hourly: 3600_000,
      daily: 86400_000,
      weekly: 604800_000,
      monthly: 2592000_000,
      quarterly: 7776000_000,
      yearly: 31536000_000,
    };
    const ms = intervals[input.frequency] ?? 86400_000;
    ctx.nextRunAt = new Date(Date.now() + ms).toISOString();
    ctx.scheduled = true;
  }

  async compensate(): Promise<void> {
    const ctx = this.getContext();
    if (!ctx) return;
    ctx.scheduled = false;
  }
}

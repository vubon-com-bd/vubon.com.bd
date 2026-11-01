/**
 * ScheduleCalculatorService
 * @module notification-service/domain/services
 *
 * Computes next run times for recurring schedules।
 * Supports hourly, daily, weekly, biweekly, monthly, quarterly, yearly।
 */
import { BusinessRuleError } from '@vubon/shared-kernel/domain/errors/business-rule.error';
import { NOTIFICATION_SCHEDULE_RECURRENCE } from '@vubon/shared-constants/platform';

export interface CalculateNextRunInput {
  readonly frequency: string;
  readonly from: string; // ISO timestamp
  readonly timezone?: string;
}

export interface NextRunResult {
  readonly nextRunAt: string;
  readonly intervalMs: number;
}

const MS_HOUR = 60 * 60 * 1000;
const MS_DAY = 24 * MS_HOUR;

const INTERVALS: Readonly<Record<string, number>> = {
  hourly: MS_HOUR,
  daily: MS_DAY,
  weekly: 7 * MS_DAY,
  biweekly: 14 * MS_DAY,
  monthly: 30 * MS_DAY,
  quarterly: 90 * MS_DAY,
  yearly: 365 * MS_DAY,
};

export class ScheduleCalculatorService {
  static nextRun(input: CalculateNextRunInput): NextRunResult {
    const interval = INTERVALS[input.frequency];
    if (interval === undefined) {
      throw new BusinessRuleError(
        `Unsupported frequency: "${input.frequency}"`,
        'UNSUPPORTED_FREQUENCY',
        { frequency: input.frequency },
      );
    }

    const from = new Date(input.from);
    if (Number.isNaN(from.getTime())) {
      throw new BusinessRuleError('Invalid "from" timestamp', 'INVALID_TIMESTAMP');
    }

    const next = new Date(from.getTime() + interval);
    return { nextRunAt: next.toISOString(), intervalMs: interval };
  }

  /** Generate N next run times */
  static nextN(input: CalculateNextRunInput, count: number): readonly string[] {
    if (!Number.isInteger(count) || count < 1 || count > 365) {
      throw new BusinessRuleError('count must be 1-365', 'INVALID_COUNT');
    }
    const results: string[] = [];
    let cursor = input.from;
    for (let i = 0; i < count; i++) {
      const next = this.nextRun({ ...input, from: cursor });
      results.push(next.nextRunAt);
      cursor = next.nextRunAt;
    }
    return results;
  }

  /** Determine if frequency is recurring (not "none") */
  static isRecurring(frequency: string): boolean {
    return frequency !== NOTIFICATION_SCHEDULE_RECURRENCE.NONE;
  }

  /** Estimate total runs in a time window */
  static estimateRuns(
    frequency: string,
    from: string,
    to: string,
  ): number {
    const interval = INTERVALS[frequency];
    if (!interval) return 0;
    const dur = new Date(to).getTime() - new Date(from).getTime();
    return Math.max(0, Math.floor(dur / interval));
  }
}

/**
 * Report Frequency Value Object
 * @module analytics-service/domain/value-objects/primitives
 *
 * Scheduled report-এর frequency (once, hourly, daily, weekly, monthly, quarterly, yearly)।
 * Business Rule:
 * - ANALYTICS_REPORT_FREQUENCY constants থেকে হতে হবে
 * - Once → one-time, no cron
 * - Others → cron-based
 */
import { BaseTypeVO } from '@vubon/shared-kernel/domain/primitives';
import { ANALYTICS_REPORT_FREQUENCY } from '@vubon/shared-constants/platform/analytics';

const VALID_FREQUENCIES: readonly string[] = Object.values(ANALYTICS_REPORT_FREQUENCY);

export class ReportFrequencyVO extends BaseTypeVO {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): ReportFrequencyVO {
    if (typeof raw !== 'string') {
      throw new Error('ReportFrequency must be a string');
    }

    const normalized = raw.trim().toLowerCase();

    if (!VALID_FREQUENCIES.includes(normalized)) {
      throw new Error(
        `Invalid ReportFrequency: "${normalized}". Valid: ${VALID_FREQUENCIES.join(', ')}`
      );
    }

    return new ReportFrequencyVO(normalized);
  }

  isOnce(): boolean {
    return this.value === ANALYTICS_REPORT_FREQUENCY.ONCE;
  }

  isHourly(): boolean {
    return this.value === ANALYTICS_REPORT_FREQUENCY.HOURLY;
  }

  isDaily(): boolean {
    return this.value === ANALYTICS_REPORT_FREQUENCY.DAILY;
  }

  isWeekly(): boolean {
    return this.value === ANALYTICS_REPORT_FREQUENCY.WEEKLY;
  }

  isMonthly(): boolean {
    return this.value === ANALYTICS_REPORT_FREQUENCY.MONTHLY;
  }

  isQuarterly(): boolean {
    return this.value === ANALYTICS_REPORT_FREQUENCY.QUARTERLY;
  }

  isYearly(): boolean {
    return this.value === ANALYTICS_REPORT_FREQUENCY.YEARLY;
  }

  /** Recurring কিনা (once ছাড়া সব) */
  isRecurring(): boolean {
    return !this.isOnce();
  }

  /** Approximate days between runs */
  intervalDays(): number {
    switch (this.value) {
      case ANALYTICS_REPORT_FREQUENCY.HOURLY:
        return 1 / 24;
      case ANALYTICS_REPORT_FREQUENCY.DAILY:
        return 1;
      case ANALYTICS_REPORT_FREQUENCY.WEEKLY:
        return 7;
      case ANALYTICS_REPORT_FREQUENCY.MONTHLY:
        return 30;
      case ANALYTICS_REPORT_FREQUENCY.QUARTERLY:
        return 90;
      case ANALYTICS_REPORT_FREQUENCY.YEARLY:
        return 365;
      default:
        return 0;
    }
  }

  /** Approximate runs per year */
  runsPerYear(): number {
    const d = this.intervalDays();
    if (d === 0) return 1;
    return Math.round(365 / d);
  }

  /** High-frequency কিনা (hourly/daily) */
  isHighFrequency(): boolean {
    return this.isHourly() || this.isDaily();
  }

  /** Default data window (days) — report-এর lookback period */
  defaultWindowDays(): number {
    if (this.isHourly()) return 1;
    if (this.isDaily()) return 7;
    if (this.isWeekly()) return 30;
    if (this.isMonthly()) return 90;
    if (this.isQuarterly()) return 365;
    if (this.isYearly()) return 365 * 3;
    return 30;
  }
}

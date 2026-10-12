/**
 * Cohort Period Value Object
 * @module analytics-service/domain/value-objects/primitives
 *
 * Cohort grouping period (day, week, month, quarter, year)।
 * Business Rule:
 * - ANALYTICS_COHORT_PERIOD constants থেকে হতে হবে
 * - Period নির্ধারণ করে retention grid-এর bucket size
 */
import { BaseTypeVO } from '@vubon/shared-kernel/domain/primitives';
import { ANALYTICS_COHORT_PERIOD } from '@vubon/shared-constants/platform/analytics';

const VALID_PERIODS: readonly string[] = Object.values(ANALYTICS_COHORT_PERIOD);

export class CohortPeriodVO extends BaseTypeVO {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): CohortPeriodVO {
    if (typeof raw !== 'string') {
      throw new Error('CohortPeriod must be a string');
    }

    const normalized = raw.trim().toLowerCase();

    if (!VALID_PERIODS.includes(normalized)) {
      throw new Error(
        `Invalid CohortPeriod: "${normalized}". Valid: ${VALID_PERIODS.join(', ')}`
      );
    }

    return new CohortPeriodVO(normalized);
  }

  isDay(): boolean {
    return this.value === ANALYTICS_COHORT_PERIOD.DAY;
  }

  isWeek(): boolean {
    return this.value === ANALYTICS_COHORT_PERIOD.WEEK;
  }

  isMonth(): boolean {
    return this.value === ANALYTICS_COHORT_PERIOD.MONTH;
  }

  isQuarter(): boolean {
    return this.value === ANALYTICS_COHORT_PERIOD.QUARTER;
  }

  isYear(): boolean {
    return this.value === ANALYTICS_COHORT_PERIOD.YEAR;
  }

  /** Approximate days per period */
  daysPerPeriod(): number {
    switch (this.value) {
      case ANALYTICS_COHORT_PERIOD.DAY:
        return 1;
      case ANALYTICS_COHORT_PERIOD.WEEK:
        return 7;
      case ANALYTICS_COHORT_PERIOD.MONTH:
        return 30;
      case ANALYTICS_COHORT_PERIOD.QUARTER:
        return 90;
      case ANALYTICS_COHORT_PERIOD.YEAR:
        return 365;
      default:
        return 1;
    }
  }

  /** Max retention periods (grid columns) */
  maxRetentionPeriods(): number {
    if (this.isDay()) return 30;
    if (this.isWeek()) return 12;
    if (this.isMonth()) return 12;
    if (this.isQuarter()) return 8;
    return 5; // year
  }

  /** High-frequency period কিনা */
  isHighFrequency(): boolean {
    return this.isDay() || this.isWeek();
  }
}

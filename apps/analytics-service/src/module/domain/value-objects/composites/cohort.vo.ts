/**
 * Cohort Value Object (Composite)
 * @module analytics-service/domain/value-objects/composites
 *
 * Cohort definition (a group of users sharing a common characteristic)।
 * Business Rule:
 * - cohortId + name + period + dateRange
 * - Period start → cohort start date
 * - Max 5 year span
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base';
import { CohortIdVO } from '../primitives/cohort-id.vo.js';
import { CohortNameVO } from '../primitives/cohort-name.vo.js';
import { CohortPeriodVO } from '../primitives/cohort-period.vo.js';
import { EventTimestampVO } from '../primitives/event-timestamp.vo.js';
import { TimeRangeVO } from './time-range.vo.js';

export interface CohortVOProps {
  readonly id: CohortIdVO;
  readonly name: CohortNameVO;
  readonly period: CohortPeriodVO;
  readonly range: TimeRangeVO;
  readonly description?: string;
}

export class CohortVO extends BaseVO<CohortVOProps> {
  private constructor(props: CohortVOProps) {
    super(props);
    Object.freeze(this);
  }

  static create(props: CohortVOProps): CohortVO {
    if (!props.id || !props.name || !props.period || !props.range) {
      throw new Error('CohortVO requires id, name, period, range');
    }

    // Period vs range consistency
    const daysPerPeriod = props.period.daysPerPeriod();
    const rangeDays = props.range.spanDays();

    if (rangeDays < daysPerPeriod) {
      throw new Error(
        `Cohort range (${rangeDays}d) must be at least one period (${daysPerPeriod}d)`
      );
    }

    return new CohortVO(props);
  }

  get id(): CohortIdVO {
    return this.value.id;
  }

  get name(): CohortNameVO {
    return this.value.name;
  }

  get period(): CohortPeriodVO {
    return this.value.period;
  }

  get range(): TimeRangeVO {
    return this.value.range;
  }

  /** Cohort start date (first bucket) */
  startDate(): string {
    return this.range.startAt.toDayBucket();
  }

  /** Number of cohort buckets within range */
  bucketCount(): number {
    const daysPerBucket = this.period.daysPerPeriod();
    return Math.max(1, Math.floor(this.range.spanDays() / daysPerBucket));
  }

  /** Max retention periods */
  maxRetentionPeriods(): number {
    return this.period.maxRetentionPeriods();
  }

  /** High-frequency cohort কিনা */
  isHighFrequency(): boolean {
    return this.period.isHighFrequency();
  }

  /** Long-term cohort কিনা (yearly/monthly) */
  isLongTerm(): boolean {
    return this.period.isMonth() || this.period.isQuarter() || this.period.isYear();
  }
}

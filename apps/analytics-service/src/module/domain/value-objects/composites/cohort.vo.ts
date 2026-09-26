import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { CohortIdVO } from '../primitives/cohort-id.vo';
import { CohortNameVO } from '../primitives/cohort-name.vo';
import { CohortPeriodVO } from '../primitives/cohort-period.vo';

export interface CohortProps {
  readonly cohortId: CohortIdVO;
  readonly name: CohortNameVO;
  readonly period: CohortPeriodVO;
  readonly startDate: Date;
  readonly endDate: Date;
  readonly size: number;
}

export class CohortVO extends BaseVO<CohortProps> {
  static create(props: CohortProps): CohortVO {
    if (props.endDate.getTime() < props.startDate.getTime()) {
      throw new Error('Cohort end date cannot be before start date');
    }
    if (props.size < 0) {
      throw new Error('Cohort size cannot be negative');
    }
    return new CohortVO(Object.freeze({ ...props }));
  }

  private constructor(value: CohortProps) {
    super(value);
  }

  get cohortId(): CohortIdVO { return this.value.cohortId; }
  get name(): CohortNameVO { return this.value.name; }
  get period(): CohortPeriodVO { return this.value.period; }
  get startDate(): Date { return this.value.startDate; }
  get endDate(): Date { return this.value.endDate; }
  get size(): number { return this.value.size; }

  get durationDays(): number {
    return Math.round(
      (this.value.endDate.getTime() - this.value.startDate.getTime()) /
        (24 * 60 * 60 * 1000),
    );
  }

  get bucketKey(): string {
    return this.value.period.bucketFor(this.value.startDate);
  }

  isEmpty(): boolean {
    return this.value.size === 0;
  }

  containsDate(date: Date): boolean {
    return date >= this.value.startDate && date <= this.value.endDate;
  }
}

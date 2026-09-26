import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';

export interface RetentionProps {
  readonly cohortSize: number;
  readonly retainedAtDay: readonly number[];
}

export class RetentionVO extends BaseVO<RetentionProps> {
  static create(cohortSize: number, retainedAtDay: readonly number[]): RetentionVO {
    if (cohortSize < 0) {
      throw new Error('Cohort size cannot be negative');
    }
    if (retainedAtDay.some((r) => r < 0 || r > cohortSize)) {
      throw new Error('Retained values must be between 0 and cohort size');
    }
    return new RetentionVO(
      Object.freeze({
        cohortSize,
        retainedAtDay: Object.freeze([...retainedAtDay]),
      }),
    );
  }

  private constructor(value: RetentionProps) {
    super(value);
  }

  get cohortSize(): number { return this.value.cohortSize; }
  get retainedAtDay(): readonly number[] { return this.value.retainedAtDay; }

  rateAt(day: number): number {
    const retained = this.value.retainedAtDay[day] ?? 0;
    if (this.value.cohortSize === 0) return 0;
    return (retained / this.value.cohortSize) * 100;
  }

  get day1(): number { return this.rateAt(1); }
  get day7(): number { return this.rateAt(7); }
  get day30(): number { return this.rateAt(30); }

  get curve(): readonly number[] {
    if (this.value.cohortSize === 0) {
      return this.value.retainedAtDay.map(() => 0);
    }
    return this.value.retainedAtDay.map((r) => (r / this.value.cohortSize) * 100);
  }

  get hasGoodDay1Retention(): boolean {
    return this.day1 >= 40;
  }

  get hasGoodDay30Retention(): boolean {
    return this.day30 >= 15;
  }
}

import { RetentionVO } from '../value-objects/composites/retention.vo';

export class RetentionCalculatorService {
  /**
   * Compute retention curve — day N retention rates.
   */
  compute(
    cohortSize: number,
    activePerDay: readonly number[],
  ): RetentionVO {
    return RetentionVO.create(cohortSize, activePerDay);
  }

  /**
   * Compute week-over-week retention.
   */
  weekly(
    cohortSize: number,
    weeklyActive: readonly number[],
  ): RetentionVO {
    return RetentionVO.create(cohortSize, weeklyActive);
  }
}

/**
 * Retention Value Object (Composite)
 * @module analytics-service/domain/value-objects/composites
 *
 * Retention rate snapshot for a specific period।
 * Business Rule:
 * - Retention rate 0-1
 * - Counts non-negative
 * - Retained ≤ cohortSize
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base';

export interface RetentionVOProps {
  readonly period: number;
  readonly cohortSize: number;
  readonly retainedUsers: number;
  readonly retentionRate: number;
}

export class RetentionVO extends BaseVO<RetentionVOProps> {
  private constructor(props: RetentionVOProps) {
    super(props);
    Object.freeze(this);
  }

  static create(props: RetentionVOProps): RetentionVO {
    if (!Number.isInteger(props.period) || props.period < 0) {
      throw new Error('RetentionVO period must be non-negative integer');
    }
    if (!Number.isInteger(props.cohortSize) || props.cohortSize < 0) {
      throw new Error('RetentionVO cohortSize must be non-negative integer');
    }
    if (!Number.isInteger(props.retainedUsers) || props.retainedUsers < 0) {
      throw new Error('RetentionVO retainedUsers must be non-negative integer');
    }
    if (props.retainedUsers > props.cohortSize) {
      throw new Error('RetentionVO retainedUsers cannot exceed cohortSize');
    }
    if (props.retentionRate < 0 || props.retentionRate > 1) {
      throw new Error('RetentionVO retentionRate must be 0-1');
    }

    return new RetentionVO(props);
  }

  static compute(params: {
    period: number;
    cohortSize: number;
    retainedUsers: number;
  }): RetentionVO {
    const rate =
      params.cohortSize === 0
        ? 0
        : Math.round((params.retainedUsers / params.cohortSize) * 10000) / 10000;
    return RetentionVO.create({
      period: params.period,
      cohortSize: params.cohortSize,
      retainedUsers: params.retainedUsers,
      retentionRate: rate,
    });
  }

  get period(): number {
    return this.value.period;
  }

  get cohortSize(): number {
    return this.value.cohortSize;
  }

  get retainedUsers(): number {
    return this.value.retainedUsers;
  }

  get retentionRate(): number {
    return this.value.retentionRate;
  }

  retentionPercent(): number {
    return Math.round(this.value.retentionRate * 10000) / 100;
  }

  churnRate(): number {
    return Math.round((1 - this.value.retentionRate) * 10000) / 10000;
  }

  churnedUsers(): number {
    return this.value.cohortSize - this.value.retainedUsers;
  }

  /** Good retention? (> 30%) */
  isHealthy(): boolean {
    return this.value.retentionRate >= 0.3;
  }
}

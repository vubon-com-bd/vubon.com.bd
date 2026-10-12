/**
 * UtilizationPercent Value Object — 0-100 %
 * @module logistics-service/domain/value-objects/primitives
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { WAREHOUSE } from '@vubon/shared-constants/logistics';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

export class UtilizationPercentVO extends BaseVO<number> {
  private constructor(value: number) { super(value); }

  static create(raw: number): UtilizationPercentVO {
    if (!Number.isFinite(raw) || raw < 0 || raw > 100) {
      throw new ValidationError('Utilization must be between 0 and 100', 'utilization');
    }
    return new UtilizationPercentVO(Math.round(raw * 100) / 100);
  }

  static reconstitute(raw: number): UtilizationPercentVO { return new UtilizationPercentVO(raw); }

  static fromUsage(used: number, total: number): UtilizationPercentVO {
    if (!Number.isFinite(used) || !Number.isFinite(total) || total <= 0) {
      throw new ValidationError('Invalid used/total for utilization', 'utilization');
    }
    return UtilizationPercentVO.create((used / total) * 100);
  }

  isLow(): boolean { return this.value < WAREHOUSE.LOW_CAPACITY_THRESHOLD_PERCENT; }
  isHigh(): boolean { return this.value >= WAREHOUSE.LOW_CAPACITY_THRESHOLD_PERCENT; }
  isFull(): boolean { return this.value >= WAREHOUSE.FULL_CAPACITY_THRESHOLD_PERCENT; }

  get fraction(): number { return this.value / 100; }
}

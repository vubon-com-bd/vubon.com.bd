/**
 * SlaTargetVO — SLA target duration in minutes
 * @module support-service/domain/value-objects/primitives
 *
 * Registry: extends BaseQuantityVO
 * Business: minutes; 0 < target <= 1 year
 */
import { BaseQuantityVO } from '@vubon/shared-kernel/domain/primitives/quantity.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

const MIN_MINUTES = 1;
const MAX_MINUTES = 60 * 24 * 365;

export class SlaTargetVO extends BaseQuantityVO {
  private constructor(value: number) {
    super(value);
  }

  static create(raw: number): SlaTargetVO {
    BaseQuantityVO.validatePositive(raw, 'SlaTarget');
    if (!Number.isInteger(raw)) {
      throw new ValidationError(
        'SlaTarget must be an integer (minutes)',
        'slaTarget',
      );
    }
    if (raw < MIN_MINUTES) {
      throw new ValidationError(
        `SlaTarget too small (min ${MIN_MINUTES} minute)`,
        'slaTarget',
      );
    }
    if (raw > MAX_MINUTES) {
      throw new ValidationError(
        `SlaTarget too large (max ${MAX_MINUTES} minutes)`,
        'slaTarget',
      );
    }
    return new SlaTargetVO(raw);
  }

  static hours(value: number): SlaTargetVO {
    return SlaTargetVO.create(Math.round(value * 60));
  }

  static days(value: number): SlaTargetVO {
    return SlaTargetVO.create(Math.round(value * 60 * 24));
  }

  get hours(): number {
    return this.value / 60;
  }

  get days(): number {
    return this.value / (60 * 24);
  }

  isTighterThan(other: SlaTargetVO): boolean {
    return this.value < other.value;
  }
}

/**
 * SplitType Value Object
 * @module payment-service/domain/value-objects/primitives
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

export type SplitTypeValue =
  | 'percentage'
  | 'fixed'
  | 'equal'
  | 'custom';

const VALID_TYPES: readonly string[] = ['percentage', 'fixed', 'equal', 'custom'];

export class SplitTypeVO extends BaseVO<SplitTypeValue> {
  private constructor(value: SplitTypeValue) {
    super(value);
  }

  static create(raw: string): SplitTypeVO {
    if (typeof raw !== 'string') {
      throw new ValidationError('SplitType must be a string', 'type');
    }
    const normalized = raw.trim().toLowerCase();
    if (!VALID_TYPES.includes(normalized)) {
      throw new ValidationError(
        `Invalid SplitType "${normalized}". Allowed: ${VALID_TYPES.join(', ')}`,
        'type',
      );
    }
    return new SplitTypeVO(normalized as SplitTypeValue);
  }

  static reconstitute(raw: SplitTypeValue): SplitTypeVO {
    return new SplitTypeVO(raw);
  }

  isPercentage(): boolean { return this.value === 'percentage'; }
  isFixed(): boolean { return this.value === 'fixed'; }
  isEqual(): boolean { return this.value === 'equal'; }
  isCustom(): boolean { return this.value === 'custom'; }
}

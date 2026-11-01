/**
 * CommissionType Value Object
 * @module vendor-service/domain/value-objects/primitives
 */
import { BaseTypeVO } from '@vubon/shared-kernel/domain/primitives';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { VENDOR_COMMISSION_TYPE } from '@vubon/shared-constants/business';

export type CommissionTypeValue =
  (typeof VENDOR_COMMISSION_TYPE)[keyof typeof VENDOR_COMMISSION_TYPE];

const VALID_TYPES = new Set<string>(Object.values(VENDOR_COMMISSION_TYPE));

export class CommissionTypeVO extends BaseTypeVO<CommissionTypeValue> {
  private constructor(value: CommissionTypeValue) {
    super(value);
  }

  protected static override allowedValues(): ReadonlySet<string> {
    return VALID_TYPES;
  }

  static create(raw: string): CommissionTypeVO {
    if (typeof raw !== 'string') {
      throw new ValidationError('CommissionType must be a string', 'commissionType');
    }
    const normalized = raw.trim().toLowerCase();
    if (!VALID_TYPES.has(normalized)) {
      throw new ValidationError(
        `Invalid CommissionType: "${normalized}". Allowed: ${[...VALID_TYPES].join(', ')}`,
        'commissionType',
      );
    }
    return new CommissionTypeVO(normalized as CommissionTypeValue);
  }

  static reconstitute(raw: string): CommissionTypeVO {
    return new CommissionTypeVO(raw as CommissionTypeValue);
  }

  // ─── Predicates ───
  isPercentage(): boolean { return this.value === 'percentage'; }
  isFixed(): boolean { return this.value === 'fixed'; }
  isTiered(): boolean { return this.value === 'tiered'; }
  isHybrid(): boolean { return this.value === 'hybrid'; }
  isCategoryBased(): boolean { return this.value === 'category_based'; }

  /** Uses percentage as primary unit */
  usesPercent(): boolean {
    return this.isPercentage() || this.isTiered() || this.isHybrid() || this.isCategoryBased();
  }

  /** Uses fixed amount as primary unit */
  usesFixed(): boolean {
    return this.isFixed() || this.isHybrid();
  }
}

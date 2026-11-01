/**
 * PackagingStatus Value Object
 * @module logistics-service/domain/value-objects/primitives
 */
import { BaseStatusVO } from '@vubon/shared-kernel/domain/primitives';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { PACKAGING_STATUS } from '@vubon/shared-constants/logistics';

export type PackagingStatusValue =
  (typeof PACKAGING_STATUS)[keyof typeof PACKAGING_STATUS];

const VALID_STATUSES: readonly string[] = Object.values(PACKAGING_STATUS);

const VALID_TRANSITIONS: Readonly<
  Record<PackagingStatusValue, readonly PackagingStatusValue[]>
> = {
  active: ['inactive', 'out_of_stock', 'discontinued'],
  inactive: ['active', 'discontinued'],
  out_of_stock: ['active', 'discontinued'],
  discontinued: [], // final
};

export class PackagingStatusVO extends BaseStatusVO<PackagingStatusValue> {
  private constructor(value: PackagingStatusValue) {
    super(value);
  }

  static create(raw: string): PackagingStatusVO {
    if (typeof raw !== 'string') {
      throw new ValidationError('PackagingStatus must be a string', 'status');
    }
    const normalized = raw.trim().toLowerCase();
    if (!VALID_STATUSES.includes(normalized)) {
      throw new ValidationError(
        `Invalid PackagingStatus: "${normalized}". Allowed: ${VALID_STATUSES.join(', ')}`,
        'status',
      );
    }
    return new PackagingStatusVO(normalized as PackagingStatusValue);
  }

  static reconstitute(raw: string): PackagingStatusVO {
    return new PackagingStatusVO(raw as PackagingStatusValue);
  }

  static active(): PackagingStatusVO {
    return new PackagingStatusVO(PACKAGING_STATUS.ACTIVE);
  }

  isActive(): boolean { return this.value === PACKAGING_STATUS.ACTIVE; }
  isInactive(): boolean { return this.value === PACKAGING_STATUS.INACTIVE; }
  isOutOfStock(): boolean { return this.value === PACKAGING_STATUS.OUT_OF_STOCK; }
  isDiscontinued(): boolean { return this.value === PACKAGING_STATUS.DISCONTINUED; }

  isFinal(): boolean { return this.isDiscontinued(); }
  isUsable(): boolean { return this.isActive(); }

  canTransitionTo(target: string): boolean {
    const normalized = target.trim().toLowerCase() as PackagingStatusValue;
    return (VALID_TRANSITIONS[this.value] ?? []).includes(normalized);
  }
}

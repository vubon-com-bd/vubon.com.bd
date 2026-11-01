/**
 * ReturnReason Value Object
 * @module logistics-service/domain/value-objects/primitives
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { RETURN_SHIPMENT_REASON } from '@vubon/shared-constants/logistics';

export type ReturnReasonValue =
  (typeof RETURN_SHIPMENT_REASON)[keyof typeof RETURN_SHIPMENT_REASON];

const VALID_REASONS: readonly string[] = Object.values(RETURN_SHIPMENT_REASON);

const REQUIRES_PHOTO: readonly string[] = [
  RETURN_SHIPMENT_REASON.DEFECTIVE,
  RETURN_SHIPMENT_REASON.DAMAGED_IN_TRANSIT,
  RETURN_SHIPMENT_REASON.WRONG_ITEM,
  RETURN_SHIPMENT_REASON.NOT_AS_DESCRIBED,
];

export class ReturnReasonVO extends BaseVO<ReturnReasonValue> {
  private constructor(value: ReturnReasonValue) {
    super(value);
  }

  static create(raw: string): ReturnReasonVO {
    if (typeof raw !== 'string') {
      throw new ValidationError('ReturnReason must be a string', 'reason');
    }
    const normalized = raw.trim().toLowerCase();
    if (!VALID_REASONS.includes(normalized)) {
      throw new ValidationError(
        `Invalid ReturnReason: "${normalized}". Allowed: ${VALID_REASONS.join(', ')}`,
        'reason',
      );
    }
    return new ReturnReasonVO(normalized as ReturnReasonValue);
  }

  static reconstitute(raw: string): ReturnReasonVO {
    return new ReturnReasonVO(raw as ReturnReasonValue);
  }

  isDefective(): boolean { return this.value === RETURN_SHIPMENT_REASON.DEFECTIVE; }
  isNotAsDescribed(): boolean { return this.value === RETURN_SHIPMENT_REASON.NOT_AS_DESCRIBED; }
  isWrongItem(): boolean { return this.value === RETURN_SHIPMENT_REASON.WRONG_ITEM; }
  isSizeIssue(): boolean { return this.value === RETURN_SHIPMENT_REASON.SIZE_ISSUE; }
  isChangedMind(): boolean { return this.value === RETURN_SHIPMENT_REASON.CHANGED_MIND; }
  isDamagedInTransit(): boolean { return this.value === RETURN_SHIPMENT_REASON.DAMAGED_IN_TRANSIT; }
  isLateDelivery(): boolean { return this.value === RETURN_SHIPMENT_REASON.LATE_DELIVERY; }
  isQualityIssue(): boolean { return this.value === RETURN_SHIPMENT_REASON.QUALITY_ISSUE; }
  isRefused(): boolean { return this.value === RETURN_SHIPMENT_REASON.REFUSED; }
  isOther(): boolean { return this.value === RETURN_SHIPMENT_REASON.OTHER; }

  requiresPhoto(): boolean {
    return REQUIRES_PHOTO.includes(this.value);
  }

  isSellerFault(): boolean {
    return (
      this.isDefective() ||
      this.isWrongItem() ||
      this.isNotAsDescribed() ||
      this.isDamagedInTransit() ||
      this.isQualityIssue()
    );
  }

  isCustomerFault(): boolean {
    return this.isChangedMind() || this.isSizeIssue();
  }
}

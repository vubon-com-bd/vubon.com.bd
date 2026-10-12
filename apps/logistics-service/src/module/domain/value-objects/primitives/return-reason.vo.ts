/**
 * ReturnReason Value Object
 * @module logistics-service/domain/value-objects/primitives
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { RETURN_SHIPMENT_REASON } from '@vubon/shared-constants/logistics';
import { InvalidReturnReasonError } from '../../errors/return-shipment.errors.js';

const ALLOWED = Object.values(RETURN_SHIPMENT_REASON) as readonly string[];

export class ReturnReasonVO extends BaseVO<string> {
  private constructor(value: string) { super(value); }

  static create(raw: string): ReturnReasonVO {
    if (typeof raw !== 'string' || !ALLOWED.includes(raw)) {
      throw new InvalidReturnReasonError(String(raw));
    }
    return new ReturnReasonVO(raw);
  }

  static reconstitute(raw: string): ReturnReasonVO { return new ReturnReasonVO(raw); }

  static defective(): ReturnReasonVO { return new ReturnReasonVO(RETURN_SHIPMENT_REASON.DEFECTIVE); }
  static notAsDescribed(): ReturnReasonVO { return new ReturnReasonVO(RETURN_SHIPMENT_REASON.NOT_AS_DESCRIBED); }
  static wrongItem(): ReturnReasonVO { return new ReturnReasonVO(RETURN_SHIPMENT_REASON.WRONG_ITEM); }
  static sizeIssue(): ReturnReasonVO { return new ReturnReasonVO(RETURN_SHIPMENT_REASON.SIZE_ISSUE); }
  static changedMind(): ReturnReasonVO { return new ReturnReasonVO(RETURN_SHIPMENT_REASON.CHANGED_MIND); }
  static damagedInTransit(): ReturnReasonVO { return new ReturnReasonVO(RETURN_SHIPMENT_REASON.DAMAGED_IN_TRANSIT); }
  static lateDelivery(): ReturnReasonVO { return new ReturnReasonVO(RETURN_SHIPMENT_REASON.LATE_DELIVERY); }
  static qualityIssue(): ReturnReasonVO { return new ReturnReasonVO(RETURN_SHIPMENT_REASON.QUALITY_ISSUE); }
  static refused(): ReturnReasonVO { return new ReturnReasonVO(RETURN_SHIPMENT_REASON.REFUSED); }
  static other(): ReturnReasonVO { return new ReturnReasonVO(RETURN_SHIPMENT_REASON.OTHER); }

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

  /** Requires photographic evidence. */
  requiresPhotos(): boolean {
    return [RETURN_SHIPMENT_REASON.DEFECTIVE, RETURN_SHIPMENT_REASON.DAMAGED_IN_TRANSIT, RETURN_SHIPMENT_REASON.QUALITY_ISSUE].includes(this.value as never);
  }

  /** Item can usually go back to sellable stock. */
  isRestockable(): boolean {
    return [
      RETURN_SHIPMENT_REASON.SIZE_ISSUE,
      RETURN_SHIPMENT_REASON.CHANGED_MIND,
      RETURN_SHIPMENT_REASON.LATE_DELIVERY,
      RETURN_SHIPMENT_REASON.NOT_AS_DESCRIBED,
    ].includes(this.value as never);
  }

  /** Seller/vendor is at fault. */
  isSellerFault(): boolean {
    return [RETURN_SHIPMENT_REASON.DEFECTIVE, RETURN_SHIPMENT_REASON.WRONG_ITEM, RETURN_SHIPMENT_REASON.DAMAGED_IN_TRANSIT, RETURN_SHIPMENT_REASON.QUALITY_ISSUE].includes(this.value as never);
  }

  /** Return shipping should be free. */
  isFreeReturn(): boolean { return this.isSellerFault(); }
}

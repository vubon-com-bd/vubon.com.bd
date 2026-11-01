/**
 * ReturnReasonType Value Object
 * @module logistics-service/domain/value-objects/primitives
 *
 * Reuses RETURN_SHIPMENT_REASON from constants — type-level wrapper
 * with category classification (seller_fault / customer_fault / carrier_fault)
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { RETURN_SHIPMENT_REASON } from '@vubon/shared-constants/logistics';

export type ReturnReasonTypeValue =
  (typeof RETURN_SHIPMENT_REASON)[keyof typeof RETURN_SHIPMENT_REASON];

export type ReturnFaultCategory = 'seller' | 'customer' | 'carrier' | 'other';

const VALID_TYPES: readonly string[] = Object.values(RETURN_SHIPMENT_REASON);

const CATEGORY_MAP: Readonly<Record<string, ReturnFaultCategory>> = {
  [RETURN_SHIPMENT_REASON.DEFECTIVE]: 'seller',
  [RETURN_SHIPMENT_REASON.NOT_AS_DESCRIBED]: 'seller',
  [RETURN_SHIPMENT_REASON.WRONG_ITEM]: 'seller',
  [RETURN_SHIPMENT_REASON.QUALITY_ISSUE]: 'seller',
  [RETURN_SHIPMENT_REASON.SIZE_ISSUE]: 'customer',
  [RETURN_SHIPMENT_REASON.CHANGED_MIND]: 'customer',
  [RETURN_SHIPMENT_REASON.REFUSED]: 'customer',
  [RETURN_SHIPMENT_REASON.DAMAGED_IN_TRANSIT]: 'carrier',
  [RETURN_SHIPMENT_REASON.LATE_DELIVERY]: 'carrier',
  [RETURN_SHIPMENT_REASON.OTHER]: 'other',
};

export class ReturnReasonTypeVO extends BaseVO<ReturnReasonTypeValue> {
  private constructor(value: ReturnReasonTypeValue) {
    super(value);
  }

  static create(raw: string): ReturnReasonTypeVO {
    if (typeof raw !== 'string') {
      throw new ValidationError('ReturnReasonType must be a string', 'type');
    }
    const normalized = raw.trim().toLowerCase();
    if (!VALID_TYPES.includes(normalized)) {
      throw new ValidationError(
        `Invalid ReturnReasonType: "${normalized}". Allowed: ${VALID_TYPES.join(', ')}`,
        'type',
      );
    }
    return new ReturnReasonTypeVO(normalized as ReturnReasonTypeValue);
  }

  static reconstitute(raw: string): ReturnReasonTypeVO {
    return new ReturnReasonTypeVO(raw as ReturnReasonTypeValue);
  }

  get faultCategory(): ReturnFaultCategory {
    return CATEGORY_MAP[this.value] ?? 'other';
  }

  isSellerFault(): boolean { return this.faultCategory === 'seller'; }
  isCustomerFault(): boolean { return this.faultCategory === 'customer'; }
  isCarrierFault(): boolean { return this.faultCategory === 'carrier'; }
  isOther(): boolean { return this.faultCategory === 'other'; }

  requiresPhoto(): boolean {
    return (
      this.value === RETURN_SHIPMENT_REASON.DEFECTIVE ||
      this.value === RETURN_SHIPMENT_REASON.DAMAGED_IN_TRANSIT ||
      this.value === RETURN_SHIPMENT_REASON.WRONG_ITEM ||
      this.value === RETURN_SHIPMENT_REASON.NOT_AS_DESCRIBED
    );
  }
}

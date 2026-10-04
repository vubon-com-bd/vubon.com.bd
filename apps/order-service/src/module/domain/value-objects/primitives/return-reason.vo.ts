/**
 * ReturnReason Value Object
 * @module order-service/domain/value-objects/primitives
 */
import { BaseCodeVO } from '@vubon/shared-kernel/domain/primitives';
import { ORDER_RETURN_REASON } from '@vubon/shared-constants/business/order';
import { InvalidReturnReasonError } from '../../errors/order-return.errors.js';

const ALLOWED = Object.values(ORDER_RETURN_REASON) as readonly string[];

export class ReturnReasonVO extends BaseCodeVO {
  private constructor(value: string) { super(value); }

  static create(raw: string): ReturnReasonVO {
    if (!ALLOWED.includes(raw)) {
      throw new InvalidReturnReasonError(raw, ALLOWED);
    }
    return new ReturnReasonVO(raw);
  }

  static reconstitute(raw: string): ReturnReasonVO {
    return new ReturnReasonVO(raw);
  }

  /** Is this a defect/seller-fault return? */
  isSellerFault(): boolean {
    return [
      ORDER_RETURN_REASON.DEFECTIVE,
      ORDER_RETURN_REASON.WRONG_ITEM,
      ORDER_RETURN_REASON.NOT_AS_DESCRIBED,
      ORDER_RETURN_REASON.DAMAGED_IN_TRANSIT,
      ORDER_RETURN_REASON.MISSING_PARTS,
    ].includes(this.value as never);
  }

  /** Buyer changed their mind — may incur restocking fee. */
  isBuyerRemorse(): boolean {
    return [
      ORDER_RETURN_REASON.CHANGED_MIND,
      ORDER_RETURN_REASON.SIZE_ISSUE,
    ].includes(this.value as never);
  }
}

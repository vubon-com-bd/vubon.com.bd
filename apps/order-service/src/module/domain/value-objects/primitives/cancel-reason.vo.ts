/**
 * CancelReason Value Object
 * @module order-service/domain/value-objects/primitives
 */
import { BaseCodeVO } from '@vubon/shared-kernel/domain/primitives';
import { ORDER_CANCEL_REASON } from '@vubon/shared-constants/business/order';
import { InvalidCancelReasonError } from '../../errors/order-cancel.errors.js';

const ALLOWED = Object.values(ORDER_CANCEL_REASON) as readonly string[];

export class CancelReasonVO extends BaseCodeVO {
  private constructor(value: string) { super(value); }

  static create(raw: string): CancelReasonVO {
    if (!ALLOWED.includes(raw)) {
      throw new InvalidCancelReasonError(raw, ALLOWED);
    }
    return new CancelReasonVO(raw);
  }

  static reconstitute(raw: string): CancelReasonVO {
    return new CancelReasonVO(raw);
  }

  isCustomerInitiated(): boolean {
    return this.value === ORDER_CANCEL_REASON.CUSTOMER_REQUEST;
  }

  isSystemInitiated(): boolean {
    return [
      ORDER_CANCEL_REASON.OUT_OF_STOCK,
      ORDER_CANCEL_REASON.PAYMENT_FAILED,
      ORDER_CANCEL_REASON.FRAUD_SUSPECTED,
    ].includes(this.value as never);
  }
}

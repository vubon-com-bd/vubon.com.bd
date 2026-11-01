/**
 * CancelReason Value Object
 * @module order-service/domain/value-objects/primitives
 */
import { BaseTypeVO } from '@vubon/shared-kernel/domain/primitives';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { ORDER_CANCEL_REASON } from '@vubon/shared-constants/business/order';

export type CancelReasonValue = (typeof ORDER_CANCEL_REASON)[keyof typeof ORDER_CANCEL_REASON];

const VALID_REASONS: readonly string[] = Object.values(ORDER_CANCEL_REASON);

export class CancelReasonVO extends BaseTypeVO<CancelReasonValue> {
  private constructor(value: CancelReasonValue) {
    super(value);
  }

  static create(raw: string): CancelReasonVO {
    if (typeof raw !== 'string') {
      throw new ValidationError('CancelReason must be a string', 'reason');
    }
    const normalized = raw.trim().toLowerCase();
    if (!VALID_REASONS.includes(normalized)) {
      throw new ValidationError(
        `Invalid CancelReason: "${normalized}". Allowed: ${VALID_REASONS.join(', ')}`,
        'reason',
      );
    }
    return new CancelReasonVO(normalized as CancelReasonValue);
  }

  static reconstitute(raw: string): CancelReasonVO {
    return new CancelReasonVO(raw as CancelReasonValue);
  }

  isCustomerInitiated(): boolean {
    return this.value === ORDER_CANCEL_REASON.CUSTOMER_REQUEST;
  }

  isSystemInitiated(): boolean {
    return (
      this.value === ORDER_CANCEL_REASON.OUT_OF_STOCK ||
      this.value === ORDER_CANCEL_REASON.PAYMENT_FAILED ||
      this.value === ORDER_CANCEL_REASON.FRAUD_SUSPECTED ||
      this.value === ORDER_CANCEL_REASON.PRICE_ERROR
    );
  }
}

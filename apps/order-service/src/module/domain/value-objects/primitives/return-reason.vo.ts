/**
 * ReturnReason Value Object
 * @module order-service/domain/value-objects/primitives
 */
import { BaseTypeVO } from '@vubon/shared-kernel/domain/primitives';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { ORDER_RETURN_REASON } from '@vubon/shared-constants/business/order';

export type ReturnReasonValue = (typeof ORDER_RETURN_REASON)[keyof typeof ORDER_RETURN_REASON];

const VALID_REASONS: readonly string[] = Object.values(ORDER_RETURN_REASON);

export class ReturnReasonVO extends BaseTypeVO<ReturnReasonValue> {
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

  isDefective(): boolean {
    return (
      this.value === ORDER_RETURN_REASON.DEFECTIVE ||
      this.value === ORDER_RETURN_REASON.DAMAGED_IN_TRANSIT ||
      this.value === ORDER_RETURN_REASON.MISSING_PARTS
    );
  }

  isChangeOfMind(): boolean {
    return this.value === ORDER_RETURN_REASON.CHANGED_MIND;
  }
}

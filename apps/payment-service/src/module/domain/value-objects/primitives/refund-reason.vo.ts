/**
 * RefundReason Value Object
 * @module payment-service/domain/value-objects/primitives
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

export type RefundReasonValue =
  | 'customer_request'
  | 'duplicate_charge'
  | 'fraud'
  | 'product_not_received'
  | 'product_defective'
  | 'service_not_rendered'
  | 'order_cancelled'
  | 'other';

const VALID_REASONS: readonly string[] = [
  'customer_request',
  'duplicate_charge',
  'fraud',
  'product_not_received',
  'product_defective',
  'service_not_rendered',
  'order_cancelled',
  'other',
];

const MAX_NOTE_LENGTH = 500;

export interface RefundReasonValueShape {
  readonly reason: RefundReasonValue;
  readonly note?: string;
}

export class RefundReasonVO extends BaseVO<RefundReasonValueShape> {
  private constructor(value: RefundReasonValueShape) {
    super(value);
  }

  static create(reason: string, note?: string): RefundReasonVO {
    if (typeof reason !== 'string') {
      throw new ValidationError('RefundReason must be a string', 'reason');
    }
    const normalized = reason.trim().toLowerCase();
    if (!VALID_REASONS.includes(normalized)) {
      throw new ValidationError(
        `Invalid RefundReason "${normalized}". Allowed: ${VALID_REASONS.join(', ')}`,
        'reason',
      );
    }
    if (note !== undefined) {
      if (typeof note !== 'string') {
        throw new ValidationError('RefundReason note must be a string', 'note');
      }
      if (note.length > MAX_NOTE_LENGTH) {
        throw new ValidationError(
          `RefundReason note exceeds ${MAX_NOTE_LENGTH} chars`,
          'note',
        );
      }
    }
    return new RefundReasonVO({
      reason: normalized as RefundReasonValue,
      note: note?.trim(),
    });
  }

  static reconstitute(reason: RefundReasonValue, note?: string): RefundReasonVO {
    return new RefundReasonVO({ reason, note });
  }

  get reason(): RefundReasonValue { return this.value.reason; }
  get note(): string | undefined { return this.value.note; }

  isCustomerRequest(): boolean { return this.reason === 'customer_request'; }
  isFraud(): boolean { return this.reason === 'fraud'; }
  isDuplicateCharge(): boolean { return this.reason === 'duplicate_charge'; }
  isOrderCancelled(): boolean { return this.reason === 'order_cancelled'; }
}

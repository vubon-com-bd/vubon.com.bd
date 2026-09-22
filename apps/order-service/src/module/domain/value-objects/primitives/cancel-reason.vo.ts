import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ValidationError } from '../../errors/validation.errors';

const VALID = new Set<string>([
  'customer_request',
  'out_of_stock',
  'payment_failed',
  'vendor_unavailable',
  'pricing_error',
  'duplicate_order',
  'fraud_suspected',
  'system_error',
]);

export class CancelReasonVO extends BaseVO<string> {
  static readonly MAX_LENGTH = 500;

  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): CancelReasonVO {
    const trimmed = raw.trim();
    if (VALID.has(trimmed)) {
      return new CancelReasonVO(trimmed);
    }
    if (trimmed.length === 0 || trimmed.length > CancelReasonVO.MAX_LENGTH) {
      throw new ValidationError(
        'CancelReason',
        `must be 1-${CancelReasonVO.MAX_LENGTH} characters`,
      );
    }
    return new CancelReasonVO(trimmed);
  }
}

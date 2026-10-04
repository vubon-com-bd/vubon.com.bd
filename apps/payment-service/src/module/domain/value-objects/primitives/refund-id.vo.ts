/**
 * RefundId Value Object
 * @module payment-service/domain/value-objects/primitives
 */
import { BaseIdVO } from '@vubon/shared-kernel/domain/primitives';
import { REGEX } from '@vubon/shared-constants/common';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

export class RefundIdVO extends BaseIdVO<string> {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): RefundIdVO {
    if (typeof raw !== 'string' || raw.trim().length === 0) {
      throw new ValidationError('RefundId cannot be empty', 'refundId');
    }
    const trimmed = raw.trim();
    if (!REGEX.UUID.test(trimmed)) {
      throw new ValidationError('RefundId must be a valid UUID', 'refundId');
    }
    return new RefundIdVO(trimmed);
  }

  static reconstitute(raw: string): RefundIdVO {
    return new RefundIdVO(raw);
  }
}

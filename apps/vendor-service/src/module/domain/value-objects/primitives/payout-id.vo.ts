/**
 * PayoutId Value Object
 * @module vendor-service/domain/value-objects/primitives
 */
import { BaseIdVO } from '@vubon/shared-kernel/domain/primitives';
import { REGEX } from '@vubon/shared-constants/common';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

export class PayoutIdVO extends BaseIdVO<string> {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): PayoutIdVO {
    if (typeof raw !== 'string' || raw.trim().length === 0) {
      throw new ValidationError('PayoutId cannot be empty', 'payoutId');
    }
    const trimmed = raw.trim();
    if (!REGEX.UUID.test(trimmed)) {
      throw new ValidationError('PayoutId must be a valid UUID', 'payoutId');
    }
    return new PayoutIdVO(trimmed);
  }

  static reconstitute(raw: string): PayoutIdVO {
    return new PayoutIdVO(raw);
  }
}

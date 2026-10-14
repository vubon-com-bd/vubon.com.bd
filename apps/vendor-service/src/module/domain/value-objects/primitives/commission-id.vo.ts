/**
 * CommissionId Value Object
 * @module vendor-service/domain/value-objects/primitives
 */
import { BaseIdVO } from '@vubon/shared-kernel/domain/primitives';
import { REGEX } from '@vubon/shared-constants/common';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

export class CommissionIdVO extends BaseIdVO<string> {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): CommissionIdVO {
    if (typeof raw !== 'string' || raw.trim().length === 0) {
      throw new ValidationError('CommissionId cannot be empty', 'commissionId');
    }
    const trimmed = raw.trim();
    if (!REGEX.UUID.test(trimmed)) {
      throw new ValidationError('CommissionId must be a valid UUID', 'commissionId');
    }
    return new CommissionIdVO(trimmed);
  }

  static reconstitute(raw: string): CommissionIdVO {
    return new CommissionIdVO(raw);
  }
}

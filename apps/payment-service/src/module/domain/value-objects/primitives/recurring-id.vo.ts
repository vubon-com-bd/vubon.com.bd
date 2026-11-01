/**
 * RecurringId Value Object
 * @module payment-service/domain/value-objects/primitives
 */
import { BaseIdVO } from '@vubon/shared-kernel/domain/primitives';
import { REGEX } from '@vubon/shared-constants/common';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

export class RecurringIdVO extends BaseIdVO<string> {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): RecurringIdVO {
    if (typeof raw !== 'string' || raw.trim().length === 0) {
      throw new ValidationError('RecurringId cannot be empty', 'recurringId');
    }
    const trimmed = raw.trim();
    if (!REGEX.UUID.test(trimmed)) {
      throw new ValidationError('RecurringId must be a valid UUID', 'recurringId');
    }
    return new RecurringIdVO(trimmed);
  }

  static reconstitute(raw: string): RecurringIdVO {
    return new RecurringIdVO(raw);
  }
}

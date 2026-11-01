/**
 * CourierId Value Object
 * @module logistics-service/domain/value-objects/primitives
 */
import { BaseIdVO } from '@vubon/shared-kernel/domain/primitives';
import { REGEX } from '@vubon/shared-constants/common';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

export class CourierIdVO extends BaseIdVO<string> {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): CourierIdVO {
    if (typeof raw !== 'string' || raw.trim().length === 0) {
      throw new ValidationError('CourierId cannot be empty', 'courierId');
    }
    const trimmed = raw.trim();
    if (!REGEX.UUID.test(trimmed)) {
      throw new ValidationError('CourierId must be a valid UUID', 'courierId');
    }
    return new CourierIdVO(trimmed);
  }

  static reconstitute(raw: string): CourierIdVO {
    return new CourierIdVO(raw);
  }
}

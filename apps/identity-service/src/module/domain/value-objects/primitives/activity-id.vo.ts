/**
 * ActivityId Value Object
 * @module identity-service/domain/value-objects/primitives
 */
import { BaseIdVO } from '@vubon/shared-kernel/domain/primitives';
import { REGEX } from '@vubon/shared-constants/common';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

export class ActivityIdVO extends BaseIdVO<string> {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): ActivityIdVO {
    if (typeof raw !== 'string' || raw.trim().length === 0) {
      throw new ValidationError('ActivityId cannot be empty', 'activityId');
    }
    const trimmed = raw.trim();
    if (!REGEX.UUID.test(trimmed)) {
      throw new ValidationError('ActivityId must be a valid UUID', 'activityId');
    }
    return new ActivityIdVO(trimmed);
  }

  static reconstitute(raw: string): ActivityIdVO {
    return new ActivityIdVO(raw);
  }
}

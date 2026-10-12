/**
 * UserId cross-service reference VO
 * @module logistics-service/domain/value-objects/primitives
 */
import { BaseIdVO } from '@vubon/shared-kernel/domain/primitives';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { REGEX } from '@vubon/shared-constants/common';

export class UserIdVO extends BaseIdVO<string> {
  private constructor(value: string) { super(value); }

  static create(raw: string): UserIdVO {
    if (typeof raw !== 'string' || raw.trim().length === 0) {
      throw new ValidationError('UserId cannot be empty', 'userId');
    }
    const trimmed = raw.trim();
    if (!REGEX.UUID.test(trimmed)) {
      throw new ValidationError('UserId must be a valid UUID', 'userId');
    }
    return new UserIdVO(trimmed);
  }

  static reconstitute(raw: string): UserIdVO { return new UserIdVO(raw); }
}

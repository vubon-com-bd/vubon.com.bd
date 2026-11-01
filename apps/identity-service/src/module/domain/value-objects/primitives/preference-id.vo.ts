/**
 * PreferenceId Value Object
 * @module identity-service/domain/value-objects/primitives
 */
import { BaseIdVO } from '@vubon/shared-kernel/domain/primitives';
import { REGEX } from '@vubon/shared-constants/common';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

export class PreferenceIdVO extends BaseIdVO<string> {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): PreferenceIdVO {
    if (typeof raw !== 'string' || raw.trim().length === 0) {
      throw new ValidationError('PreferenceId cannot be empty', 'preferenceId');
    }
    const trimmed = raw.trim();
    if (!REGEX.UUID.test(trimmed)) {
      throw new ValidationError('PreferenceId must be a valid UUID', 'preferenceId');
    }
    return new PreferenceIdVO(trimmed);
  }

  static reconstitute(raw: string): PreferenceIdVO {
    return new PreferenceIdVO(raw);
  }
}

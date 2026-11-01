/**
 * SettingId Value Object
 * @module identity-service/domain/value-objects/primitives
 */
import { BaseIdVO } from '@vubon/shared-kernel/domain/primitives';
import { REGEX } from '@vubon/shared-constants/common';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

export class SettingIdVO extends BaseIdVO<string> {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): SettingIdVO {
    if (typeof raw !== 'string' || raw.trim().length === 0) {
      throw new ValidationError('SettingId cannot be empty', 'settingId');
    }
    const trimmed = raw.trim();
    if (!REGEX.UUID.test(trimmed)) {
      throw new ValidationError('SettingId must be a valid UUID', 'settingId');
    }
    return new SettingIdVO(trimmed);
  }

  static reconstitute(raw: string): SettingIdVO {
    return new SettingIdVO(raw);
  }
}

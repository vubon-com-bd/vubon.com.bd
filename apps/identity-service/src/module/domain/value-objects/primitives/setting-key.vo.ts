/**
 * SettingKey Value Object
 * @module identity-service/domain/value-objects/primitives
 */
import { BaseTypeVO } from '@vubon/shared-kernel/domain/primitives';
import { USER_SETTINGS_KEY } from '@vubon/shared-constants/user';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

const VALID: readonly string[] = Object.values(USER_SETTINGS_KEY);

export class SettingKeyVO extends BaseTypeVO<string> {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): SettingKeyVO {
    if (typeof raw !== 'string' || raw.trim().length === 0) {
      throw new ValidationError('SettingKey cannot be empty', 'settingKey');
    }
    const normalized = raw.trim().toLowerCase();
    if (!VALID.includes(normalized)) {
      throw new ValidationError(
        `Invalid SettingKey "${normalized}". Allowed: ${VALID.join(', ')}`,
        'settingKey',
      );
    }
    return new SettingKeyVO(normalized);
  }

  static theme(): SettingKeyVO { return new SettingKeyVO(USER_SETTINGS_KEY.THEME); }
  static language(): SettingKeyVO { return new SettingKeyVO(USER_SETTINGS_KEY.LANGUAGE); }
  static timezone(): SettingKeyVO { return new SettingKeyVO(USER_SETTINGS_KEY.TIMEZONE); }
  static currency(): SettingKeyVO { return new SettingKeyVO(USER_SETTINGS_KEY.CURRENCY); }

  static reconstitute(raw: string): SettingKeyVO {
    return new SettingKeyVO(raw);
  }
}

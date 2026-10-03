/**
 * SettingKey Value Object
 */
import { BaseCodeVO } from '@vubon/shared-kernel/domain/primitives/code.vo';
import { USER_SETTINGS_KEY } from '@vubon/shared-constants/user';

export type SettingKeyType = (typeof USER_SETTINGS_KEY)[keyof typeof USER_SETTINGS_KEY];

const SETTING_KEY_VALUES: ReadonlySet<string> = new Set(
  Object.values(USER_SETTINGS_KEY)
);

export class SettingKeyVO extends BaseCodeVO {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): SettingKeyVO {
    if (typeof raw !== 'string') {
      throw new Error('Setting key must be a string');
    }
    const normalized = raw.trim().toLowerCase();
    if (!SETTING_KEY_VALUES.has(normalized)) {
      throw new Error(
        `Invalid setting key: "${raw}". Allowed: ${[...SETTING_KEY_VALUES].join(', ')}`
      );
    }
    return new SettingKeyVO(normalized);
  }

  static isSettingKey(value: string): boolean {
    return SETTING_KEY_VALUES.has(value.trim().toLowerCase());
  }

  is(key: SettingKeyType): boolean {
    return this.value === key;
  }

  isLocalization(): boolean {
    return (
      this.value === USER_SETTINGS_KEY.LANGUAGE ||
      this.value === USER_SETTINGS_KEY.TIMEZONE ||
      this.value === USER_SETTINGS_KEY.CURRENCY ||
      this.value === USER_SETTINGS_KEY.DATE_FORMAT ||
      this.value === USER_SETTINGS_KEY.TIME_FORMAT
    );
  }

  isSecurity(): boolean {
    return (
      this.value === USER_SETTINGS_KEY.TWO_FACTOR ||
      this.value === USER_SETTINGS_KEY.EMAIL_VERIFIED ||
      this.value === USER_SETTINGS_KEY.PHONE_VERIFIED
    );
  }
}

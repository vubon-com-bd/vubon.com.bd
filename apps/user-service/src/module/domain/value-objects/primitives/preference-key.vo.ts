/**
 * PreferenceKey Value Object
 */
import { BaseCodeVO } from '@vubon/shared-kernel/domain/primitives/code.vo';
import { USER_PREFERENCE } from '@vubon/shared-constants/user';

export type PreferenceKeyType = (typeof USER_PREFERENCE)[keyof typeof USER_PREFERENCE];

const PREFERENCE_KEY_VALUES: ReadonlySet<string> = new Set(Object.values(USER_PREFERENCE));

export class PreferenceKeyVO extends BaseCodeVO {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): PreferenceKeyVO {
    if (typeof raw !== 'string') {
      throw new Error('Preference key must be a string');
    }
    const normalized = raw.trim().toLowerCase();
    if (!PREFERENCE_KEY_VALUES.has(normalized)) {
      throw new Error(
        `Invalid preference key: "${raw}". Allowed: ${[...PREFERENCE_KEY_VALUES].join(', ')}`
      );
    }
    return new PreferenceKeyVO(normalized);
  }

  static isPreferenceKey(value: string): boolean {
    return PREFERENCE_KEY_VALUES.has(value.trim().toLowerCase());
  }

  is(key: PreferenceKeyType): boolean {
    return this.value === key;
  }

  isNotification(): boolean {
    return (
      this.value === USER_PREFERENCE.EMAIL_NOTIFICATIONS ||
      this.value === USER_PREFERENCE.SMS_NOTIFICATIONS ||
      this.value === USER_PREFERENCE.PUSH_NOTIFICATIONS
    );
  }
}

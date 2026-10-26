/**
 * PreferenceType Value Object
 * @module notification-service/domain/value-objects/primitives
 */
import { BaseTypeVO } from '@vubon/shared-kernel/domain/primitives';
import { NOTIFICATION_PREFERENCE_TYPE } from '@vubon/shared-constants/platform';
import { InvalidPreferenceTypeError } from '@domain/errors/preference.errors.js';

export type PreferenceTypeValue =
  (typeof NOTIFICATION_PREFERENCE_TYPE)[keyof typeof NOTIFICATION_PREFERENCE_TYPE];

const ALLOWED = Object.values(NOTIFICATION_PREFERENCE_TYPE) as readonly string[];

export class PreferenceTypeVO extends BaseTypeVO<PreferenceTypeValue> {
  private constructor(value: PreferenceTypeValue) {
    super(value);
  }

  static create(raw: string): PreferenceTypeVO {
    if (typeof raw !== 'string') {
      throw new InvalidPreferenceTypeError(String(raw), ALLOWED);
    }
    const normalized = raw.trim().toLowerCase();
    if (!ALLOWED.includes(normalized)) {
      throw new InvalidPreferenceTypeError(normalized, ALLOWED);
    }
    return new PreferenceTypeVO(normalized as PreferenceTypeValue);
  }

  static reconstitute(raw: string): PreferenceTypeVO {
    return new PreferenceTypeVO(raw as PreferenceTypeValue);
  }

  isOptIn(): boolean { return this.value === NOTIFICATION_PREFERENCE_TYPE.OPT_IN; }
  isOptOut(): boolean { return this.value === NOTIFICATION_PREFERENCE_TYPE.OPT_OUT; }
  isQuietHours(): boolean { return this.value === NOTIFICATION_PREFERENCE_TYPE.QUIET_HOURS; }
  isFrequency(): boolean { return this.value === NOTIFICATION_PREFERENCE_TYPE.FREQUENCY; }
}

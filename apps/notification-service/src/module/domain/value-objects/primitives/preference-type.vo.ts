/**
 * PreferenceType Value Object
 * @module notification-service/domain/value-objects/primitives
 */
import { BaseTypeVO } from '@vubon/shared-kernel/domain/primitives';
import { NOTIFICATION_PREFERENCE_TYPE } from '@vubon/shared-constants/platform/notification';
import { InvalidPreferenceTypeError } from '../../errors/preference.errors.js';

type PreferenceTypeValue =
  (typeof NOTIFICATION_PREFERENCE_TYPE)[keyof typeof NOTIFICATION_PREFERENCE_TYPE];
const ALLOWED = Object.values(NOTIFICATION_PREFERENCE_TYPE) as readonly string[];

export class PreferenceTypeVO extends BaseTypeVO<PreferenceTypeValue> {
  private constructor(value: PreferenceTypeValue) {
    super(value);
  }

  static override allowedValues(): ReadonlySet<string> {
    return new Set<string>(ALLOWED);
  }

  static create(raw: string): PreferenceTypeVO {
    if (!ALLOWED.includes(raw)) {
      throw new InvalidPreferenceTypeError(raw, ALLOWED);
    }
    return new PreferenceTypeVO(raw as PreferenceTypeValue);
  }

  static reconstitute(raw: string): PreferenceTypeVO {
    return new PreferenceTypeVO(raw as PreferenceTypeValue);
  }

  static optIn(): PreferenceTypeVO { return new PreferenceTypeVO(NOTIFICATION_PREFERENCE_TYPE.OPT_IN); }
  static optOut(): PreferenceTypeVO { return new PreferenceTypeVO(NOTIFICATION_PREFERENCE_TYPE.OPT_OUT); }
  static channelSpecific(): PreferenceTypeVO { return new PreferenceTypeVO(NOTIFICATION_PREFERENCE_TYPE.CHANNEL_SPECIFIC); }
  static categorySpecific(): PreferenceTypeVO { return new PreferenceTypeVO(NOTIFICATION_PREFERENCE_TYPE.CATEGORY_SPECIFIC); }
  static quietHours(): PreferenceTypeVO { return new PreferenceTypeVO(NOTIFICATION_PREFERENCE_TYPE.QUIET_HOURS); }
  static frequency(): PreferenceTypeVO { return new PreferenceTypeVO(NOTIFICATION_PREFERENCE_TYPE.FREQUENCY); }

  isOptIn(): boolean { return this.value === NOTIFICATION_PREFERENCE_TYPE.OPT_IN; }
  isOptOut(): boolean { return this.value === NOTIFICATION_PREFERENCE_TYPE.OPT_OUT; }
  isChannelSpecific(): boolean { return this.value === NOTIFICATION_PREFERENCE_TYPE.CHANNEL_SPECIFIC; }
  isCategorySpecific(): boolean { return this.value === NOTIFICATION_PREFERENCE_TYPE.CATEGORY_SPECIFIC; }
  isQuietHours(): boolean { return this.value === NOTIFICATION_PREFERENCE_TYPE.QUIET_HOURS; }
  isFrequency(): boolean { return this.value === NOTIFICATION_PREFERENCE_TYPE.FREQUENCY; }
}

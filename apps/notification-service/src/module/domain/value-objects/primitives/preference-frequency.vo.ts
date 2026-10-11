/**
 * PreferenceFrequency Value Object
 * @module notification-service/domain/value-objects/primitives
 */
import { BaseTypeVO } from '@vubon/shared-kernel/domain/primitives';
import { NOTIFICATION_PREFERENCE_FREQUENCY } from '@vubon/shared-constants/platform/notification';
import { InvalidPreferenceFrequencyError } from '../../errors/preference.errors.js';

type PreferenceFrequencyValue =
  (typeof NOTIFICATION_PREFERENCE_FREQUENCY)[keyof typeof NOTIFICATION_PREFERENCE_FREQUENCY];
const ALLOWED = Object.values(NOTIFICATION_PREFERENCE_FREQUENCY) as readonly string[];

export class PreferenceFrequencyVO extends BaseTypeVO<PreferenceFrequencyValue> {
  private constructor(value: PreferenceFrequencyValue) {
    super(value);
  }

  static override allowedValues(): ReadonlySet<string> {
    return new Set<string>(ALLOWED);
  }

  static create(raw: string): PreferenceFrequencyVO {
    if (!ALLOWED.includes(raw)) {
      throw new InvalidPreferenceFrequencyError(raw, ALLOWED);
    }
    return new PreferenceFrequencyVO(raw as PreferenceFrequencyValue);
  }

  static reconstitute(raw: string): PreferenceFrequencyVO {
    return new PreferenceFrequencyVO(raw as PreferenceFrequencyValue);
  }

  static instant(): PreferenceFrequencyVO { return new PreferenceFrequencyVO(NOTIFICATION_PREFERENCE_FREQUENCY.INSTANT); }
  static hourly(): PreferenceFrequencyVO { return new PreferenceFrequencyVO(NOTIFICATION_PREFERENCE_FREQUENCY.HOURLY); }
  static daily(): PreferenceFrequencyVO { return new PreferenceFrequencyVO(NOTIFICATION_PREFERENCE_FREQUENCY.DAILY); }
  static weekly(): PreferenceFrequencyVO { return new PreferenceFrequencyVO(NOTIFICATION_PREFERENCE_FREQUENCY.WEEKLY); }
  static never(): PreferenceFrequencyVO { return new PreferenceFrequencyVO(NOTIFICATION_PREFERENCE_FREQUENCY.NEVER); }

  isInstant(): boolean { return this.value === NOTIFICATION_PREFERENCE_FREQUENCY.INSTANT; }
  isHourly(): boolean { return this.value === NOTIFICATION_PREFERENCE_FREQUENCY.HOURLY; }
  isDaily(): boolean { return this.value === NOTIFICATION_PREFERENCE_FREQUENCY.DAILY; }
  isWeekly(): boolean { return this.value === NOTIFICATION_PREFERENCE_FREQUENCY.WEEKLY; }
  isNever(): boolean { return this.value === NOTIFICATION_PREFERENCE_FREQUENCY.NEVER; }

  /** Whether user wants any notifications at all on this channel/category. */
  allowsDelivery(): boolean {
    return !this.isNever();
  }

  /** Minimum interval between deliveries (seconds), null = instantaneous. */
  minIntervalSeconds(): number | null {
    switch (this.value) {
      case NOTIFICATION_PREFERENCE_FREQUENCY.INSTANT: return null;
      case NOTIFICATION_PREFERENCE_FREQUENCY.HOURLY: return 3600;
      case NOTIFICATION_PREFERENCE_FREQUENCY.DAILY: return 86400;
      case NOTIFICATION_PREFERENCE_FREQUENCY.WEEKLY: return 604800;
      case NOTIFICATION_PREFERENCE_FREQUENCY.NEVER: return null;
      default: return null;
    }
  }
}

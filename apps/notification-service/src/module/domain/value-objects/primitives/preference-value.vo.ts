/**
 * PreferenceValue Value Object
 * @module notification-service/domain/value-objects/primitives
 *
 * Boolean বা frequency value — polymorphic preference value।
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { NOTIFICATION_PREFERENCE_FREQUENCY } from '@vubon/shared-constants/platform';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

export type PreferenceFrequencyValue =
  (typeof NOTIFICATION_PREFERENCE_FREQUENCY)[keyof typeof NOTIFICATION_PREFERENCE_FREQUENCY];

const ALLOWED_FREQUENCIES = Object.values(NOTIFICATION_PREFERENCE_FREQUENCY) as readonly string[];

export type PreferenceValuePrimitive = boolean | PreferenceFrequencyValue;

export class PreferenceValueVO extends BaseVO<PreferenceValuePrimitive> {
  private constructor(value: PreferenceValuePrimitive) {
    super(value);
  }

  static create(raw: unknown): PreferenceValueVO {
    if (typeof raw === 'boolean') {
      return new PreferenceValueVO(raw);
    }
    if (typeof raw === 'string') {
      const normalized = raw.trim().toLowerCase();
      if (!ALLOWED_FREQUENCIES.includes(normalized)) {
        throw new ValidationError(
          `Invalid preference frequency "${normalized}". Allowed: ${ALLOWED_FREQUENCIES.join(', ')}`,
          'preferenceValue',
        );
      }
      return new PreferenceValueVO(normalized as PreferenceFrequencyValue);
    }
    throw new ValidationError('PreferenceValue must be boolean or frequency string', 'preferenceValue');
  }

  static reconstitute(raw: PreferenceValuePrimitive): PreferenceValueVO {
    return new PreferenceValueVO(raw);
  }

  get isBoolean(): boolean { return typeof this.value === 'boolean'; }
  get isFrequency(): boolean { return typeof this.value === 'string'; }
  get asBoolean(): boolean | undefined {
    return typeof this.value === 'boolean' ? this.value : undefined;
  }
  get asFrequency(): PreferenceFrequencyValue | undefined {
    return typeof this.value === 'string' ? this.value : undefined;
  }
}

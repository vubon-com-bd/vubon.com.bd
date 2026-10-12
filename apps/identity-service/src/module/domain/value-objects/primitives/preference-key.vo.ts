/**
 * PreferenceKey Value Object
 * @module identity-service/domain/value-objects/primitives
 */
import { BaseTypeVO } from '@vubon/shared-kernel/domain/primitives';
import { USER_PREFERENCE } from '@vubon/shared-constants/user';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

const VALID: readonly string[] = Object.values(USER_PREFERENCE);

export class PreferenceKeyVO extends BaseTypeVO<string> {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): PreferenceKeyVO {
    if (typeof raw !== 'string' || raw.trim().length === 0) {
      throw new ValidationError('PreferenceKey cannot be empty', 'preferenceKey');
    }
    const normalized = raw.trim().toLowerCase();
    if (!VALID.includes(normalized)) {
      throw new ValidationError(
        `Invalid PreferenceKey "${normalized}". Allowed: ${VALID.join(', ')}`,
        'preferenceKey',
      );
    }
    return new PreferenceKeyVO(normalized);
  }

  static newsletter(): PreferenceKeyVO { return new PreferenceKeyVO(USER_PREFERENCE.NEWSLETTER); }
  static promotions(): PreferenceKeyVO { return new PreferenceKeyVO(USER_PREFERENCE.PROMOTIONS); }
  static orderUpdates(): PreferenceKeyVO { return new PreferenceKeyVO(USER_PREFERENCE.ORDER_UPDATES); }
  static securityAlerts(): PreferenceKeyVO { return new PreferenceKeyVO(USER_PREFERENCE.SECURITY_ALERTS); }

  static reconstitute(raw: string): PreferenceKeyVO {
    return new PreferenceKeyVO(raw);
  }

  isSecurityRelated(): boolean { return this.value === USER_PREFERENCE.SECURITY_ALERTS; }
  isMarketing(): boolean {
    return [
      USER_PREFERENCE.NEWSLETTER,
      USER_PREFERENCE.PROMOTIONS,
      USER_PREFERENCE.PRODUCT_RECOMMENDATIONS,
    ].includes(this.value as never);
  }
}

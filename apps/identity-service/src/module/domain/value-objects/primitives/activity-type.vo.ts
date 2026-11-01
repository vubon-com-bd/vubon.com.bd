/**
 * ActivityType Value Object
 * @module identity-service/domain/value-objects/primitives
 */
import { BaseTypeVO } from '@vubon/shared-kernel/domain/primitives';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

export type ActivityTypeValue =
  | 'login'
  | 'logout'
  | 'password_change'
  | 'email_change'
  | 'phone_change'
  | 'profile_update'
  | 'mfa_enabled'
  | 'mfa_disabled'
  | 'device_added'
  | 'device_removed'
  | 'session_revoked'
  | 'kyc_submitted'
  | 'kyc_verified';

const VALID_TYPES: readonly ActivityTypeValue[] = [
  'login',
  'logout',
  'password_change',
  'email_change',
  'phone_change',
  'profile_update',
  'mfa_enabled',
  'mfa_disabled',
  'device_added',
  'device_removed',
  'session_revoked',
  'kyc_submitted',
  'kyc_verified',
];

export class ActivityTypeVO extends BaseTypeVO<string> {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): ActivityTypeVO {
    if (typeof raw !== 'string' || raw.trim().length === 0) {
      throw new ValidationError('ActivityType cannot be empty', 'activityType');
    }
    const normalized = raw.trim().toLowerCase().replace(/\s+/g, '_');
    if (!VALID_TYPES.includes(normalized as ActivityTypeValue)) {
      throw new ValidationError(
        `Invalid ActivityType "${normalized}". Allowed: ${VALID_TYPES.join(', ')}`,
        'activityType',
      );
    }
    return new ActivityTypeVO(normalized);
  }

  static login(): ActivityTypeVO { return new ActivityTypeVO('login'); }
  static logout(): ActivityTypeVO { return new ActivityTypeVO('logout'); }
  static passwordChange(): ActivityTypeVO { return new ActivityTypeVO('password_change'); }
  static profileUpdate(): ActivityTypeVO { return new ActivityTypeVO('profile_update'); }

  static reconstitute(raw: string): ActivityTypeVO {
    return new ActivityTypeVO(raw);
  }

  isSecurityEvent(): boolean {
    return [
      'login',
      'logout',
      'password_change',
      'mfa_enabled',
      'mfa_disabled',
      'device_added',
      'device_removed',
      'session_revoked',
    ].includes(this.value);
  }
}

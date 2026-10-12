/**
 * VerificationPurpose Value Object
 * @module identity-service/domain/value-objects/primitives
 */
import { BaseTypeVO } from '@vubon/shared-kernel/domain/primitives';
import { InvalidVerificationPurposeError } from '../../errors/verification.errors.js';

export type VerificationPurposeValue =
  | 'email_verify'
  | 'phone_verify'
  | 'login'
  | 'password_reset'
  | 'mfa_setup';

const VALID_PURPOSES: readonly VerificationPurposeValue[] = [
  'email_verify',
  'phone_verify',
  'login',
  'password_reset',
  'mfa_setup',
];

export class VerificationPurposeVO extends BaseTypeVO<string> {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): VerificationPurposeVO {
    if (typeof raw !== 'string' || raw.trim().length === 0) {
      throw new InvalidVerificationPurposeError(String(raw), VALID_PURPOSES);
    }
    const normalized = raw.trim().toLowerCase();
    if (!VALID_PURPOSES.includes(normalized as VerificationPurposeValue)) {
      throw new InvalidVerificationPurposeError(normalized, VALID_PURPOSES);
    }
    return new VerificationPurposeVO(normalized);
  }

  static emailVerify(): VerificationPurposeVO { return new VerificationPurposeVO('email_verify'); }
  static phoneVerify(): VerificationPurposeVO { return new VerificationPurposeVO('phone_verify'); }
  static login(): VerificationPurposeVO { return new VerificationPurposeVO('login'); }
  static passwordReset(): VerificationPurposeVO { return new VerificationPurposeVO('password_reset'); }
  static mfaSetup(): VerificationPurposeVO { return new VerificationPurposeVO('mfa_setup'); }

  static reconstitute(raw: string): VerificationPurposeVO {
    return new VerificationPurposeVO(raw);
  }

  isEmailVerify(): boolean { return this.value === 'email_verify'; }
  isPhoneVerify(): boolean { return this.value === 'phone_verify'; }
  isLogin(): boolean { return this.value === 'login'; }
  isPasswordReset(): boolean { return this.value === 'password_reset'; }
  isMfaSetup(): boolean { return this.value === 'mfa_setup'; }
}

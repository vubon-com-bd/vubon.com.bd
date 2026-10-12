/**
 * AuthMethod Value Object
 * @module identity-service/domain/value-objects/primitives
 */
import { BaseTypeVO } from '@vubon/shared-kernel/domain/primitives';
import { AUTH_METHOD } from '@vubon/shared-constants/auth';
import { InvalidAuthMethodError } from '../../errors/auth.errors.js';

const VALID_METHODS: readonly string[] = Object.values(AUTH_METHOD);

export class AuthMethodVO extends BaseTypeVO<string> {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): AuthMethodVO {
    if (typeof raw !== 'string' || raw.trim().length === 0) {
      throw new InvalidAuthMethodError(String(raw), VALID_METHODS);
    }
    const normalized = raw.trim().toLowerCase();
    if (!VALID_METHODS.includes(normalized)) {
      throw new InvalidAuthMethodError(normalized, VALID_METHODS);
    }
    return new AuthMethodVO(normalized);
  }

  static emailPassword(): AuthMethodVO { return new AuthMethodVO(AUTH_METHOD.EMAIL_PASSWORD); }
  static phonePassword(): AuthMethodVO { return new AuthMethodVO(AUTH_METHOD.PHONE_PASSWORD); }
  static emailOtp(): AuthMethodVO { return new AuthMethodVO(AUTH_METHOD.EMAIL_OTP); }
  static socialLogin(): AuthMethodVO { return new AuthMethodVO(AUTH_METHOD.SOCIAL_LOGIN); }

  static reconstitute(raw: string): AuthMethodVO {
    return new AuthMethodVO(raw);
  }

  isPasswordBased(): boolean {
    return [AUTH_METHOD.EMAIL_PASSWORD, AUTH_METHOD.PHONE_PASSWORD,
            AUTH_METHOD.USERNAME_PASSWORD].includes(this.value as never);
  }
  isOtpBased(): boolean {
    return [AUTH_METHOD.EMAIL_OTP, AUTH_METHOD.PHONE_OTP].includes(this.value as never);
  }
  isFederated(): boolean {
    return [AUTH_METHOD.SOCIAL_LOGIN, AUTH_METHOD.OAUTH2, AUTH_METHOD.SAML].includes(this.value as never);
  }
}

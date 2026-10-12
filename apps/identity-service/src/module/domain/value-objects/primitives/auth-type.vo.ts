/**
 * AuthType Value Object
 * @module identity-service/domain/value-objects/primitives
 *
 * Values: AUTH_TYPE from shared-constants
 */
import { BaseTypeVO } from '@vubon/shared-kernel/domain/primitives';
import { AUTH_TYPE } from '@vubon/shared-constants/auth';
import { InvalidAuthTypeError } from '../../errors/auth.errors.js';

const VALID_TYPES: readonly string[] = Object.values(AUTH_TYPE);

export class AuthTypeVO extends BaseTypeVO<string> {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): AuthTypeVO {
    if (typeof raw !== 'string' || raw.trim().length === 0) {
      throw new InvalidAuthTypeError(String(raw), VALID_TYPES);
    }
    const normalized = raw.trim().toLowerCase();
    if (!VALID_TYPES.includes(normalized)) {
      throw new InvalidAuthTypeError(normalized, VALID_TYPES);
    }
    return new AuthTypeVO(normalized);
  }

  static password(): AuthTypeVO { return new AuthTypeVO(AUTH_TYPE.PASSWORD); }
  static otp(): AuthTypeVO { return new AuthTypeVO(AUTH_TYPE.OTP); }
  static magicLink(): AuthTypeVO { return new AuthTypeVO(AUTH_TYPE.MAGIC_LINK); }
  static social(): AuthTypeVO { return new AuthTypeVO(AUTH_TYPE.SOCIAL); }
  static oauth(): AuthTypeVO { return new AuthTypeVO(AUTH_TYPE.OAUTH); }
  static sso(): AuthTypeVO { return new AuthTypeVO(AUTH_TYPE.SSO); }
  static biometric(): AuthTypeVO { return new AuthTypeVO(AUTH_TYPE.BIOMETRIC); }
  static apiKey(): AuthTypeVO { return new AuthTypeVO(AUTH_TYPE.API_KEY); }
  static anonymous(): AuthTypeVO { return new AuthTypeVO(AUTH_TYPE.ANONYMOUS); }

  static reconstitute(raw: string): AuthTypeVO {
    return new AuthTypeVO(raw);
  }

  // ═══ Predicates ═══
  isPassword(): boolean { return this.value === AUTH_TYPE.PASSWORD; }
  isOtp(): boolean { return this.value === AUTH_TYPE.OTP; }
  isMagicLink(): boolean { return this.value === AUTH_TYPE.MAGIC_LINK; }
  isSocial(): boolean { return this.value === AUTH_TYPE.SOCIAL; }
  isOauth(): boolean { return this.value === AUTH_TYPE.OAUTH; }
  isSso(): boolean { return this.value === AUTH_TYPE.SSO; }
  isBiometric(): boolean { return this.value === AUTH_TYPE.BIOMETRIC; }
  isApiKey(): boolean { return this.value === AUTH_TYPE.API_KEY; }
  isAnonymous(): boolean { return this.value === AUTH_TYPE.ANONYMOUS; }

  isFederated(): boolean { return this.isSocial() || this.isOauth() || this.isSso(); }
  requiresPassword(): boolean { return this.isPassword(); }
  requiresMfa(): boolean {
    return this.isPassword() || this.isOtp() || this.isBiometric();
  }
  isInteractive(): boolean {
    return !this.isApiKey() && !this.isAnonymous();
  }
}

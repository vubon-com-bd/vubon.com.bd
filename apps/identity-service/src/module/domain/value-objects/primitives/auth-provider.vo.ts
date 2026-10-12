/**
 * AuthProvider Value Object
 * @module identity-service/domain/value-objects/primitives
 */
import { BaseTypeVO } from '@vubon/shared-kernel/domain/primitives';
import { AUTH_PROVIDER } from '@vubon/shared-constants/auth';
import { InvalidAuthProviderError } from '../../errors/auth.errors.js';

const VALID_PROVIDERS: readonly string[] = Object.values(AUTH_PROVIDER);

export class AuthProviderVO extends BaseTypeVO<string> {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): AuthProviderVO {
    if (typeof raw !== 'string' || raw.trim().length === 0) {
      throw new InvalidAuthProviderError(String(raw), VALID_PROVIDERS);
    }
    const normalized = raw.trim().toLowerCase();
    if (!VALID_PROVIDERS.includes(normalized)) {
      throw new InvalidAuthProviderError(normalized, VALID_PROVIDERS);
    }
    return new AuthProviderVO(normalized);
  }

  static local(): AuthProviderVO { return new AuthProviderVO(AUTH_PROVIDER.LOCAL); }
  static google(): AuthProviderVO { return new AuthProviderVO(AUTH_PROVIDER.GOOGLE); }
  static facebook(): AuthProviderVO { return new AuthProviderVO(AUTH_PROVIDER.FACEBOOK); }
  static apple(): AuthProviderVO { return new AuthProviderVO(AUTH_PROVIDER.APPLE); }
  static github(): AuthProviderVO { return new AuthProviderVO(AUTH_PROVIDER.GITHUB); }

  static reconstitute(raw: string): AuthProviderVO {
    return new AuthProviderVO(raw);
  }

  isLocal(): boolean { return this.value === AUTH_PROVIDER.LOCAL; }
  isSocial(): boolean {
    return [AUTH_PROVIDER.GOOGLE, AUTH_PROVIDER.FACEBOOK, AUTH_PROVIDER.APPLE,
            AUTH_PROVIDER.GITHUB, AUTH_PROVIDER.TWITTER, AUTH_PROVIDER.LINKEDIN,
            AUTH_PROVIDER.MICROSOFT].includes(this.value as never);
  }
  isCustom(): boolean { return this.value === AUTH_PROVIDER.CUSTOM; }
}

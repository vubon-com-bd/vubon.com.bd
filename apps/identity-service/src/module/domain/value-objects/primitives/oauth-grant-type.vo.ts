/**
 * OAuthGrantType Value Object
 * @module identity-service/domain/value-objects/primitives
 */
import { BaseTypeVO } from '@vubon/shared-kernel/domain/primitives';
import { AUTH_OAUTH } from '@vubon/shared-constants/auth';
import { InvalidOAuthGrantTypeError } from '../../errors/social.errors.js';

const VALID_GRANTS: readonly string[] = [
  AUTH_OAUTH.GRANT_TYPE_AUTHORIZATION_CODE,
  AUTH_OAUTH.GRANT_TYPE_CLIENT_CREDENTIALS,
  AUTH_OAUTH.GRANT_TYPE_REFRESH_TOKEN,
  AUTH_OAUTH.GRANT_TYPE_PASSWORD,
];

export class OAuthGrantTypeVO extends BaseTypeVO<string> {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): OAuthGrantTypeVO {
    if (typeof raw !== 'string' || raw.trim().length === 0) {
      throw new InvalidOAuthGrantTypeError(String(raw), VALID_GRANTS);
    }
    const normalized = raw.trim().toLowerCase();
    if (!VALID_GRANTS.includes(normalized)) {
      throw new InvalidOAuthGrantTypeError(normalized, VALID_GRANTS);
    }
    return new OAuthGrantTypeVO(normalized);
  }

  static authorizationCode(): OAuthGrantTypeVO {
    return new OAuthGrantTypeVO(AUTH_OAUTH.GRANT_TYPE_AUTHORIZATION_CODE);
  }
  static clientCredentials(): OAuthGrantTypeVO {
    return new OAuthGrantTypeVO(AUTH_OAUTH.GRANT_TYPE_CLIENT_CREDENTIALS);
  }
  static refreshToken(): OAuthGrantTypeVO {
    return new OAuthGrantTypeVO(AUTH_OAUTH.GRANT_TYPE_REFRESH_TOKEN);
  }
  static password(): OAuthGrantTypeVO {
    return new OAuthGrantTypeVO(AUTH_OAUTH.GRANT_TYPE_PASSWORD);
  }

  static reconstitute(raw: string): OAuthGrantTypeVO {
    return new OAuthGrantTypeVO(raw);
  }

  requiresRedirectUri(): boolean {
    return this.value === AUTH_OAUTH.GRANT_TYPE_AUTHORIZATION_CODE;
  }
  requiresClientSecret(): boolean {
    return this.value !== AUTH_OAUTH.GRANT_TYPE_AUTHORIZATION_CODE;
  }
}

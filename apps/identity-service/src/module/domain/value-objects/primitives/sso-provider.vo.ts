/**
 * SsoProvider Value Object
 * @module identity-service/domain/value-objects/primitives
 */
import { BaseTypeVO } from '@vubon/shared-kernel/domain/primitives';
import { AUTH_SSO } from '@vubon/shared-constants/auth';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

const VALID_PROVIDERS: readonly string[] = Object.values(AUTH_SSO);

export class SsoProviderVO extends BaseTypeVO<string> {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): SsoProviderVO {
    if (typeof raw !== 'string' || raw.trim().length === 0) {
      throw new ValidationError('SsoProvider cannot be empty', 'ssoProvider');
    }
    const normalized = raw.trim().toLowerCase();
    if (!VALID_PROVIDERS.includes(normalized)) {
      throw new ValidationError(
        `Invalid SsoProvider "${normalized}". Allowed: ${VALID_PROVIDERS.join(', ')}`,
        'ssoProvider',
      );
    }
    return new SsoProviderVO(normalized);
  }

  static saml(): SsoProviderVO { return new SsoProviderVO(AUTH_SSO.SAML); }
  static oidc(): SsoProviderVO { return new SsoProviderVO(AUTH_SSO.OIDC); }
  static cas(): SsoProviderVO { return new SsoProviderVO(AUTH_SSO.CAS); }
  static kerberos(): SsoProviderVO { return new SsoProviderVO(AUTH_SSO.KERBEROS); }
  static ldap(): SsoProviderVO { return new SsoProviderVO(AUTH_SSO.LDAP); }

  static reconstitute(raw: string): SsoProviderVO {
    return new SsoProviderVO(raw);
  }

  isSaml(): boolean { return this.value === AUTH_SSO.SAML; }
  isOidc(): boolean { return this.value === AUTH_SSO.OIDC; }
  isLdap(): boolean { return this.value === AUTH_SSO.LDAP; }
}

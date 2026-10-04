/**
 * SsoProviderVO — Enterprise SSO provider
 * @module auth-service/domain/value-objects/primitives
 */
import { BaseTypeVO } from '@vubon/shared-kernel/domain/primitives/type.vo';

export type SsoProviderValue =
  | 'saml'
  | 'oidc'
  | 'azure_ad'
  | 'okta'
  | 'keycloak'
  | 'auth0'
  | 'google_workspace'
  | 'custom';

const ALLOWED: ReadonlySet<string> = new Set<string>([
  'saml', 'oidc', 'azure_ad', 'okta', 'keycloak',
  'auth0', 'google_workspace', 'custom',
]);

export class SsoProviderVO extends BaseTypeVO<SsoProviderValue> {
  private constructor(value: SsoProviderValue) {
    super(value);
  }

  static of(raw: string): SsoProviderVO {
    const lower = raw.trim().toLowerCase();
    if (!ALLOWED.has(lower)) {
      throw new Error(`Unsupported SSO provider: ${raw}`);
    }
    return new SsoProviderVO(lower as SsoProviderValue);
  }

  isSaml(): boolean {
    return this.value === 'saml';
  }

  isOidc(): boolean {
    return this.value === 'oidc' || this.value === 'azure_ad'
      || this.value === 'okta' || this.value === 'keycloak'
      || this.value === 'auth0' || this.value === 'google_workspace';
  }
}

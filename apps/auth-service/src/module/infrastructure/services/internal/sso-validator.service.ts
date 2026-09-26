/**
 * SsoValidatorService
 * @module auth-service/infrastructure/services/internal
 */
import { Injectable } from '@nestjs/common';
import { SsoProviderVO } from '../../../domain/value-objects/primitives/sso-provider.vo';
import { SsoFailedAppError } from '../../../application/errors/sso.errors';

const SUPPORTED = new Set<string>([
  'saml', 'oidc', 'azure_ad', 'okta', 'keycloak',
  'auth0', 'google_workspace', 'custom',
]);

@Injectable()
export class SsoValidatorService {
  readonly name = 'SsoValidatorService';

  assertSupported(provider: string): SsoProviderVO {
    const lower = provider.trim().toLowerCase();
    if (!SUPPORTED.has(lower)) {
      throw new SsoFailedAppError(provider, 'Unsupported SSO provider');
    }
    return SsoProviderVO.of(lower);
  }

  isSupported(provider: string): boolean {
    return SUPPORTED.has(provider.trim().toLowerCase());
  }
}

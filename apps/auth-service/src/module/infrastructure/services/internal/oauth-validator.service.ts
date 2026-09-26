/**
 * OAuthValidatorService
 * @module auth-service/infrastructure/services/internal
 */
import { Injectable } from '@nestjs/common';
import { OAuthProviderVO } from '../../../domain/value-objects/primitives/oauth-provider.vo';
import { OAuthFailedAppError } from '../../../application/errors/oauth.errors';

const SUPPORTED = new Set<string>([
  'google', 'facebook', 'github', 'linkedin',
  'microsoft', 'gitlab', 'bitbucket', 'custom',
]);

@Injectable()
export class OAuthValidatorService {
  readonly name = 'OAuthValidatorService';

  assertSupported(provider: string): OAuthProviderVO {
    const lower = provider.trim().toLowerCase();
    if (!SUPPORTED.has(lower)) {
      throw new OAuthFailedAppError(provider, 'Unsupported provider');
    }
    return OAuthProviderVO.of(lower);
  }

  isSupported(provider: string): boolean {
    return SUPPORTED.has(provider.trim().toLowerCase());
  }
}

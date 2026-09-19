import { Injectable } from '@nestjs/common';
import { randomBytes } from 'node:crypto';
import { OAUTH_CONFIG } from '../../config/oauth.config';
import { OAuthFailedError } from '../../../domain/errors/oauth.errors';

@Injectable()
export class OAuthValidatorService {
  generateState(): string {
    return randomBytes(32).toString('hex');
  }

  assertSupportedProvider(provider: string): void {
    const supported: readonly string[] = ['google', 'facebook', 'github'];
    if (!supported.includes(provider)) {
      throw new OAuthFailedError(provider, 'unsupported provider');
    }
  }

  getClientConfig(provider: string): { clientId: string; clientSecret: string; redirectUri: string } {
    this.assertSupportedProvider(provider);
    const map: Record<string, { clientId: string; clientSecret: string; redirectUri: string }> = {
      google: OAUTH_CONFIG.google,
      facebook: OAUTH_CONFIG.facebook,
      github: OAUTH_CONFIG.github,
    };
    return map[provider];
  }

  getStateTtlSeconds(): number {
    return OAUTH_CONFIG.stateTtlSeconds;
  }
}

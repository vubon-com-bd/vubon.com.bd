import type { OAuthProfile, OAuthProvider } from './provider.interface';
import type { OAuthServiceContract } from './service.interface';

/**
 * Server-side OAuth orchestration.
 * ⚠️ SERVER-ONLY.
 */
export class OAuthService implements OAuthServiceContract {
  constructor(private readonly providers: Map<string, OAuthProvider>) {}

  getProvider(name: string): OAuthProvider {
    const p = this.providers.get(name);
    if (!p) throw new Error(`OAuth provider "${name}" not registered`);
    return p;
  }

  authorize(
    name: string,
    input: {
      state: string;
      codeChallenge?: string;
      redirectUri: string;
    }
  ): string {
    return this.getProvider(name).buildAuthorizeUrl(input);
  }

  async handleCallback(
    name: string,
    input: {
      code: string;
      redirectUri: string;
      codeVerifier?: string;
    }
  ): Promise<OAuthProfile> {
    const provider = this.getProvider(name);
    const tokens = await provider.exchangeCode(input);
    return provider.fetchProfile(tokens);
  }
}

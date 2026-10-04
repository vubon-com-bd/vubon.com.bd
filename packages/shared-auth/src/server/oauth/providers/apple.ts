import type { OAuthProfile, OAuthProvider, OAuthTokens } from '../provider.interface';

export interface AppleOAuthConfig {
  readonly clientId: string;
  readonly teamId: string;
  readonly keyId: string;
  readonly privateKey: string;
  readonly scopes?: readonly string[];
}

export class AppleOAuthProvider implements OAuthProvider {
  readonly name = 'apple';

  constructor(private readonly config: AppleOAuthConfig) {}

  buildAuthorizeUrl(input: { state: string; codeChallenge?: string; redirectUri: string }): string {
    const params = new URLSearchParams({
      client_id: this.config.clientId,
      redirect_uri: input.redirectUri,
      response_type: 'code',
      response_mode: 'form_post',
      scope: (this.config.scopes ?? ['name', 'email']).join(' '),
      state: input.state,
    });
    return `https://appleid.apple.com/auth/authorize?${params.toString()}`;
  }

  async exchangeCode(_input: { code: string; redirectUri: string }): Promise<OAuthTokens> {
    // Apple requires a client_secret JWT signed with the private key.
    // TODO: build client_secret and call https://appleid.apple.com/auth/token
    throw new Error('Apple OAuth exchangeCode not implemented — build client_secret JWT first');
  }

  async fetchProfile(_tokens: OAuthTokens): Promise<OAuthProfile> {
    // Apple does not expose a userinfo endpoint — parse id_token instead.
    throw new Error('Apple does not expose a userinfo endpoint — parse id_token instead');
  }
}

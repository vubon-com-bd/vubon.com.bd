import type { OAuthProfile, OAuthProvider, OAuthTokens } from '../provider.interface';

export interface FacebookOAuthConfig {
  readonly clientId: string;
  readonly clientSecret: string;
  readonly scopes?: readonly string[];
}

export class FacebookOAuthProvider implements OAuthProvider {
  readonly name = 'facebook';

  constructor(private readonly config: FacebookOAuthConfig) {}

  buildAuthorizeUrl(input: { state: string; codeChallenge?: string; redirectUri: string }): string {
    const params = new URLSearchParams({
      client_id: this.config.clientId,
      redirect_uri: input.redirectUri,
      response_type: 'code',
      scope: (this.config.scopes ?? ['email', 'public_profile']).join(','),
      state: input.state,
    });
    return `https://www.facebook.com/v18.0/dialog/oauth?${params.toString()}`;
  }

  async exchangeCode(input: { code: string; redirectUri: string }): Promise<OAuthTokens> {
    const params = new URLSearchParams({
      code: input.code,
      client_id: this.config.clientId,
      client_secret: this.config.clientSecret,
      redirect_uri: input.redirectUri,
    });
    const res = await fetch(
      `https://graph.facebook.com/v18.0/oauth/access_token?${params.toString()}`
    );
    if (!res.ok) throw new Error(`Facebook token exchange failed: ${res.status}`);
    const j = (await res.json()) as Record<string, unknown>;
    return {
      accessToken: String(j.access_token ?? ''),
      tokenType: j.token_type ? String(j.token_type) : undefined,
      expiresIn: j.expires_in ? Number(j.expires_in) : undefined,
    };
  }

  async fetchProfile(tokens: OAuthTokens): Promise<OAuthProfile> {
    const params = new URLSearchParams({
      fields: 'id,name,email,picture',
      access_token: tokens.accessToken,
    });
    const res = await fetch(`https://graph.facebook.com/v18.0/me?${params.toString()}`);
    if (!res.ok) throw new Error(`Facebook profile failed: ${res.status}`);
    const j = (await res.json()) as Record<string, unknown>;
    const pic = (j.picture as { data?: { url?: string } } | undefined)?.data?.url;
    return {
      providerId: 'facebook',
      providerUserId: String(j.id ?? ''),
      email: j.email ? String(j.email) : undefined,
      name: j.name ? String(j.name) : undefined,
      avatarUrl: pic,
      raw: j,
    };
  }
}

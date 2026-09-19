import type { OAuthProfile, OAuthProvider, OAuthTokens } from '../provider.interface';

export interface TwitterOAuthConfig {
  readonly clientId: string;
  readonly clientSecret: string;
}

export class TwitterOAuthProvider implements OAuthProvider {
  readonly name = 'twitter';

  constructor(private readonly config: TwitterOAuthConfig) {}

  buildAuthorizeUrl(input: { state: string; codeChallenge?: string; redirectUri: string }): string {
    const params = new URLSearchParams({
      client_id: this.config.clientId,
      redirect_uri: input.redirectUri,
      response_type: 'code',
      scope: 'tweet.read users.read offline.access',
      state: input.state,
      code_challenge: input.codeChallenge ?? 'challenge',
      code_challenge_method: 'plain',
    });
    return `https://twitter.com/i/oauth2/authorize?${params.toString()}`;
  }

  async exchangeCode(input: { code: string; redirectUri: string }): Promise<OAuthTokens> {
    const basic = Buffer.from(`${this.config.clientId}:${this.config.clientSecret}`).toString(
      'base64'
    );
    const body = new URLSearchParams({
      code: input.code,
      grant_type: 'authorization_code',
      redirect_uri: input.redirectUri,
      code_verifier: 'challenge',
    });
    const res = await fetch('https://api.twitter.com/2/oauth2/token', {
      method: 'POST',
      headers: {
        Authorization: `Basic ${basic}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body,
    });
    if (!res.ok) throw new Error(`Twitter token exchange failed: ${res.status}`);
    const j = (await res.json()) as Record<string, unknown>;
    return {
      accessToken: String(j.access_token ?? ''),
      refreshToken: j.refresh_token ? String(j.refresh_token) : undefined,
      expiresIn: j.expires_in ? Number(j.expires_in) : undefined,
      tokenType: j.token_type ? String(j.token_type) : undefined,
      scope: j.scope ? String(j.scope) : undefined,
    };
  }

  async fetchProfile(tokens: OAuthTokens): Promise<OAuthProfile> {
    const res = await fetch('https://api.twitter.com/2/users/me?user.fields=profile_image_url', {
      headers: { Authorization: `Bearer ${tokens.accessToken}` },
    });
    if (!res.ok) throw new Error(`Twitter profile failed: ${res.status}`);
    const j = (await res.json()) as { data?: Record<string, unknown> };
    const u = j.data ?? {};
    return {
      providerId: 'twitter',
      providerUserId: String(u.id ?? ''),
      name: u.name ? String(u.name) : undefined,
      avatarUrl: u.profile_image_url ? String(u.profile_image_url) : undefined,
      raw: u,
    };
  }
}

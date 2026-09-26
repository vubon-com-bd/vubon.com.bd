import type { OAuthProfile, OAuthProvider, OAuthTokens } from '../provider.interface';

export interface GithubOAuthConfig {
  readonly clientId: string;
  readonly clientSecret: string;
  readonly scopes?: readonly string[];
}

export class GithubOAuthProvider implements OAuthProvider {
  readonly name = 'github';

  constructor(private readonly config: GithubOAuthConfig) {}

  buildAuthorizeUrl(input: { state: string; codeChallenge?: string; redirectUri: string }): string {
    const params = new URLSearchParams({
      client_id: this.config.clientId,
      redirect_uri: input.redirectUri,
      scope: (this.config.scopes ?? ['read:user', 'user:email']).join(' '),
      state: input.state,
      allow_signup: 'true',
    });
    return `https://github.com/login/oauth/authorize?${params.toString()}`;
  }

  async exchangeCode(input: { code: string; redirectUri: string }): Promise<OAuthTokens> {
    const body = new URLSearchParams({
      code: input.code,
      client_id: this.config.clientId,
      client_secret: this.config.clientSecret,
      redirect_uri: input.redirectUri,
    });
    const res = await fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body,
    });
    if (!res.ok) throw new Error(`GitHub token exchange failed: ${res.status}`);
    const j = (await res.json()) as Record<string, unknown>;
    return {
      accessToken: String(j.access_token ?? ''),
      tokenType: j.token_type ? String(j.token_type) : undefined,
      scope: j.scope ? String(j.scope) : undefined,
    };
  }

  async fetchProfile(tokens: OAuthTokens): Promise<OAuthProfile> {
    const res = await fetch('https://api.github.com/user', {
      headers: {
        Authorization: `Bearer ${tokens.accessToken}`,
        Accept: 'application/vnd.github+json',
      },
    });
    if (!res.ok) throw new Error(`GitHub user failed: ${res.status}`);
    const j = (await res.json()) as Record<string, unknown>;
    return {
      providerId: 'github',
      providerUserId: String(j.id ?? ''),
      email: j.email ? String(j.email) : undefined,
      name: (j.name ?? j.login) ? String(j.name ?? j.login) : undefined,
      avatarUrl: j.avatar_url ? String(j.avatar_url) : undefined,
      raw: j,
    };
  }
}

import type { OAuthProfile, OAuthProvider, OAuthTokens } from '../provider.interface';

export interface MicrosoftOAuthConfig {
  readonly clientId: string;
  readonly clientSecret: string;
  readonly tenant?: string;
  readonly scopes?: readonly string[];
}

export class MicrosoftOAuthProvider implements OAuthProvider {
  readonly name = 'microsoft';

  constructor(private readonly config: MicrosoftOAuthConfig) {}

  private get base(): string {
    return `https://login.microsoftonline.com/${this.config.tenant ?? 'common'}`;
  }

  buildAuthorizeUrl(input: { state: string; codeChallenge?: string; redirectUri: string }): string {
    const params = new URLSearchParams({
      client_id: this.config.clientId,
      response_type: 'code',
      redirect_uri: input.redirectUri,
      response_mode: 'query',
      scope: (this.config.scopes ?? ['openid', 'email', 'profile', 'User.Read']).join(' '),
      state: input.state,
    });
    return `${this.base}/oauth2/v2.0/authorize?${params.toString()}`;
  }

  async exchangeCode(input: { code: string; redirectUri: string }): Promise<OAuthTokens> {
    const body = new URLSearchParams({
      client_id: this.config.clientId,
      client_secret: this.config.clientSecret,
      code: input.code,
      redirect_uri: input.redirectUri,
      grant_type: 'authorization_code',
    });
    const res = await fetch(`${this.base}/oauth2/v2.0/token`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body,
    });
    if (!res.ok) throw new Error(`Microsoft token exchange failed: ${res.status}`);
    const j = (await res.json()) as Record<string, unknown>;
    return {
      accessToken: String(j.access_token ?? ''),
      refreshToken: j.refresh_token ? String(j.refresh_token) : undefined,
      idToken: j.id_token ? String(j.id_token) : undefined,
      expiresIn: j.expires_in ? Number(j.expires_in) : undefined,
      tokenType: j.token_type ? String(j.token_type) : undefined,
      scope: j.scope ? String(j.scope) : undefined,
    };
  }

  async fetchProfile(tokens: OAuthTokens): Promise<OAuthProfile> {
    const res = await fetch('https://graph.microsoft.com/v1.0/me', {
      headers: { Authorization: `Bearer ${tokens.accessToken}` },
    });
    if (!res.ok) throw new Error(`Microsoft profile failed: ${res.status}`);
    const j = (await res.json()) as Record<string, unknown>;
    return {
      providerId: 'microsoft',
      providerUserId: String(j.id ?? ''),
      email: j.mail
        ? String(j.mail)
        : j.userPrincipalName
          ? String(j.userPrincipalName)
          : undefined,
      name: j.displayName ? String(j.displayName) : undefined,
      raw: j,
    };
  }
}

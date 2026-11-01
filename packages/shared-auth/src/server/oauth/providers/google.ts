import type { OAuthProfile, OAuthProvider, OAuthTokens } from '../provider.interface';

export interface GoogleOAuthConfig {
  readonly clientId: string;
  readonly clientSecret: string;
  readonly scopes?: readonly string[];
}

const GOOGLE_AUTH = 'https://accounts.google.com/o/oauth2/v2/auth';
const GOOGLE_TOKEN = 'https://oauth2.googleapis.com/token';
const GOOGLE_USERINFO = 'https://www.googleapis.com/oauth2/v3/userinfo';

export class GoogleOAuthProvider implements OAuthProvider {
  readonly name = 'google';

  constructor(private readonly config: GoogleOAuthConfig) {}

  buildAuthorizeUrl(input: { state: string; codeChallenge?: string; redirectUri: string }): string {
    const params = new URLSearchParams({
      client_id: this.config.clientId,
      redirect_uri: input.redirectUri,
      response_type: 'code',
      scope: (this.config.scopes ?? ['openid', 'email', 'profile']).join(' '),
      state: input.state,
      access_type: 'offline',
      prompt: 'consent',
    });
    if (input.codeChallenge) {
      params.set('code_challenge', input.codeChallenge);
      params.set('code_challenge_method', 'S256');
    }
    return `${GOOGLE_AUTH}?${params.toString()}`;
  }

  async exchangeCode(input: {
    code: string;
    redirectUri: string;
    codeVerifier?: string;
  }): Promise<OAuthTokens> {
    const body = new URLSearchParams({
      code: input.code,
      client_id: this.config.clientId,
      client_secret: this.config.clientSecret,
      redirect_uri: input.redirectUri,
      grant_type: 'authorization_code',
    });
    if (input.codeVerifier) body.set('code_verifier', input.codeVerifier);

    const res = await fetch(GOOGLE_TOKEN, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body,
    });
    if (!res.ok) throw new Error(`Google token exchange failed: ${res.status}`);
    const json = (await res.json()) as Record<string, unknown>;
    return {
      accessToken: String(json.access_token ?? ''),
      refreshToken: json.refresh_token ? String(json.refresh_token) : undefined,
      idToken: json.id_token ? String(json.id_token) : undefined,
      expiresIn: json.expires_in ? Number(json.expires_in) : undefined,
      tokenType: json.token_type ? String(json.token_type) : undefined,
      scope: json.scope ? String(json.scope) : undefined,
    };
  }

  async fetchProfile(tokens: OAuthTokens): Promise<OAuthProfile> {
    const res = await fetch(GOOGLE_USERINFO, {
      headers: { Authorization: `Bearer ${tokens.accessToken}` },
    });
    if (!res.ok) throw new Error(`Google userinfo failed: ${res.status}`);
    const j = (await res.json()) as Record<string, unknown>;
    return {
      providerId: 'google',
      providerUserId: String(j.sub ?? ''),
      email: j.email ? String(j.email) : undefined,
      name: j.name ? String(j.name) : undefined,
      avatarUrl: j.picture ? String(j.picture) : undefined,
      raw: j,
    };
  }
}

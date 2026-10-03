export interface OAuthProfile {
  readonly providerId: string;
  readonly providerUserId: string;
  readonly email?: string;
  readonly name?: string;
  readonly avatarUrl?: string;
  readonly raw?: Record<string, unknown>;
}

export interface OAuthTokens {
  readonly accessToken: string;
  readonly refreshToken?: string;
  readonly idToken?: string;
  readonly expiresIn?: number;
  readonly tokenType?: string;
  readonly scope?: string;
}

export interface OAuthProvider {
  readonly name: string;
  buildAuthorizeUrl(input: { state: string; codeChallenge?: string; redirectUri: string }): string;
  exchangeCode(input: {
    code: string;
    redirectUri: string;
    codeVerifier?: string;
  }): Promise<OAuthTokens>;
  fetchProfile(tokens: OAuthTokens): Promise<OAuthProfile>;
}

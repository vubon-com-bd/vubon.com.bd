/**
 * GoogleOAuthClient — handles Google OAuth2 token + profile exchange
 * @module identity-service/infrastructure/external/oauth
 */
import { Injectable, Logger } from '@nestjs/common';
import { GOOGLE_OAUTH_CONFIG } from '../../config/google.config.js';

export interface GoogleTokenResponse {
  readonly access_token: string;
  readonly refresh_token?: string;
  readonly expires_in: number;
  readonly token_type: string;
  readonly scope: string;
  readonly id_token?: string;
}

export interface GoogleProfile {
  readonly id: string;
  readonly email: string;
  readonly email_verified: boolean;
  readonly name: string;
  readonly given_name?: string;
  readonly family_name?: string;
  readonly picture?: string;
  readonly locale?: string;
}

@Injectable()
export class GoogleOAuthClient {
  private readonly logger = new Logger(GoogleOAuthClient.name);

  /**
   * Build Google authorization URL for redirect
   */
  buildAuthorizationUrl(params: {
    state: string;
    codeChallenge?: string;
  }): string {
    const url = new URL(GOOGLE_OAUTH_CONFIG.authorizationUrl);
    url.searchParams.set('client_id', GOOGLE_OAUTH_CONFIG.clientId);
    url.searchParams.set('redirect_uri', GOOGLE_OAUTH_CONFIG.redirectUri);
    url.searchParams.set('response_type', 'code');
    url.searchParams.set('scope', GOOGLE_OAUTH_CONFIG.scope);
    url.searchParams.set('state', params.state);
    url.searchParams.set('access_type', 'offline');
    url.searchParams.set('prompt', 'consent');
    if (params.codeChallenge) {
      url.searchParams.set('code_challenge', params.codeChallenge);
      url.searchParams.set('code_challenge_method', 'S256');
    }
    return url.toString();
  }

  /**
   * Exchange authorization code for tokens
   */
  async exchangeCode(params: {
    code: string;
    codeVerifier?: string;
  }): Promise<GoogleTokenResponse> {
    if (!GOOGLE_OAUTH_CONFIG.isConfigured()) {
      throw new Error('Google OAuth is not configured (missing GOOGLE_CLIENT_ID/SECRET)');
    }

    const body = new URLSearchParams({
      code: params.code,
      client_id: GOOGLE_OAUTH_CONFIG.clientId,
      client_secret: GOOGLE_OAUTH_CONFIG.clientSecret,
      redirect_uri: GOOGLE_OAUTH_CONFIG.redirectUri,
      grant_type: 'authorization_code',
    });
    if (params.codeVerifier) {
      body.set('code_verifier', params.codeVerifier);
    }

    const response = await fetch(GOOGLE_OAUTH_CONFIG.tokenUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: body.toString(),
      signal: AbortSignal.timeout(10_000),
    });

    if (!response.ok) {
      const errorText = await response.text();
      this.logger.error(`Google token exchange failed: ${response.status} ${errorText}`);
      throw new Error(`Google token exchange failed: ${response.status}`);
    }

    return response.json() as Promise<GoogleTokenResponse>;
  }

  /**
   * Fetch Google user profile using access token
   */
  async fetchProfile(accessToken: string): Promise<GoogleProfile> {
    const response = await fetch(GOOGLE_OAUTH_CONFIG.userInfoUrl, {
      headers: { Authorization: `Bearer ${accessToken}` },
      signal: AbortSignal.timeout(10_000),
    });

    if (!response.ok) {
      throw new Error(`Google profile fetch failed: ${response.status}`);
    }

    return response.json() as Promise<GoogleProfile>;
  }
}

/**
 * MicrosoftOAuthClient — handles Microsoft (Azure AD) OAuth2
 * @module identity-service/infrastructure/external/oauth
 */
import { Injectable, Logger } from '@nestjs/common';
import { MICROSOFT_OAUTH_CONFIG } from '../../config/microsoft.config.js';

export interface MicrosoftTokenResponse {
  readonly access_token: string;
  readonly refresh_token?: string;
  readonly expires_in: number;
  readonly token_type: string;
  readonly scope: string;
  readonly id_token?: string;
}

export interface MicrosoftProfile {
  readonly id: string;
  readonly displayName?: string;
  readonly givenName?: string;
  readonly surname?: string;
  readonly mail?: string;
  readonly userPrincipalName: string;
}

@Injectable()
export class MicrosoftOAuthClient {
  private readonly logger = new Logger(MicrosoftOAuthClient.name);

  buildAuthorizationUrl(params: { state: string; codeChallenge: string }): string {
    const url = new URL(MICROSOFT_OAUTH_CONFIG.authorizationUrl);
    url.searchParams.set('client_id', MICROSOFT_OAUTH_CONFIG.clientId);
    url.searchParams.set('response_type', 'code');
    url.searchParams.set('redirect_uri', MICROSOFT_OAUTH_CONFIG.redirectUri);
    url.searchParams.set('scope', MICROSOFT_OAUTH_CONFIG.scope);
    url.searchParams.set('state', params.state);
    url.searchParams.set('code_challenge', params.codeChallenge);
    url.searchParams.set('code_challenge_method', 'S256');
    url.searchParams.set('response_mode', 'query');
    return url.toString();
  }

  async exchangeCode(params: { code: string; codeVerifier: string }): Promise<MicrosoftTokenResponse> {
    if (!MICROSOFT_OAUTH_CONFIG.isConfigured()) {
      throw new Error('Microsoft OAuth is not configured (missing MICROSOFT_CLIENT_ID/SECRET)');
    }

    const body = new URLSearchParams({
      client_id: MICROSOFT_OAUTH_CONFIG.clientId,
      client_secret: MICROSOFT_OAUTH_CONFIG.clientSecret,
      code: params.code,
      redirect_uri: MICROSOFT_OAUTH_CONFIG.redirectUri,
      grant_type: 'authorization_code',
      code_verifier: params.codeVerifier,
    });

    const response = await fetch(MICROSOFT_OAUTH_CONFIG.tokenUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: body.toString(),
      signal: AbortSignal.timeout(10_000),
    });

    if (!response.ok) {
      throw new Error(`Microsoft token exchange failed: ${response.status}`);
    }

    return response.json() as Promise<MicrosoftTokenResponse>;
  }

  async fetchProfile(accessToken: string): Promise<MicrosoftProfile> {
    const response = await fetch(MICROSOFT_OAUTH_CONFIG.userInfoUrl, {
      headers: { Authorization: `Bearer ${accessToken}` },
      signal: AbortSignal.timeout(10_000),
    });

    if (!response.ok) {
      throw new Error(`Microsoft profile fetch failed: ${response.status}`);
    }

    return response.json() as Promise<MicrosoftProfile>;
  }
}

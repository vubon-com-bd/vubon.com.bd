/**
 * LinkedinOAuthClient — handles LinkedIn OAuth2
 * @module identity-service/infrastructure/external/oauth
 */
import { Injectable, Logger } from '@nestjs/common';
import { LINKEDIN_OAUTH_CONFIG } from '../../config/linkedin.config.js';

export interface LinkedinTokenResponse {
  readonly access_token: string;
  readonly expires_in: number;
  readonly scope: string;
}

export interface LinkedinProfile {
  readonly sub: string;
  readonly email?: string;
  readonly name?: string;
  readonly given_name?: string;
  readonly family_name?: string;
  readonly picture?: string;
  readonly email_verified?: boolean;
}

@Injectable()
export class LinkedinOAuthClient {
  private readonly logger = new Logger(LinkedinOAuthClient.name);

  buildAuthorizationUrl(params: { state: string }): string {
    const url = new URL(LINKEDIN_OAUTH_CONFIG.authorizationUrl);
    url.searchParams.set('response_type', 'code');
    url.searchParams.set('client_id', LINKEDIN_OAUTH_CONFIG.clientId);
    url.searchParams.set('redirect_uri', LINKEDIN_OAUTH_CONFIG.redirectUri);
    url.searchParams.set('state', params.state);
    url.searchParams.set('scope', LINKEDIN_OAUTH_CONFIG.scope);
    return url.toString();
  }

  async exchangeCode(code: string): Promise<LinkedinTokenResponse> {
    if (!LINKEDIN_OAUTH_CONFIG.isConfigured()) {
      throw new Error('LinkedIn OAuth is not configured (missing LINKEDIN_CLIENT_ID/SECRET)');
    }

    const body = new URLSearchParams({
      grant_type: 'authorization_code',
      code,
      client_id: LINKEDIN_OAUTH_CONFIG.clientId,
      client_secret: LINKEDIN_OAUTH_CONFIG.clientSecret,
      redirect_uri: LINKEDIN_OAUTH_CONFIG.redirectUri,
    });

    const response = await fetch(LINKEDIN_OAUTH_CONFIG.tokenUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: body.toString(),
      signal: AbortSignal.timeout(10_000),
    });

    if (!response.ok) {
      throw new Error(`LinkedIn token exchange failed: ${response.status}`);
    }

    return response.json() as Promise<LinkedinTokenResponse>;
  }

  async fetchProfile(accessToken: string): Promise<LinkedinProfile> {
    const response = await fetch(LINKEDIN_OAUTH_CONFIG.userInfoUrl, {
      headers: { Authorization: `Bearer ${accessToken}` },
      signal: AbortSignal.timeout(10_000),
    });

    if (!response.ok) {
      throw new Error(`LinkedIn profile fetch failed: ${response.status}`);
    }

    return response.json() as Promise<LinkedinProfile>;
  }
}

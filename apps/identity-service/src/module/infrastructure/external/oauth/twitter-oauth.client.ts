/**
 * TwitterOAuthClient — handles Twitter (X) OAuth 2.0 with PKCE
 * @module identity-service/infrastructure/external/oauth
 *
 * Note: Twitter does NOT return email in profile. Users must provide email separately.
 */
import { Injectable, Logger } from '@nestjs/common';
import { TWITTER_OAUTH_CONFIG } from '../../config/twitter.config.js';

export interface TwitterTokenResponse {
  readonly access_token: string;
  readonly refresh_token?: string;
  readonly expires_in: number;
  readonly token_type: string;
  readonly scope: string;
}

export interface TwitterProfile {
  readonly data: {
    readonly id: string;
    readonly name: string;
    readonly username: string;
    readonly profile_image_url?: string;
  };
}

@Injectable()
export class TwitterOAuthClient {
  private readonly logger = new Logger(TwitterOAuthClient.name);

  buildAuthorizationUrl(params: { state: string; codeChallenge: string }): string {
    const url = new URL(TWITTER_OAUTH_CONFIG.authorizationUrl);
    url.searchParams.set('response_type', 'code');
    url.searchParams.set('client_id', TWITTER_OAUTH_CONFIG.clientId);
    url.searchParams.set('redirect_uri', TWITTER_OAUTH_CONFIG.redirectUri);
    url.searchParams.set('scope', TWITTER_OAUTH_CONFIG.scope);
    url.searchParams.set('state', params.state);
    url.searchParams.set('code_challenge', params.codeChallenge);
    url.searchParams.set('code_challenge_method', 'S256');
    return url.toString();
  }

  async exchangeCode(params: { code: string; codeVerifier: string }): Promise<TwitterTokenResponse> {
    if (!TWITTER_OAUTH_CONFIG.isConfigured()) {
      throw new Error('Twitter OAuth is not configured (missing TWITTER_CLIENT_ID/SECRET)');
    }

    const basic = Buffer.from(
      `${TWITTER_OAUTH_CONFIG.clientId}:${TWITTER_OAUTH_CONFIG.clientSecret}`,
    ).toString('base64');

    const body = new URLSearchParams({
      grant_type: 'authorization_code',
      code: params.code,
      redirect_uri: TWITTER_OAUTH_CONFIG.redirectUri,
      code_verifier: params.codeVerifier,
    });

    const response = await fetch(TWITTER_OAUTH_CONFIG.tokenUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Basic ${basic}`,
      },
      body: body.toString(),
      signal: AbortSignal.timeout(10_000),
    });

    if (!response.ok) {
      throw new Error(`Twitter token exchange failed: ${response.status}`);
    }

    return response.json() as Promise<TwitterTokenResponse>;
  }

  async fetchProfile(accessToken: string): Promise<TwitterProfile> {
    const response = await fetch(TWITTER_OAUTH_CONFIG.userInfoUrl, {
      headers: { Authorization: `Bearer ${accessToken}` },
      signal: AbortSignal.timeout(10_000),
    });

    if (!response.ok) {
      throw new Error(`Twitter profile fetch failed: ${response.status}`);
    }

    return response.json() as Promise<TwitterProfile>;
  }
}

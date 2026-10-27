/**
 * FacebookOAuthClient — handles Facebook OAuth2
 * @module identity-service/infrastructure/external/oauth
 */
import { Injectable, Logger } from '@nestjs/common';
import { FACEBOOK_OAUTH_CONFIG } from '../../config/facebook.config.js';

export interface FacebookTokenResponse {
  readonly access_token: string;
  readonly token_type: string;
  readonly expires_in: number;
}

export interface FacebookProfile {
  readonly id: string;
  readonly email?: string;
  readonly name: string;
  readonly first_name?: string;
  readonly last_name?: string;
  readonly picture?: { data: { url: string } };
}

@Injectable()
export class FacebookOAuthClient {
  private readonly logger = new Logger(FacebookOAuthClient.name);

  buildAuthorizationUrl(params: { state: string }): string {
    const url = new URL(FACEBOOK_OAUTH_CONFIG.authorizationUrl);
    url.searchParams.set('client_id', FACEBOOK_OAUTH_CONFIG.appId);
    url.searchParams.set('redirect_uri', FACEBOOK_OAUTH_CONFIG.redirectUri);
    url.searchParams.set('response_type', 'code');
    url.searchParams.set('scope', FACEBOOK_OAUTH_CONFIG.scope);
    url.searchParams.set('state', params.state);
    return url.toString();
  }

  async exchangeCode(code: string): Promise<FacebookTokenResponse> {
    if (!FACEBOOK_OAUTH_CONFIG.isConfigured()) {
      throw new Error('Facebook OAuth is not configured (missing FACEBOOK_APP_ID/SECRET)');
    }

    const url = new URL(FACEBOOK_OAUTH_CONFIG.tokenUrl);
    url.searchParams.set('client_id', FACEBOOK_OAUTH_CONFIG.appId);
    url.searchParams.set('client_secret', FACEBOOK_OAUTH_CONFIG.appSecret);
    url.searchParams.set('redirect_uri', FACEBOOK_OAUTH_CONFIG.redirectUri);
    url.searchParams.set('code', code);

    const response = await fetch(url.toString(), {
      signal: AbortSignal.timeout(10_000),
    });

    if (!response.ok) {
      const err = await response.text();
      this.logger.error(`Facebook token exchange failed: ${response.status} ${err}`);
      throw new Error(`Facebook token exchange failed: ${response.status}`);
    }

    return response.json() as Promise<FacebookTokenResponse>;
  }

  async fetchProfile(accessToken: string): Promise<FacebookProfile> {
    const url = new URL(FACEBOOK_OAUTH_CONFIG.userInfoUrl);
    url.searchParams.set('access_token', accessToken);

    const response = await fetch(url.toString(), {
      signal: AbortSignal.timeout(10_000),
    });

    if (!response.ok) {
      throw new Error(`Facebook profile fetch failed: ${response.status}`);
    }

    return response.json() as Promise<FacebookProfile>;
  }
}

/**
 * GithubOAuthClient — handles GitHub OAuth2
 * @module identity-service/infrastructure/external/oauth
 */
import { Injectable, Logger } from '@nestjs/common';
import { GITHUB_OAUTH_CONFIG } from '../../config/github.config.js';

export interface GithubTokenResponse {
  readonly access_token: string;
  readonly token_type: string;
  readonly scope: string;
}

export interface GithubProfile {
  readonly id: number;
  readonly login: string;
  readonly name?: string;
  readonly email?: string;
  readonly avatar_url?: string;
}

export interface GithubEmail {
  readonly email: string;
  readonly primary: boolean;
  readonly verified: boolean;
}

@Injectable()
export class GithubOAuthClient {
  private readonly logger = new Logger(GithubOAuthClient.name);

  buildAuthorizationUrl(params: { state: string }): string {
    const url = new URL(GITHUB_OAUTH_CONFIG.authorizationUrl);
    url.searchParams.set('client_id', GITHUB_OAUTH_CONFIG.clientId);
    url.searchParams.set('redirect_uri', GITHUB_OAUTH_CONFIG.redirectUri);
    url.searchParams.set('scope', GITHUB_OAUTH_CONFIG.scope);
    url.searchParams.set('state', params.state);
    return url.toString();
  }

  async exchangeCode(code: string): Promise<GithubTokenResponse> {
    if (!GITHUB_OAUTH_CONFIG.isConfigured()) {
      throw new Error('GitHub OAuth is not configured (missing GITHUB_CLIENT_ID/SECRET)');
    }

    const body = new URLSearchParams({
      client_id: GITHUB_OAUTH_CONFIG.clientId,
      client_secret: GITHUB_OAUTH_CONFIG.clientSecret,
      code,
      redirect_uri: GITHUB_OAUTH_CONFIG.redirectUri,
    });

    const response = await fetch(GITHUB_OAUTH_CONFIG.tokenUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Accept: 'application/json',
      },
      body: body.toString(),
      signal: AbortSignal.timeout(10_000),
    });

    if (!response.ok) {
      throw new Error(`GitHub token exchange failed: ${response.status}`);
    }

    return response.json() as Promise<GithubTokenResponse>;
  }

  async fetchProfile(accessToken: string): Promise<GithubProfile> {
    const response = await fetch(GITHUB_OAUTH_CONFIG.userInfoUrl, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Accept: 'application/vnd.github+json',
        'User-Agent': 'Vubon-Identity-Service',
      },
      signal: AbortSignal.timeout(10_000),
    });

    if (!response.ok) {
      throw new Error(`GitHub profile fetch failed: ${response.status}`);
    }

    const profile = (await response.json()) as GithubProfile;

    // If no email in profile, fetch from emails endpoint
    if (!profile.email) {
      const emailsResponse = await fetch(GITHUB_OAUTH_CONFIG.emailsUrl, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          Accept: 'application/vnd.github+json',
          'User-Agent': 'Vubon-Identity-Service',
        },
        signal: AbortSignal.timeout(10_000),
      });
      if (emailsResponse.ok) {
        const emails = (await emailsResponse.json()) as GithubEmail[];
        const primary = emails.find((e) => e.primary && e.verified) ?? emails[0];
        if (primary) {
          return { ...profile, email: primary.email };
        }
      }
    }

    return profile;
  }
}

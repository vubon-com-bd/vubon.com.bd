/**
 * AppleOAuthClient — handles Apple Sign In
 * @module identity-service/infrastructure/external/oauth
 *
 * Key differences:
 * - client_secret = JWT signed with .p8 key
 * - user info comes from id_token (JWT), not API
 * - Email only on first sign-in
 */
import { Injectable, Logger } from '@nestjs/common';
import { createSign } from 'node:crypto';
import { APPLE_OAUTH_CONFIG } from '../../config/apple.config.js';

export interface AppleTokenResponse {
  readonly access_token: string;
  readonly expires_in: number;
  readonly id_token: string;
  readonly refresh_token?: string;
  readonly token_type: string;
}

export interface AppleIdTokenPayload {
  readonly iss: string;
  readonly aud: string;
  readonly exp: number;
  readonly iat: number;
  readonly sub: string;         // Apple user ID (stable per app)
  readonly email?: string;
  readonly email_verified?: boolean | string;
  readonly is_private_email?: boolean | string;
}

@Injectable()
export class AppleOAuthClient {
  private readonly logger = new Logger(AppleOAuthClient.name);

  buildAuthorizationUrl(params: { state: string; codeChallenge: string }): string {
    const url = new URL(APPLE_OAUTH_CONFIG.authorizationUrl);
    url.searchParams.set('response_type', 'code id_token');
    url.searchParams.set('client_id', APPLE_OAUTH_CONFIG.clientId);
    url.searchParams.set('redirect_uri', APPLE_OAUTH_CONFIG.redirectUri);
    url.searchParams.set('scope', APPLE_OAUTH_CONFIG.scope);
    url.searchParams.set('state', params.state);
    url.searchParams.set('nonce', params.state);
    url.searchParams.set('code_challenge', params.codeChallenge);
    url.searchParams.set('code_challenge_method', 'S256');
    url.searchParams.set('response_mode', 'form_post'); // Apple requires form_post
    return url.toString();
  }

  /**
   * Generate JWT client_secret signed with Apple's .p8 private key
   * Expires in 6 months, so must be regenerated periodically
   */
  private generateClientSecret(): string {
    const now = Math.floor(Date.now() / 1000);
    const exp = now + 6 * 30 * 24 * 3600; // ~6 months

    const header = {
      alg: 'ES256',
      kid: APPLE_OAUTH_CONFIG.keyId,
    };

    const payload = {
      iss: APPLE_OAUTH_CONFIG.teamId,
      iat: now,
      exp,
      aud: 'https://appleid.apple.com',
      sub: APPLE_OAUTH_CONFIG.clientId,
    };

    const headerB64 = Buffer.from(JSON.stringify(header)).toString('base64url');
    const payloadB64 = Buffer.from(JSON.stringify(payload)).toString('base64url');
    const signingInput = `${headerB64}.${payloadB64}`;

    // Handle escaped newlines in .env
    const key = APPLE_OAUTH_CONFIG.privateKey.replace(/\\n/g, '\n');

    const sign = createSign('ES256');
    sign.update(signingInput);
    const signature = sign.sign(key, 'base64url');

    return `${signingInput}.${signature}`;
  }

  async exchangeCode(params: { code: string; codeVerifier: string }): Promise<AppleTokenResponse> {
    if (!APPLE_OAUTH_CONFIG.isConfigured()) {
      throw new Error('Apple Sign In is not configured (missing APPLE_CLIENT_ID/TEAM_ID/KEY_ID/PRIVATE_KEY)');
    }

    const clientSecret = this.generateClientSecret();

    const body = new URLSearchParams({
      client_id: APPLE_OAUTH_CONFIG.clientId,
      client_secret: clientSecret,
      code: params.code,
      grant_type: 'authorization_code',
      redirect_uri: APPLE_OAUTH_CONFIG.redirectUri,
      code_verifier: params.codeVerifier,
    });

    const response = await fetch(APPLE_OAUTH_CONFIG.tokenUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: body.toString(),
      signal: AbortSignal.timeout(10_000),
    });

    if (!response.ok) {
      const err = await response.text();
      this.logger.error(`Apple token exchange failed: ${response.status} ${err}`);
      throw new Error(`Apple token exchange failed: ${response.status}`);
    }

    return response.json() as Promise<AppleTokenResponse>;
  }

  /**
   * Decode Apple id_token (JWT). No signature verification for now
   * (Apple tokens come via TLS, and nonce is verified separately)
   */
  decodeIdToken(idToken: string): AppleIdTokenPayload {
    const parts = idToken.split('.');
    if (parts.length !== 3) {
      throw new Error('Invalid Apple id_token format');
    }

    const payloadB64 = parts[1];
    // Pad to base64url standard
    const padded = payloadB64 + '='.repeat((4 - (payloadB64.length % 4)) % 4);
    const json = Buffer.from(padded, 'base64url').toString('utf-8');
    return JSON.parse(json) as AppleIdTokenPayload;
  }
}

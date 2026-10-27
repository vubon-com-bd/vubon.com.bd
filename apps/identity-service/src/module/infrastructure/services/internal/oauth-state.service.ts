/**
 * OAuthStateService — CSRF state tokens for OAuth2 flow
 * @module identity-service/infrastructure/services/internal
 *
 * State tokens prevent CSRF attacks on OAuth callbacks.
 * Store state → verifier mapping in Redis with short TTL.
 */
import { Injectable, Inject, Logger } from '@nestjs/common';
import { randomBytes, createHash } from 'node:crypto';
import { RedisService } from '@vubon/shared-kernel/infrastructure/persistence/cache';

const STATE_PREFIX = 'oauth-state:';
const STATE_TTL_SECONDS = 600; // 10 minutes

export interface OAuthStateData {
  readonly provider: string;
  readonly redirectUri: string;
  readonly codeVerifier?: string;
  readonly createdAt: string;
}

@Injectable()
export class OAuthStateService {
  private readonly logger = new Logger(OAuthStateService.name);

  constructor(private readonly redis: RedisService) {}

  /**
   * Generate state + optional PKCE code challenge
   */
  async create(params: {
    provider: string;
    redirectUri: string;
    usePkce?: boolean;
  }): Promise<{ state: string; codeChallenge?: string }> {
    const state = randomBytes(32).toString('hex');
    let codeVerifier: string | undefined;
    let codeChallenge: string | undefined;

    if (params.usePkce) {
      codeVerifier = randomBytes(32).toString('base64url');
      codeChallenge = createHash('sha256').update(codeVerifier).digest('base64url');
    }

    const data: OAuthStateData = {
      provider: params.provider,
      redirectUri: params.redirectUri,
      codeVerifier,
      createdAt: new Date().toISOString(),
    };

    await this.redis.raw.setex(
      `${STATE_PREFIX}${state}`,
      STATE_TTL_SECONDS,
      JSON.stringify(data),
    );

    return { state, codeChallenge };
  }

  /**
   * Verify and consume state (one-time use)
   */
  async consume(state: string): Promise<OAuthStateData | null> {
    const key = `${STATE_PREFIX}${state}`;
    const raw = await this.redis.raw.get(key);
    if (!raw) {
      this.logger.warn(`OAuth state not found or expired: ${state.slice(0, 8)}...`);
      return null;
    }
    await this.redis.raw.del(key);
    return JSON.parse(raw) as OAuthStateData;
  }
}

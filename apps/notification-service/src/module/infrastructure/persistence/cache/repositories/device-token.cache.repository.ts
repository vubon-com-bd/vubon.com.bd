/**
 * DeviceTokenCacheRepository — fast token ↔ user mapping via Redis
 * @module notification-service/infrastructure/persistence/cache/repositories
 *
 * Push fan-out needs token → userId in <1ms. DB roundtrip is too slow when
 * sending to millions of tokens. This keeps hot mapping in Redis.
 */
import { Injectable, Logger } from '@nestjs/common';
import { RedisService } from '@vubon/shared-kernel/infrastructure/persistence/cache';
import { CACHE_TTL } from '@vubon/shared-constants/infrastructure';

const TOKEN_PREFIX = 'devtok:';
const USER_TOKENS_PREFIX = 'devtok:user:';

@Injectable()
export class DeviceTokenCacheRepository {
  private readonly logger = new Logger(DeviceTokenCacheRepository.name);

  constructor(private readonly redis: RedisService) {}

  // ═══ Token → UserId ═══
  async getUserIdByToken(token: string): Promise<string | null> {
    return this.redis.get<string>(`${TOKEN_PREFIX}${token}`);
  }

  async setTokenUser(token: string, userId: string): Promise<void> {
    await this.redis.set(`${TOKEN_PREFIX}${token}`, userId, CACHE_TTL.ONE_DAY);
  }

  async removeToken(token: string): Promise<void> {
    await this.redis.del(`${TOKEN_PREFIX}${token}`);
  }

  // ═══ User → Tokens (Set) ═══
  async addUserToken(userId: string, token: string): Promise<void> {
    const raw = this.redis.raw;
    await raw.sadd(`${USER_TOKENS_PREFIX}${userId}`, token);
    await raw.expire(`${USER_TOKENS_PREFIX}${userId}`, CACHE_TTL.ONE_DAY);
  }

  async removeUserToken(userId: string, token: string): Promise<void> {
    await this.redis.raw.srem(`${USER_TOKENS_PREFIX}${userId}`, token);
  }

  async getUserTokens(userId: string): Promise<readonly string[]> {
    const raw = this.redis.raw;
    return raw.smembers(`${USER_TOKENS_PREFIX}${userId}`);
  }

  async clearUserTokens(userId: string): Promise<void> {
    await this.redis.del(`${USER_TOKENS_PREFIX}${userId}`);
  }

  /** Bulk remove invalid tokens after a failed push delivery. */
  async removeInvalidTokens(tokens: readonly string[]): Promise<void> {
    await Promise.all(tokens.map((t) => this.removeToken(t)));
  }
}

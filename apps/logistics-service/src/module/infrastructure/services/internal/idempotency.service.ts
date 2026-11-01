/**
 * IdempotencyService — Redis SET-NX based idempotency key guard
 * @module logistics-service/infrastructure/services/internal
 *
 * ⚠️ Best-effort — if Redis is down, treats as "not seen" (allow)
 * ⚠️ Uses SET NX EX — atomic, prevents double-processing
 */
import { Injectable, Logger } from '@nestjs/common';
import { RedisService } from '@vubon/shared-kernel/infrastructure/persistence/cache';
import { CACHE_TTL } from '@vubon/shared-constants/infrastructure';

const PREFIX = 'logistics:idem:';
const DEFAULT_TTL_SECONDS = CACHE_TTL.ONE_HOUR; // 1h default window

export interface IdempotencyCheckResult {
  readonly isDuplicate: boolean;
  readonly key: string;
}

@Injectable()
export class IdempotencyService {
  private readonly logger = new Logger(IdempotencyService.name);

  constructor(private readonly redis: RedisService) {}

  /**
   * Atomically mark a key as "seen". Returns true if this is the FIRST time (not duplicate).
   */
  async claim(key: string, ttlSeconds: number = DEFAULT_TTL_SECONDS): Promise<boolean> {
    try {
      const result = await this.redis.raw.set(
        `${PREFIX}${key}`,
        JSON.stringify({ at: new Date().toISOString() }),
        'EX',
        ttlSeconds,
        'NX',
      );
      return result === 'OK';
    } catch (err) {
      this.logger.warn(`idempotency claim failed (allow): ${this.errMsg(err)}`);
      // Fail-open: allow when Redis is down (better than blocking all ops)
      return true;
    }
  }

  /**
   * Check without marking — read-only existence probe.
   */
  async isDuplicate(key: string): Promise<boolean> {
    try {
      const exists = await this.redis.raw.exists(`${PREFIX}${key}`);
      return exists === 1;
    } catch (err) {
      this.logger.warn(`idempotency check failed (allow): ${this.errMsg(err)}`);
      return false;
    }
  }

  /**
   * Store the response of an idempotent operation — for replay.
   */
  async storeResult<T>(key: string, result: T, ttlSeconds: number = DEFAULT_TTL_SECONDS): Promise<void> {
    try {
      await this.redis.raw.set(
        `${PREFIX}${key}:result`,
        JSON.stringify(result),
        'EX',
        ttlSeconds,
      );
    } catch (err) {
      this.logger.warn(`idempotency storeResult failed: ${this.errMsg(err)}`);
    }
  }

  /**
   * Retrieve previously stored result — for idempotent replay.
   */
  async getResult<T>(key: string): Promise<T | null> {
    try {
      return await this.redis.get<T>(`${PREFIX}${key}:result`);
    } catch (err) {
      this.logger.warn(`idempotency getResult failed: ${this.errMsg(err)}`);
      return null;
    }
  }

  async release(key: string): Promise<void> {
    try {
      await this.redis.raw.del(`${PREFIX}${key}`);
      await this.redis.raw.del(`${PREFIX}${key}:result`);
    } catch (err) {
      this.logger.warn(`idempotency release failed: ${this.errMsg(err)}`);
    }
  }

  private errMsg(err: unknown): string {
    return err instanceof Error ? err.message : 'unknown';
  }
}

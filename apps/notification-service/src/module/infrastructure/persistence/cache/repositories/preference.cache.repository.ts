/**
 * PreferenceCacheRepository — Redis cache for user preferences
 * @module notification-service/infrastructure/persistence/cache/repositories
 *
 * High-read hot path — preference checked on EVERY send।
 * TTL: 5 min (invalidated on update)।
 */
import { Injectable, Logger } from '@nestjs/common';
import { RedisService } from '@vubon/shared-kernel/infrastructure/persistence/cache';
import { CACHE_TTL } from '@vubon/shared-constants/infrastructure';

const PREFIX = 'notification:preference';
const BY_USER_KEY = (userId: string) => `${PREFIX}:user:${userId}`;
const MATRIX_KEY = (userId: string) => `${PREFIX}:matrix:${userId}`;

export interface PreferenceCacheDTO {
  readonly userId: string;
  readonly quietHoursEnabled: boolean;
  readonly quietHoursStart?: number;
  readonly quietHoursEnd?: number;
  readonly timezone: string;
  readonly locale: string;
  readonly options: ReadonlyArray<{
    readonly channel: string;
    readonly category?: string;
    readonly enabled: boolean;
  }>;
}

@Injectable()
export class PreferenceCacheRepository {
  private readonly logger = new Logger(PreferenceCacheRepository.name);

  constructor(private readonly redis: RedisService) {}

  // ═══════════════ Preference ═══════════════
  async get(userId: string): Promise<PreferenceCacheDTO | null> {
    return this.redis.get<PreferenceCacheDTO>(BY_USER_KEY(userId));
  }

  async set(userId: string, dto: PreferenceCacheDTO): Promise<void> {
    await this.redis.set(BY_USER_KEY(userId), dto, CACHE_TTL.FIVE_MINUTES);
  }

  async invalidate(userId: string): Promise<void> {
    await this.redis.del(BY_USER_KEY(userId));
  }

  // ═══════════════ Matrix ═══════════════
  async getMatrix(userId: string): Promise<Readonly<Record<string, unknown>> | null> {
    return this.redis.get<Readonly<Record<string, unknown>>>(MATRIX_KEY(userId));
  }

  async setMatrix(
    userId: string,
    matrix: Readonly<Record<string, unknown>>,
  ): Promise<void> {
    await this.redis.set(MATRIX_KEY(userId), matrix, CACHE_TTL.FIVE_MINUTES);
  }

  async invalidateMatrix(userId: string): Promise<void> {
    await this.redis.del(MATRIX_KEY(userId));
  }

  // ═══════════════ Bulk ═══════════════
  async invalidateAll(userId: string): Promise<void> {
    await Promise.all([this.invalidate(userId), this.invalidateMatrix(userId)]);
    this.logger.debug(`Preference cache invalidated: user=${userId}`);
  }
}

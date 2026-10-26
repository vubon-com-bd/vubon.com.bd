/**
 * DeviceCacheRepository — Redis cache for devices
 * @module notification-service/infrastructure/persistence/cache/repositories
 *
 * Hot path — device tokens resolved on every push send।
 * TTL: 2 min (invalidated on register/unregister/block)।
 */
import { Injectable, Logger } from '@nestjs/common';
import { RedisService } from '@vubon/shared-kernel/infrastructure/persistence/cache';
import { CACHE_TTL } from '@vubon/shared-constants/infrastructure';

const PREFIX = 'notification:device';
const BY_ID_KEY = (id: string) => `${PREFIX}:id:${id}`;
const BY_USER_KEY = (userId: string) => `${PREFIX}:user:${userId}`;
const BY_TOKEN_KEY = (token: string) => `${PREFIX}:token:${token}`;
const ACTIVE_TOKENS_KEY = (userId: string) => `${PREFIX}:active-tokens:${userId}`;

export interface DeviceCacheDTO {
  readonly id: string;
  readonly userId: string;
  readonly type: string;
  readonly status: string;
  readonly platform: string;
  readonly tokenMasked: string;
  readonly lastActiveAt: string;
}

export interface ActiveTokenEntry {
  readonly deviceId: string;
  readonly token: string;
  readonly platform: string;
}

@Injectable()
export class DeviceCacheRepository {
  private readonly logger = new Logger(DeviceCacheRepository.name);

  constructor(private readonly redis: RedisService) {}

  // ═══════════════ By ID ═══════════════
  async getById(id: string): Promise<DeviceCacheDTO | null> {
    return this.redis.get<DeviceCacheDTO>(BY_ID_KEY(id));
  }

  async setById(id: string, dto: DeviceCacheDTO): Promise<void> {
    await this.redis.set(BY_ID_KEY(id), dto, 120);
  }

  async invalidateById(id: string): Promise<void> {
    await this.redis.del(BY_ID_KEY(id));
  }

  // ═══════════════ By User (list) ═══════════════
  async getByUser(userId: string): Promise<readonly DeviceCacheDTO[] | null> {
    return this.redis.get<readonly DeviceCacheDTO[]>(BY_USER_KEY(userId));
  }

  async setByUser(userId: string, devices: readonly DeviceCacheDTO[]): Promise<void> {
    await this.redis.set(BY_USER_KEY(userId), devices, 120);
  }

  async invalidateByUser(userId: string): Promise<void> {
    await this.redis.del(BY_USER_KEY(userId));
  }

  // ═══════════════ By Token ═══════════════
  async getByToken(token: string): Promise<DeviceCacheDTO | null> {
    return this.redis.get<DeviceCacheDTO>(BY_TOKEN_KEY(token));
  }

  async setByToken(token: string, dto: DeviceCacheDTO): Promise<void> {
    await this.redis.set(BY_TOKEN_KEY(token), dto, 120);
  }

  async invalidateByToken(token: string): Promise<void> {
    await this.redis.del(BY_TOKEN_KEY(token));
  }

  // ═══════════════ Active tokens (for push fanout) ═══════════════
  async getActiveTokens(userId: string): Promise<readonly ActiveTokenEntry[] | null> {
    return this.redis.get<readonly ActiveTokenEntry[]>(ACTIVE_TOKENS_KEY(userId));
  }

  async setActiveTokens(
    userId: string,
    tokens: readonly ActiveTokenEntry[],
  ): Promise<void> {
    await this.redis.set(ACTIVE_TOKENS_KEY(userId), tokens, CACHE_TTL.FIVE_MINUTES);
  }

  async invalidateActiveTokens(userId: string): Promise<void> {
    await this.redis.del(ACTIVE_TOKENS_KEY(userId));
  }

  // ═══════════════ Bulk ═══════════════
  async invalidateAll(deviceId: string, userId: string, token?: string): Promise<void> {
    const tasks: Promise<void>[] = [
      this.invalidateById(deviceId),
      this.invalidateByUser(userId),
      this.invalidateActiveTokens(userId),
    ];
    if (token) tasks.push(this.invalidateByToken(token));
    await Promise.all(tasks);
    this.logger.debug(`Device cache invalidated: id=${deviceId} user=${userId}`);
  }
}

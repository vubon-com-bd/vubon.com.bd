/**
 * Redis Service (NestJS injectable)
 * @module shared-kernel/infrastructure/persistence/cache
 *
 * Values আসে shared-config ও shared-constants থেকে।
 */
import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import Redis from 'ioredis';
import { REDIS_CONFIG } from '@vubon/shared-config/infrastructure';
import { CACHE_TTL } from '@vubon/shared-constants/infrastructure';

@Injectable()
export class RedisService implements OnModuleInit, OnModuleDestroy {
  private client!: Redis;

  onModuleInit(): void {
    this.client = new Redis(REDIS_CONFIG.url, {
      keyPrefix: REDIS_CONFIG.keyPrefix,
      db: REDIS_CONFIG.db,
      maxRetriesPerRequest: REDIS_CONFIG.maxRetriesPerRequest,
      enableReadyCheck: REDIS_CONFIG.enableReadyCheck,
      lazyConnect: REDIS_CONFIG.lazyConnect,
    });
  }

  async onModuleDestroy(): Promise<void> {
    if (this.client) {
      await this.client.quit();
    }
  }

  get raw(): Redis {
    return this.client;
  }

  async get<T = unknown>(key: string): Promise<T | null> {
    const raw = await this.client.get(key);
    if (raw === null) return null;
    try {
      return JSON.parse(raw) as T;
    } catch {
      return null;
    }
  }

  async set<T = unknown>(
    key: string,
    value: T,
    ttlSeconds: number = CACHE_TTL.ONE_HOUR
  ): Promise<void> {
    await this.client.set(key, JSON.stringify(value), 'EX', ttlSeconds);
  }

  async del(key: string): Promise<void> {
    await this.client.del(key);
  }

  async exists(key: string): Promise<boolean> {
    return (await this.client.exists(key)) === 1;
  }

  async isHealthy(): Promise<boolean> {
    try {
      return (await this.client.ping()) === 'PONG';
    } catch {
      return false;
    }
  }
}

/**
 * CartRedisService — primary cart storage (session-scoped hot path)
 * @module cart-service/infrastructure/persistence/redis
 */
import { Injectable, Logger, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { Redis } from 'ioredis';
import { REDIS_CONFIG } from '@vubon/shared-config/infrastructure';

const CART_KEY_PREFIX = 'cart:svc:';
const DEFAULT_TTL_SECONDS = 7 * 24 * 60 * 60; // 7 days

@Injectable()
export class CartRedisService implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(CartRedisService.name);
  private client!: Redis;

  onModuleInit(): void {
    try {
      this.client = new Redis(REDIS_CONFIG.url, {
        keyPrefix: CART_KEY_PREFIX,
        db: REDIS_CONFIG.db,
        maxRetriesPerRequest: REDIS_CONFIG.maxRetriesPerRequest,
        enableReadyCheck: REDIS_CONFIG.enableReadyCheck,
        lazyConnect: REDIS_CONFIG.lazyConnect,
      });
      this.logger.log('✅ Cart Redis connected');
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      this.logger.warn(`⚠️ Redis init failed: ${msg.slice(0, 100)}`);
    }
  }

  async onModuleDestroy(): Promise<void> {
    if (this.client) {
      try {
        await this.client.quit();
      } catch {
        /* ignore */
      }
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
    ttlSeconds: number = DEFAULT_TTL_SECONDS,
  ): Promise<void> {
    await this.client.set(key, JSON.stringify(value), 'EX', ttlSeconds);
  }

  async setNoExpiry<T = unknown>(key: string, value: T): Promise<void> {
    await this.client.set(key, JSON.stringify(value));
  }

  async del(key: string): Promise<void> {
    await this.client.del(key);
  }

  async delMany(keys: readonly string[]): Promise<number> {
    if (keys.length === 0) return 0;
    return this.client.del(...keys);
  }

  async exists(key: string): Promise<boolean> {
    return (await this.client.exists(key)) === 1;
  }

  async keys(pattern: string): Promise<readonly string[]> {
    return this.client.keys(pattern);
  }

  async ttl(key: string): Promise<number> {
    return this.client.ttl(key);
  }

  async expire(key: string, ttlSeconds: number): Promise<boolean> {
    return (await this.client.expire(key, ttlSeconds)) === 1;
  }

  async increment(key: string, delta = 1): Promise<number> {
    return this.client.incrby(key, delta);
  }

  async isHealthy(): Promise<boolean> {
    try {
      return (await this.client.ping()) === 'PONG';
    } catch {
      return false;
    }
  }
}

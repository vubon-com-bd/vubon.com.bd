/**
 * RedisService (support-service)
 * @module support-service/infrastructure/persistence/cache
 *
 * Rule: thin wrapper — no business logic
 */
import { Injectable, OnModuleDestroy } from '@nestjs/common';
import { Redis } from 'ioredis';

const DEFAULT_URL = 'redis://127.0.0.1:6379';

@Injectable()
export class SupportRedisService implements OnModuleDestroy {
  private readonly client: Redis;

  constructor() {
    const url = process.env.REDIS_URL ?? DEFAULT_URL;
    this.client = new Redis(url, {
      lazyConnect: false,
      maxRetriesPerRequest: 3,
      enableReadyCheck: true,
    });
  }

  async get(key: string): Promise<string | null> {
    return this.client.get(key);
  }

  async set(key: string, value: string, ttlSeconds?: number): Promise<void> {
    if (ttlSeconds && ttlSeconds > 0) {
      await this.client.set(key, value, 'EX', ttlSeconds);
    } else {
      await this.client.set(key, value);
    }
  }

  async del(key: string): Promise<void> {
    await this.client.del(key);
  }

  async exists(key: string): Promise<boolean> {
    const result = await this.client.exists(key);
    return result === 1;
  }

  async ttl(key: string): Promise<number> {
    return this.client.ttl(key);
  }

  async onModuleDestroy(): Promise<void> {
    await this.client.quit();
  }
}

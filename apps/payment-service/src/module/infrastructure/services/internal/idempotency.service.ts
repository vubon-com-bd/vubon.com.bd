import { Injectable } from '@nestjs/common';
import { RedisService } from '@vubon/shared-kernel/infrastructure';

const PREFIX = 'payment:idempotency';
const DEFAULT_TTL_SECONDS = 86400;

@Injectable()
export class IdempotencyService {
  constructor(private readonly redis: RedisService) {}

  async check(key: string): Promise<boolean> {
    return this.redis.exists(`${PREFIX}:${key}`);
  }

  async get<T>(key: string): Promise<T | null> {
    return this.redis.get<T>(`${PREFIX}:${key}`);
  }

  async store<T>(key: string, value: T, ttlSeconds = DEFAULT_TTL_SECONDS): Promise<void> {
    await this.redis.set(`${PREFIX}:${key}`, value, ttlSeconds);
  }

  async clear(key: string): Promise<void> {
    await this.redis.del(`${PREFIX}:${key}`);
  }
}

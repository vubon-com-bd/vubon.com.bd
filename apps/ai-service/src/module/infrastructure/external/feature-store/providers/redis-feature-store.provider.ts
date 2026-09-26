import { Injectable } from '@nestjs/common';
import { RedisService } from '@vubon/shared-kernel/infrastructure';

@Injectable()
export class RedisFeatureStoreProvider {
  constructor(private readonly redis: RedisService) {}

  async get<T = unknown>(entityId: string, featureName: string): Promise<T | null> {
    return this.redis.get<T>(`redis-fs:${entityId}:${featureName}`);
  }

  async set(entityId: string, featureName: string, value: unknown, ttl = 3600): Promise<void> {
    await this.redis.set(`redis-fs:${entityId}:${featureName}`, value, ttl);
  }
}

import { Injectable } from '@nestjs/common';
import { RedisService } from '@vubon/shared-kernel/infrastructure';

const PREFIX = 'ai:features';
const TTL_SECONDS = 3600;

@Injectable()
export class FeatureStoreService {
  constructor(private readonly redis: RedisService) {}

  async set(userId: string, featureName: string, value: number | string | boolean): Promise<void> {
    await this.redis.set(`${PREFIX}:${userId}:${featureName}`, value, TTL_SECONDS);
  }

  async get<T = unknown>(userId: string, featureName: string): Promise<T | null> {
    return this.redis.get<T>(`${PREFIX}:${userId}:${featureName}`);
  }

  async getMany(userId: string, featureNames: readonly string[]): Promise<Readonly<Record<string, unknown>>> {
    const result: Record<string, unknown> = {};
    for (const name of featureNames) {
      result[name] = await this.get(userId, name);
    }
    return result;
  }

  async invalidate(userId: string): Promise<void> {
    await this.redis.del(`${PREFIX}:${userId}`);
  }
}

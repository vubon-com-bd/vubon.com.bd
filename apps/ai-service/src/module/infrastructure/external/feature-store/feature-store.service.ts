import { Injectable } from '@nestjs/common';
import { RedisService } from '@vubon/shared-kernel/infrastructure';

const PREFIX = 'feature-store';
const DEFAULT_TTL_SECONDS = 3600;

@Injectable()
export class FeatureStoreService {
  constructor(private readonly redis: RedisService) {}

  private key(entityId: string, featureName: string): string {
    return `${PREFIX}:${entityId}:${featureName}`;
  }

  async setFeature(entityId: string, featureName: string, value: number | string | boolean, ttlSeconds = DEFAULT_TTL_SECONDS): Promise<void> {
    await this.redis.set(this.key(entityId, featureName), value, ttlSeconds);
  }

  async getFeature<T = unknown>(entityId: string, featureName: string): Promise<T | null> {
    return this.redis.get<T>(this.key(entityId, featureName));
  }

  async setFeatures(entityId: string, features: Readonly<Record<string, number | string | boolean>>): Promise<void> {
    for (const [name, value] of Object.entries(features)) {
      await this.setFeature(entityId, name, value);
    }
  }

  async getFeatures<T = unknown>(entityId: string, featureNames: readonly string[]): Promise<Readonly<Record<string, T | null>>> {
    const result: Record<string, T | null> = {};
    for (const name of featureNames) {
      result[name] = await this.getFeature<T>(entityId, name);
    }
    return result;
  }

  async delete(entityId: string): Promise<void> {
    await this.redis.del(`${PREFIX}:${entityId}`);
  }
}

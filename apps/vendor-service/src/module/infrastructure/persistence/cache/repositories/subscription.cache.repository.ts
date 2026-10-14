/**
 * SubscriptionCacheRepository — Redis cache for subscription lookups
 * @module vendor-service/infrastructure/persistence/cache/repositories
 */
import { Injectable } from '@nestjs/common';
import { RedisService } from '@vubon/shared-kernel/infrastructure/persistence/cache';

const PREFIX = 'vendor:subscription:';
const ACTIVE_PREFIX = 'vendor:subscription:active:';
const TTL_SECONDS = 600;

export interface CachedSubscriptionShape {
  readonly id: string;
  readonly vendorId: string;
  readonly plan: string;
  readonly status: string;
  readonly currentPeriodEnd: string;
  readonly autoRenew: boolean;
}

@Injectable()
export class SubscriptionCacheRepository {
  constructor(private readonly redis: RedisService) {}

  async get(id: string): Promise<CachedSubscriptionShape | null> {
    return this.redis.get<CachedSubscriptionShape>(`${PREFIX}${id}`);
  }

  async getActiveByVendor(vendorId: string): Promise<CachedSubscriptionShape | null> {
    return this.redis.get<CachedSubscriptionShape>(`${ACTIVE_PREFIX}${vendorId}`);
  }

  async set(subscription: CachedSubscriptionShape): Promise<void> {
    await this.redis.set(`${PREFIX}${subscription.id}`, subscription, TTL_SECONDS);
    if (subscription.status === 'active' || subscription.status === 'trial') {
      await this.redis.set(
        `${ACTIVE_PREFIX}${subscription.vendorId}`,
        subscription,
        TTL_SECONDS,
      );
    }
  }

  async invalidate(id: string, vendorId?: string): Promise<void> {
    await this.redis.del(`${PREFIX}${id}`);
    if (vendorId) await this.redis.del(`${ACTIVE_PREFIX}${vendorId}`);
  }
}

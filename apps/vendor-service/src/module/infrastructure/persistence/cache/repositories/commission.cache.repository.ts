/**
 * CommissionCacheRepository — Redis cache for commission lookups
 * @module vendor-service/infrastructure/persistence/cache/repositories
 */
import { Injectable } from '@nestjs/common';
import { RedisService } from '@vubon/shared-kernel/infrastructure/persistence/cache';

const PREFIX = 'vendor:commission:';
const ACTIVE_PREFIX = 'vendor:commission:active:';
const TTL_SECONDS = 600; // 10 minutes

export interface CachedCommissionShape {
  readonly id: string;
  readonly vendorId: string;
  readonly type: string;
  readonly rate: number;
  readonly isActive: boolean;
  readonly effectiveFrom: string;
  readonly effectiveTo?: string;
}

@Injectable()
export class CommissionCacheRepository {
  constructor(private readonly redis: RedisService) {}

  async get(id: string): Promise<CachedCommissionShape | null> {
    return this.redis.get<CachedCommissionShape>(`${PREFIX}${id}`);
  }

  async getActiveByVendor(vendorId: string): Promise<CachedCommissionShape | null> {
    return this.redis.get<CachedCommissionShape>(`${ACTIVE_PREFIX}${vendorId}`);
  }

  async set(commission: CachedCommissionShape): Promise<void> {
    await this.redis.set(`${PREFIX}${commission.id}`, commission, TTL_SECONDS);
    if (commission.isActive) {
      await this.redis.set(
        `${ACTIVE_PREFIX}${commission.vendorId}`,
        commission,
        TTL_SECONDS,
      );
    }
  }

  async invalidate(id: string, vendorId?: string): Promise<void> {
    await this.redis.del(`${PREFIX}${id}`);
    if (vendorId) await this.redis.del(`${ACTIVE_PREFIX}${vendorId}`);
  }

  async invalidateByVendor(vendorId: string): Promise<void> {
    await this.redis.del(`${ACTIVE_PREFIX}${vendorId}`);
  }
}

/**
 * PerformanceCacheRepository — Redis cache for performance snapshots
 * @module vendor-service/infrastructure/persistence/cache/repositories
 */
import { Injectable } from '@nestjs/common';
import { RedisService } from '@vubon/shared-kernel/infrastructure/persistence/cache';

const PREFIX = 'vendor:performance:';
const LATEST_PREFIX = 'vendor:performance:latest:';
const TTL_SECONDS = 900; // 15 minutes

export interface CachedPerformanceShape {
  readonly id: string;
  readonly vendorId: string;
  readonly overallScore: number;
  readonly grade: string;
  readonly totalOrders: number;
  readonly evaluatedAt: string;
  readonly periodStart: string;
  readonly periodEnd: string;
}

@Injectable()
export class PerformanceCacheRepository {
  constructor(private readonly redis: RedisService) {}

  async get(id: string): Promise<CachedPerformanceShape | null> {
    return this.redis.get<CachedPerformanceShape>(`${PREFIX}${id}`);
  }

  async getLatestByVendor(vendorId: string): Promise<CachedPerformanceShape | null> {
    return this.redis.get<CachedPerformanceShape>(`${LATEST_PREFIX}${vendorId}`);
  }

  async set(performance: CachedPerformanceShape): Promise<void> {
    await this.redis.set(`${PREFIX}${performance.id}`, performance, TTL_SECONDS);
    await this.redis.set(
      `${LATEST_PREFIX}${performance.vendorId}`,
      performance,
      TTL_SECONDS,
    );
  }

  async invalidate(id: string, vendorId?: string): Promise<void> {
    await this.redis.del(`${PREFIX}${id}`);
    if (vendorId) await this.redis.del(`${LATEST_PREFIX}${vendorId}`);
  }

  async invalidateByVendor(vendorId: string): Promise<void> {
    await this.redis.del(`${LATEST_PREFIX}${vendorId}`);
  }
}

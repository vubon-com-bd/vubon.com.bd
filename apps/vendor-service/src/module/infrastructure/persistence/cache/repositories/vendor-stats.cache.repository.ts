/**
 * VendorStatsCacheRepository — cached stats snapshots
 * @module vendor-service/infrastructure/persistence/cache/repositories
 */
import { Injectable } from '@nestjs/common';
import { RedisService } from '@vubon/shared-kernel/infrastructure/persistence/cache';
import { CACHE_TTL } from '@vubon/shared-constants/infrastructure';
import type { VendorStatsResponseDto } from '../../../../application/dtos/responses/vendor-stats-response.dto.js';

const PREFIX = 'vendor:stats:';
const OVERVIEW_TTL = CACHE_TTL.FIFTEEN_MINUTES;
const PERIOD_TTL = CACHE_TTL.SIX_HOURS;

export interface CachedPeriodStats {
  readonly vendorId: string;
  readonly periodStart: string;
  readonly periodEnd: string;
  readonly currency: string;
  readonly totalOrders: number;
  readonly totalRevenue: number;
  readonly totalCommission: number;
  readonly totalPayout: number;
  readonly totalRefunds: number;
}

@Injectable()
export class VendorStatsCacheRepository {
  constructor(private readonly redis: RedisService) {}

  private overviewKey(vendorId: string): string {
    return `${PREFIX}overview:${vendorId}`;
  }

  private periodKey(vendorId: string, periodStart: string, periodEnd: string): string {
    return `${PREFIX}period:${vendorId}:${periodStart}:${periodEnd}`;
  }

  async getOverview(vendorId: string): Promise<VendorStatsResponseDto | null> {
    return this.redis.get<VendorStatsResponseDto>(this.overviewKey(vendorId));
  }

  async setOverview(stats: VendorStatsResponseDto): Promise<void> {
    await this.redis.set(this.overviewKey(stats.vendorId), stats, OVERVIEW_TTL);
  }

  async invalidateOverview(vendorId: string): Promise<void> {
    await this.redis.del(this.overviewKey(vendorId));
  }

  async getPeriod(
    vendorId: string,
    periodStart: string,
    periodEnd: string,
  ): Promise<CachedPeriodStats | null> {
    return this.redis.get<CachedPeriodStats>(this.periodKey(vendorId, periodStart, periodEnd));
  }

  async setPeriod(stats: CachedPeriodStats): Promise<void> {
    await this.redis.set(
      this.periodKey(stats.vendorId, stats.periodStart, stats.periodEnd),
      stats,
      PERIOD_TTL,
    );
  }

  async invalidatePeriod(
    vendorId: string,
    periodStart: string,
    periodEnd: string,
  ): Promise<void> {
    await this.redis.del(this.periodKey(vendorId, periodStart, periodEnd));
  }

  async invalidateAll(vendorId: string): Promise<void> {
    await this.invalidateOverview(vendorId);
  }
}

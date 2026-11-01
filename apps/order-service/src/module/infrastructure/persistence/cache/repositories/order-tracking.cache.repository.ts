/**
 * OrderTrackingCacheRepository
 * @module order-service/infrastructure/persistence/cache/repositories
 */
import { Injectable } from '@nestjs/common';
import { RedisService } from '@vubon/shared-kernel/infrastructure/persistence/cache';
import { CACHE_TTL } from '@vubon/shared-constants/infrastructure';
import type {
  TrackingEntryResponseDTO,
  TrackingSummaryResponseDTO,
} from '../../../../application/dtos/responses/tracking-response.dto.js';

const ENTRY_PREFIX = 'order-service:tracking:entry:';
const SUMMARY_PREFIX = 'order-service:tracking:summary:';

@Injectable()
export class OrderTrackingCacheRepository {
  constructor(private readonly redis: RedisService) {}

  async getEntry(id: string): Promise<TrackingEntryResponseDTO | null> {
    return this.redis.get<TrackingEntryResponseDTO>(`${ENTRY_PREFIX}${id}`);
  }

  async setEntry(id: string, dto: TrackingEntryResponseDTO): Promise<void> {
    await this.redis.set(`${ENTRY_PREFIX}${id}`, dto, CACHE_TTL.ONE_MINUTE);
  }

  async getSummary(orderId: string): Promise<TrackingSummaryResponseDTO | null> {
    return this.redis.get<TrackingSummaryResponseDTO>(`${SUMMARY_PREFIX}${orderId}`);
  }

  async setSummary(orderId: string, dto: TrackingSummaryResponseDTO): Promise<void> {
    await this.redis.set(`${SUMMARY_PREFIX}${orderId}`, dto, CACHE_TTL.FIVE_MINUTES);
  }

  async invalidate(orderId: string): Promise<void> {
    await this.redis.del(`${SUMMARY_PREFIX}${orderId}`);
  }
}

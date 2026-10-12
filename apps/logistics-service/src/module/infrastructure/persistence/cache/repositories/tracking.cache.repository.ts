import { Injectable } from '@nestjs/common';
import { RedisService } from '@vubon/shared-kernel/infrastructure/persistence/cache';
import { CACHE_TTL } from '@vubon/shared-constants/infrastructure';
import type {
  TrackingResponseDTO,
  TrackingPublicResponseDTO,
} from '../../../../application/dtos/responses/tracking/tracking-response.dto.js';

const PREFIX = 'logistics:tracking:';
const PUBLIC_PREFIX = 'logistics:tracking:public:';

@Injectable()
export class TrackingCacheRepository {
  constructor(private readonly redis: RedisService) {}
  async get(id: string): Promise<TrackingResponseDTO | null> {
    return this.redis.get<TrackingResponseDTO>(`${PREFIX}${id}`);
  }
  async set(id: string, dto: TrackingResponseDTO): Promise<void> {
    await this.redis.set(`${PREFIX}${id}`, dto, CACHE_TTL.FIVE_MINUTES);
  }
  async getPublic(trackingNumber: string): Promise<TrackingPublicResponseDTO | null> {
    return this.redis.get<TrackingPublicResponseDTO>(`${PUBLIC_PREFIX}${trackingNumber}`);
  }
  async setPublic(trackingNumber: string, dto: TrackingPublicResponseDTO): Promise<void> {
    await this.redis.set(`${PUBLIC_PREFIX}${trackingNumber}`, dto, CACHE_TTL.FIVE_MINUTES);
  }
  async invalidate(id: string): Promise<void> { await this.redis.del(`${PREFIX}${id}`); }
  async invalidatePublic(trackingNumber: string): Promise<void> {
    await this.redis.del(`${PUBLIC_PREFIX}${trackingNumber}`);
  }
}

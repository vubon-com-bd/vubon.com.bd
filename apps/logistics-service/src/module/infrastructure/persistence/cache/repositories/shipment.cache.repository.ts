/**
 * ShipmentCacheRepository — Redis-backed cache for shipment reads
 * @module logistics-service/infrastructure/persistence/cache/repositories
 */
import { Injectable } from '@nestjs/common';
import { RedisService } from '@vubon/shared-kernel/infrastructure/persistence/cache';
import { CACHE_TTL } from '@vubon/shared-constants/infrastructure';
import type { ShipmentResponseDTO } from '../../../../application/dtos/responses/shipment/shipment-response.dto.js';

const PREFIX = 'logistics:shipment:';
const LIST_PREFIX = 'logistics:shipment:list:';

@Injectable()
export class ShipmentCacheRepository {
  constructor(private readonly redis: RedisService) {}
  async get(id: string): Promise<ShipmentResponseDTO | null> {
    return this.redis.get<ShipmentResponseDTO>(`${PREFIX}${id}`);
  }
  async set(id: string, dto: ShipmentResponseDTO): Promise<void> {
    await this.redis.set(`${PREFIX}${id}`, dto, CACHE_TTL.FIVE_MINUTES);
  }
  async invalidate(id: string): Promise<void> {
    await this.redis.del(`${PREFIX}${id}`);
  }
  async invalidateList(userId?: string, orderId?: string): Promise<void> {
    if (userId) await this.redis.del(`${LIST_PREFIX}user:${userId}`);
    if (orderId) await this.redis.del(`${LIST_PREFIX}order:${orderId}`);
  }
}

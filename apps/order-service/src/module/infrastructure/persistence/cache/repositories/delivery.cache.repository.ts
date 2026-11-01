/**
 * DeliveryCacheRepository
 * @module order-service/infrastructure/persistence/cache/repositories
 */
import { Injectable } from '@nestjs/common';
import { RedisService } from '@vubon/shared-kernel/infrastructure/persistence/cache';
import { CACHE_TTL } from '@vubon/shared-constants/infrastructure';
import type { DeliveryResponseDTO } from '../../../../application/dtos/responses/delivery-response.dto.js';

const PREFIX = 'order-service:delivery:';

@Injectable()
export class DeliveryCacheRepository {
  constructor(private readonly redis: RedisService) {}

  async get(id: string): Promise<DeliveryResponseDTO | null> {
    return this.redis.get<DeliveryResponseDTO>(`${PREFIX}${id}`);
  }

  async set(id: string, dto: DeliveryResponseDTO): Promise<void> {
    await this.redis.set(`${PREFIX}${id}`, dto, CACHE_TTL.FIVE_MINUTES);
  }

  async invalidate(id: string): Promise<void> {
    await this.redis.del(`${PREFIX}${id}`);
  }
}

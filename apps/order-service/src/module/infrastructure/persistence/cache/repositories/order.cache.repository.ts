/**
 * OrderCacheRepository — read-through cache
 * @module order-service/infrastructure/persistence/cache/repositories
 */
import { Injectable } from '@nestjs/common';
import { RedisService } from '@vubon/shared-kernel/infrastructure/persistence/cache';
import { CACHE_TTL } from '@vubon/shared-constants/infrastructure';
import type { OrderResponseDTO } from '../../../../application/dtos/responses/order-response.dto.js';

const PREFIX = 'order-service:order:';
const LIST_PREFIX = 'order-service:order:list:';

@Injectable()
export class OrderCacheRepository {
  constructor(private readonly redis: RedisService) {}

  async get(id: string): Promise<OrderResponseDTO | null> {
    return this.redis.get<OrderResponseDTO>(`${PREFIX}${id}`);
  }

  async set(id: string, dto: OrderResponseDTO): Promise<void> {
    await this.redis.set(`${PREFIX}${id}`, dto, CACHE_TTL.FIVE_MINUTES);
  }

  async invalidate(id: string): Promise<void> {
    await this.redis.del(`${PREFIX}${id}`);
  }

  async invalidateList(customerId?: string): Promise<void> {
    if (customerId) await this.redis.del(`${LIST_PREFIX}customer:${customerId}`);
    else await this.redis.del(`${LIST_PREFIX}all`);
  }
}

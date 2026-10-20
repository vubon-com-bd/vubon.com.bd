/**
 * CheckoutCacheRepository
 * @module order-service/infrastructure/persistence/cache/repositories
 */
import { Injectable } from '@nestjs/common';
import { RedisService } from '@vubon/shared-kernel/infrastructure/persistence/cache';
import { CACHE_TTL } from '@vubon/shared-constants/infrastructure';
import type { CheckoutResponseDTO } from '../../../../application/dtos/responses/checkout-response.dto.js';

const PREFIX = 'order-service:checkout:';

@Injectable()
export class CheckoutCacheRepository {
  constructor(private readonly redis: RedisService) {}

  async get(id: string): Promise<CheckoutResponseDTO | null> {
    return this.redis.get<CheckoutResponseDTO>(`${PREFIX}${id}`);
  }

  async set(id: string, dto: CheckoutResponseDTO): Promise<void> {
    await this.redis.set(`${PREFIX}${id}`, dto, CACHE_TTL.FIFTEEN_MINUTES);
  }

  async invalidate(id: string): Promise<void> {
    await this.redis.del(`${PREFIX}${id}`);
  }
}

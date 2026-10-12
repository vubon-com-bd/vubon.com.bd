import { Injectable } from '@nestjs/common';
import { RedisService } from '@vubon/shared-kernel/infrastructure/persistence/cache';
import { CACHE_TTL } from '@vubon/shared-constants/infrastructure';
import type { ShippingMethodResponseDTO } from '../../../../application/dtos/responses/shipping-method/shipping-method-response.dto.js';

const PREFIX = 'logistics:shipping-method:';
const LIST_KEY = 'logistics:shipping-method:list';

@Injectable()
export class ShippingMethodCacheRepository {
  constructor(private readonly redis: RedisService) {}
  async get(id: string): Promise<ShippingMethodResponseDTO | null> {
    return this.redis.get<ShippingMethodResponseDTO>(`${PREFIX}${id}`);
  }
  async set(id: string, dto: ShippingMethodResponseDTO): Promise<void> {
    await this.redis.set(`${PREFIX}${id}`, dto, CACHE_TTL.ONE_HOUR);
  }
  async invalidate(id: string): Promise<void> {
    await this.redis.del(`${PREFIX}${id}`);
    await this.redis.del(LIST_KEY);
  }
  async invalidateList(): Promise<void> { await this.redis.del(LIST_KEY); }
}

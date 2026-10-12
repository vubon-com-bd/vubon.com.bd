import { Injectable } from '@nestjs/common';
import { RedisService } from '@vubon/shared-kernel/infrastructure/persistence/cache';
import { CACHE_TTL } from '@vubon/shared-constants/infrastructure';
import type { DeliveryResponseDTO } from '../../../../application/dtos/responses/delivery/delivery-response.dto.js';

const PREFIX = 'logistics:delivery:';
const LIST_PREFIX = 'logistics:delivery:list:';

@Injectable()
export class DeliveryCacheRepository {
  constructor(private readonly redis: RedisService) {}
  async get(id: string): Promise<DeliveryResponseDTO | null> {
    return this.redis.get<DeliveryResponseDTO>(`${PREFIX}${id}`);
  }
  async set(id: string, dto: DeliveryResponseDTO): Promise<void> {
    await this.redis.set(`${PREFIX}${id}`, dto, CACHE_TTL.FIVE_MINUTES);
  }
  async invalidate(id: string): Promise<void> { await this.redis.del(`${PREFIX}${id}`); }
  async invalidateList(driverId?: string): Promise<void> {
    if (driverId) await this.redis.del(`${LIST_PREFIX}driver:${driverId}`);
  }
}

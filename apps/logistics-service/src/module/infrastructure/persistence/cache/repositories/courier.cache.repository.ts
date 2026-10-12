import { Injectable } from '@nestjs/common';
import { RedisService } from '@vubon/shared-kernel/infrastructure/persistence/cache';
import { CACHE_TTL } from '@vubon/shared-constants/infrastructure';
import type { CourierResponseDTO } from '../../../../application/dtos/responses/courier/courier-response.dto.js';

const PREFIX = 'logistics:courier:';
const LIST_KEY = 'logistics:courier:list';

@Injectable()
export class CourierCacheRepository {
  constructor(private readonly redis: RedisService) {}
  async get(id: string): Promise<CourierResponseDTO | null> {
    return this.redis.get<CourierResponseDTO>(`${PREFIX}${id}`);
  }
  async set(id: string, dto: CourierResponseDTO): Promise<void> {
    await this.redis.set(`${PREFIX}${id}`, dto, CACHE_TTL.FIFTEEN_MINUTES);
  }
  async invalidate(id: string): Promise<void> {
    await this.redis.del(`${PREFIX}${id}`);
    await this.redis.del(LIST_KEY);
  }
  async invalidateList(): Promise<void> {
    await this.redis.del(LIST_KEY);
  }
}

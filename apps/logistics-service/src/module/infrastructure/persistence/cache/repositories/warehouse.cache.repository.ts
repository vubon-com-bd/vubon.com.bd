import { Injectable } from '@nestjs/common';
import { RedisService } from '@vubon/shared-kernel/infrastructure/persistence/cache';
import { CACHE_TTL } from '@vubon/shared-constants/infrastructure';
import type { WarehouseResponseDTO } from '../../../../application/dtos/responses/warehouse/warehouse-response.dto.js';

const PREFIX = 'logistics:warehouse:';
const LIST_KEY = 'logistics:warehouse:list';

@Injectable()
export class WarehouseCacheRepository {
  constructor(private readonly redis: RedisService) {}
  async get(id: string): Promise<WarehouseResponseDTO | null> {
    return this.redis.get<WarehouseResponseDTO>(`${PREFIX}${id}`);
  }
  async set(id: string, dto: WarehouseResponseDTO): Promise<void> {
    await this.redis.set(`${PREFIX}${id}`, dto, CACHE_TTL.FIFTEEN_MINUTES);
  }
  async invalidate(id: string): Promise<void> {
    await this.redis.del(`${PREFIX}${id}`);
    await this.redis.del(LIST_KEY);
  }
  async invalidateList(): Promise<void> { await this.redis.del(LIST_KEY); }
}

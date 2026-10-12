import { Injectable } from '@nestjs/common';
import { RedisService } from '@vubon/shared-kernel/infrastructure/persistence/cache';
import { CACHE_TTL } from '@vubon/shared-constants/infrastructure';
import type { ZoneResponseDTO } from '../../../../application/dtos/responses/zone/zone-response.dto.js';

const PREFIX = 'logistics:zone:';
const LIST_KEY = 'logistics:zone:list';

@Injectable()
export class ZoneCacheRepository {
  constructor(private readonly redis: RedisService) {}
  async get(id: string): Promise<ZoneResponseDTO | null> {
    return this.redis.get<ZoneResponseDTO>(`${PREFIX}${id}`);
  }
  async set(id: string, dto: ZoneResponseDTO): Promise<void> {
    await this.redis.set(`${PREFIX}${id}`, dto, CACHE_TTL.ONE_HOUR);
  }
  async invalidate(id: string): Promise<void> {
    await this.redis.del(`${PREFIX}${id}`);
    await this.redis.del(LIST_KEY);
  }
  async invalidateList(): Promise<void> { await this.redis.del(LIST_KEY); }
}

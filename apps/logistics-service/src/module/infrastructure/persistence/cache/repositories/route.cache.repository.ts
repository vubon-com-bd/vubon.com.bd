import { Injectable } from '@nestjs/common';
import { RedisService } from '@vubon/shared-kernel/infrastructure/persistence/cache';
import { CACHE_TTL } from '@vubon/shared-constants/infrastructure';
import type { RouteResponseDTO } from '../../../../application/dtos/responses/route/route-response.dto.js';

const PREFIX = 'logistics:route:';
const LIST_KEY = 'logistics:route:list';

@Injectable()
export class RouteCacheRepository {
  constructor(private readonly redis: RedisService) {}
  async get(id: string): Promise<RouteResponseDTO | null> {
    return this.redis.get<RouteResponseDTO>(`${PREFIX}${id}`);
  }
  async set(id: string, dto: RouteResponseDTO): Promise<void> {
    await this.redis.set(`${PREFIX}${id}`, dto, CACHE_TTL.FIVE_MINUTES);
  }
  async invalidate(id: string): Promise<void> {
    await this.redis.del(`${PREFIX}${id}`);
    await this.redis.del(LIST_KEY);
  }
  async invalidateList(): Promise<void> { await this.redis.del(LIST_KEY); }
}

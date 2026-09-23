import { Injectable } from '@nestjs/common';
import {
  BaseCacheRepository,
  RedisService,
} from '@vubon/shared-kernel/infrastructure';
import { RouteEntity } from '../../../../domain/entities/route.entity';
import { RouteIdVO } from '../../../../domain/value-objects/primitives/route-id.vo';

interface SerializedRoute {
  readonly id: string;
  readonly name: string;
  readonly status: string;
  readonly type: string;
  readonly distanceKm: number | null;
  readonly optimized: boolean;
  readonly createdAt: string;
  readonly updatedAt: string;
}

const PREFIX = 'logistics:route';
const TTL_SECONDS = 60 * 30;

@Injectable()
export class RouteCacheRepository extends BaseCacheRepository<RouteEntity, RouteIdVO> {
  constructor(redis: RedisService) {
    super(redis, PREFIX, TTL_SECONDS);
  }

  private serialize(entity: RouteEntity): SerializedRoute {
    return {
      id: entity.id.value,
      name: entity.name.value,
      status: entity.status.value,
      type: entity.type.value,
      distanceKm: entity.distance?.value ?? null,
      optimized: entity.optimized,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    };
  }

  async findById(id: RouteIdVO): Promise<RouteEntity | null> {
    const raw = await this.redis.get<SerializedRoute>(this.keyFor(id));
    if (!raw) return null;
    return null;
  }

  async findAll(): Promise<readonly RouteEntity[]> {
    return [];
  }

  async save(entity: RouteEntity): Promise<RouteEntity> {
    await this.redis.set(this.keyFor(entity.id), this.serialize(entity), TTL_SECONDS);
    return entity;
  }

  async delete(id: RouteIdVO): Promise<void> {
    await this.redis.del(this.keyFor(id));
  }
}

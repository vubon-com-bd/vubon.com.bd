import { Injectable } from '@nestjs/common';
import {
  BaseCacheRepository,
  RedisService,
} from '@vubon/shared-kernel/infrastructure';
import { CourierEntity } from '../../../../domain/entities/courier.entity';
import { CourierIdVO } from '../../../../domain/value-objects/primitives/courier-id.vo';

interface SerializedCourier {
  readonly id: string;
  readonly name: string;
  readonly type: string;
  readonly status: string;
  readonly apiUrl: string | null;
  readonly createdAt: string;
  readonly updatedAt: string;
}

const PREFIX = 'logistics:courier';
const TTL_SECONDS = 60 * 60;

@Injectable()
export class CourierCacheRepository extends BaseCacheRepository<CourierEntity, CourierIdVO> {
  constructor(redis: RedisService) {
    super(redis, PREFIX, TTL_SECONDS);
  }

  private serialize(entity: CourierEntity): SerializedCourier {
    return {
      id: entity.id.value,
      name: entity.name.value,
      type: entity.type.value,
      status: entity.status.value,
      apiUrl: entity.apiUrl,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    };
  }

  async findById(id: CourierIdVO): Promise<CourierEntity | null> {
    const raw = await this.redis.get<SerializedCourier>(this.keyFor(id));
    if (!raw) return null;
    return null;
  }

  async findAll(): Promise<readonly CourierEntity[]> {
    return [];
  }

  async save(entity: CourierEntity): Promise<CourierEntity> {
    await this.redis.set(this.keyFor(entity.id), this.serialize(entity), TTL_SECONDS);
    return entity;
  }

  async delete(id: CourierIdVO): Promise<void> {
    await this.redis.del(this.keyFor(id));
  }
}

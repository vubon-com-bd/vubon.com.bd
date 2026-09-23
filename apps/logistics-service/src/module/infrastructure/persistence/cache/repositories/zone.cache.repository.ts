import { Injectable } from '@nestjs/common';
import {
  BaseCacheRepository,
  RedisService,
} from '@vubon/shared-kernel/infrastructure';
import { ZoneEntity } from '../../../../domain/entities/zone.entity';
import { ZoneIdVO } from '../../../../domain/value-objects/primitives/zone-id.vo';

interface SerializedZone {
  readonly id: string;
  readonly code: string;
  readonly name: string;
  readonly type: string;
  readonly status: string;
  readonly divisions: readonly string[];
  readonly districts: readonly string[];
  readonly createdAt: string;
  readonly updatedAt: string;
}

const PREFIX = 'logistics:zone';
const TTL_SECONDS = 60 * 60;

@Injectable()
export class ZoneCacheRepository extends BaseCacheRepository<ZoneEntity, ZoneIdVO> {
  constructor(redis: RedisService) {
    super(redis, PREFIX, TTL_SECONDS);
  }

  private serialize(entity: ZoneEntity): SerializedZone {
    return {
      id: entity.id.value,
      code: entity.code,
      name: entity.name.value,
      type: entity.type.value,
      status: entity.status.value,
      divisions: [...entity.divisions],
      districts: [...entity.districts],
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    };
  }

  async findById(id: ZoneIdVO): Promise<ZoneEntity | null> {
    const raw = await this.redis.get<SerializedZone>(this.keyFor(id));
    if (!raw) return null;
    return null;
  }

  async findAll(): Promise<readonly ZoneEntity[]> {
    return [];
  }

  async save(entity: ZoneEntity): Promise<ZoneEntity> {
    await this.redis.set(this.keyFor(entity.id), this.serialize(entity), TTL_SECONDS);
    return entity;
  }

  async delete(id: ZoneIdVO): Promise<void> {
    await this.redis.del(this.keyFor(id));
  }
}

import { Injectable } from '@nestjs/common';
import {
  BaseCacheRepository,
  RedisService,
} from '@vubon/shared-kernel/infrastructure';
import { WarehouseEntity } from '../../../../domain/entities/warehouse.entity';
import { WarehouseIdVO } from '../../../../domain/value-objects/primitives/warehouse-id.vo';

interface SerializedWarehouse {
  readonly id: string;
  readonly code: string;
  readonly name: string;
  readonly status: string;
  readonly division: string | null;
  readonly district: string | null;
  readonly address: string | null;
  readonly capacity: number | null;
  readonly createdAt: string;
  readonly updatedAt: string;
}

const PREFIX = 'logistics:warehouse';
const TTL_SECONDS = 60 * 60;

@Injectable()
export class WarehouseCacheRepository extends BaseCacheRepository<WarehouseEntity, WarehouseIdVO> {
  constructor(redis: RedisService) {
    super(redis, PREFIX, TTL_SECONDS);
  }

  private serialize(entity: WarehouseEntity): SerializedWarehouse {
    return {
      id: entity.id.value,
      code: entity.code.value,
      name: entity.name.value,
      status: entity.status.value,
      division: entity.division,
      district: entity.district,
      address: entity.address,
      capacity: entity.capacity,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    };
  }

  async findById(id: WarehouseIdVO): Promise<WarehouseEntity | null> {
    const raw = await this.redis.get<SerializedWarehouse>(this.keyFor(id));
    if (!raw) return null;
    return null;
  }

  async findAll(): Promise<readonly WarehouseEntity[]> {
    return [];
  }

  async save(entity: WarehouseEntity): Promise<WarehouseEntity> {
    await this.redis.set(this.keyFor(entity.id), this.serialize(entity), TTL_SECONDS);
    return entity;
  }

  async delete(id: WarehouseIdVO): Promise<void> {
    await this.redis.del(this.keyFor(id));
  }
}

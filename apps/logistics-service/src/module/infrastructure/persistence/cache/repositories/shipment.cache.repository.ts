import { Injectable } from '@nestjs/common';
import {
  BaseCacheRepository,
  RedisService,
} from '@vubon/shared-kernel/infrastructure';
import { ShipmentEntity } from '../../../../domain/entities/shipment.entity';
import { ShipmentIdVO } from '../../../../domain/value-objects/primitives/shipment-id.vo';

interface SerializedShipment {
  readonly id: string;
  readonly shipmentNumber: string;
  readonly orderId: string;
  readonly userId: string;
  readonly vendorId: string | null;
  readonly status: string;
  readonly type: string;
  readonly priority: string;
  readonly notes: string | null;
  readonly createdAt: string;
  readonly updatedAt: string;
  readonly deletedAt: string | null;
}

const PREFIX = 'logistics:shipment';
const TTL_SECONDS = 60 * 15;

@Injectable()
export class ShipmentCacheRepository extends BaseCacheRepository<ShipmentEntity, ShipmentIdVO> {
  constructor(redis: RedisService) {
    super(redis, PREFIX, TTL_SECONDS);
  }

  private serialize(entity: ShipmentEntity): SerializedShipment {
    return {
      id: entity.id.value,
      shipmentNumber: entity.number.value,
      orderId: entity.orderId.value,
      userId: entity.userId.value,
      vendorId: entity.vendorId?.value ?? null,
      status: entity.status.value,
      type: entity.type.value,
      priority: entity.priority.value,
      notes: entity.notes,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
      deletedAt: entity.deletedAt ?? null,
    };
  }

  async findById(id: ShipmentIdVO): Promise<ShipmentEntity | null> {
    const raw = await this.redis.get<SerializedShipment>(this.keyFor(id));
    if (!raw) return null;
    void raw;
    return null;
  }

  async findAll(): Promise<readonly ShipmentEntity[]> {
    return [];
  }

  async save(entity: ShipmentEntity): Promise<ShipmentEntity> {
    await this.redis.set(this.keyFor(entity.id), this.serialize(entity), TTL_SECONDS);
    return entity;
  }

  async delete(id: ShipmentIdVO): Promise<void> {
    await this.redis.del(this.keyFor(id));
  }
}

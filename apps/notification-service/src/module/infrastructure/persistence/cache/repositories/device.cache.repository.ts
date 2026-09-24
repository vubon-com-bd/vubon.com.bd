import { Injectable } from '@nestjs/common';
import {
  BaseCacheRepository,
  RedisService,
} from '@vubon/shared-kernel/infrastructure';
import { DeviceEntity } from '../../../../domain/entities/device.entity';
import { DeviceIdVO } from '../../../../domain/value-objects/primitives/device-id.vo';
import { DeviceTypeVO } from '../../../../domain/value-objects/primitives/device-type.vo';
import { DeviceStatusVO } from '../../../../domain/value-objects/primitives/device-status.vo';
import { DevicePlatformVO } from '../../../../domain/value-objects/primitives/device-platform.vo';
import { UserIdVO } from '../../../../domain/value-objects/primitives/user-id.vo';

interface SerializedDevice {
  readonly id: string;
  readonly userId: string;
  readonly type: string;
  readonly platform: string;
  readonly status: string;
  readonly fingerprint: string | null;
  readonly createdAt: string;
  readonly updatedAt: string;
  readonly deletedAt: string | null;
}

const PREFIX = 'notif:device';
const TTL_SECONDS = 60 * 15;

@Injectable()
export class DeviceCacheRepository extends BaseCacheRepository<DeviceEntity, DeviceIdVO> {
  constructor(redis: RedisService) {
    super(redis, PREFIX, TTL_SECONDS);
  }

  private serialize(entity: DeviceEntity): SerializedDevice {
    return {
      id: entity.id.value,
      userId: entity.userId.value,
      type: entity.type.value,
      platform: entity.platform.value,
      status: entity.status.value,
      fingerprint: entity.fingerprint,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
      deletedAt: entity.deletedAt ?? null,
    };
  }

  private deserialize(data: SerializedDevice): DeviceEntity {
    return DeviceEntity.reconstitute(
      DeviceIdVO.create(data.id),
      {
        userId: UserIdVO.create(data.userId),
        type: DeviceTypeVO.create(data.type),
        platform: DevicePlatformVO.create(data.platform),
        status: DeviceStatusVO.create(data.status),
        fingerprint: data.fingerprint,
      },
      data.createdAt,
      data.updatedAt,
      data.deletedAt,
    );
  }

  async findById(id: DeviceIdVO): Promise<DeviceEntity | null> {
    const raw = await this.redis.get<SerializedDevice>(this.keyFor(id));
    return raw ? this.deserialize(raw) : null;
  }

  async findAll(): Promise<readonly DeviceEntity[]> {
    return [];
  }

  async save(entity: DeviceEntity): Promise<DeviceEntity> {
    await this.redis.set(this.keyFor(entity.id), this.serialize(entity), TTL_SECONDS);
    return entity;
  }

  async delete(id: DeviceIdVO): Promise<void> {
    await this.redis.del(this.keyFor(id));
  }
}

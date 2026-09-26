import { Injectable } from '@nestjs/common';
import { BaseCacheRepository, RedisService } from '@vubon/shared-kernel/infrastructure';
import { VendorEntity } from '../../../../domain/entities/vendor.entity';
import { VendorIdVO } from '../../../../domain/value-objects/primitives/vendor-id.vo';
import { VendorNameVO } from '../../../../domain/value-objects/primitives/vendor-name.vo';
import { VendorSlugVO } from '../../../../domain/value-objects/primitives/vendor-slug.vo';
import { VendorStatusVO } from '../../../../domain/value-objects/primitives/vendor-status.vo';
import { VendorTypeVO } from '../../../../domain/value-objects/primitives/vendor-type.vo';
import { VendorTierVO } from '../../../../domain/value-objects/primitives/vendor-tier.vo';
import { UserIdVO } from '../../../../domain/value-objects/primitives/user-id.vo';

interface SerializedVendor {
  readonly id: string;
  readonly ownerId: string;
  readonly name: string;
  readonly slug: string;
  readonly status: string;
  readonly type: string;
  readonly tier: string;
  readonly createdAt: string;
  readonly updatedAt: string;
  readonly deletedAt: string | null;
}

const PREFIX = 'vendor:vendor';
const TTL_SECONDS = 60 * 15;

@Injectable()
export class VendorCacheRepository extends BaseCacheRepository<VendorEntity, VendorIdVO> {
  constructor(redis: RedisService) {
    super(redis, PREFIX, TTL_SECONDS);
  }

  private serialize(entity: VendorEntity): SerializedVendor {
    return {
      id: entity.id.value,
      ownerId: entity.ownerId.value,
      name: entity.name.value,
      slug: entity.slug.value,
      status: entity.status.value,
      type: entity.type.value,
      tier: entity.tier.value,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
      deletedAt: entity.deletedAt ?? null,
    };
  }

  private deserialize(data: SerializedVendor): VendorEntity {
    return VendorEntity.reconstitute(
      VendorIdVO.create(data.id),
      {
        ownerId: UserIdVO.create(data.ownerId),
        name: VendorNameVO.create(data.name),
        slug: VendorSlugVO.create(data.slug),
        status: VendorStatusVO.create(data.status),
        type: VendorTypeVO.create(data.type),
        tier: VendorTierVO.create(data.tier),
      },
      data.createdAt,
      data.updatedAt,
      data.deletedAt,
    );
  }

  async findById(id: VendorIdVO): Promise<VendorEntity | null> {
    const raw = await this.redis.get<SerializedVendor>(this.keyFor(id));
    return raw ? this.deserialize(raw) : null;
  }

  async findAll(): Promise<readonly VendorEntity[]> {
    return [];
  }

  async save(entity: VendorEntity): Promise<VendorEntity> {
    await this.redis.set(this.keyFor(entity.id), this.serialize(entity), TTL_SECONDS);
    return entity;
  }

  async delete(id: VendorIdVO): Promise<void> {
    await this.redis.del(this.keyFor(id));
  }
}

import { Injectable } from '@nestjs/common';
import { BaseCacheRepository, RedisService } from '@vubon/shared-kernel/infrastructure';
import { PromotionEntity } from '../../../../domain/entities/promotion.entity';
import { PromotionIdVO } from '../../../../domain/value-objects/primitives/promotion-id.vo';
import { PromotionNameVO } from '../../../../domain/value-objects/primitives/promotion-name.vo';
import { PromotionCodeVO } from '../../../../domain/value-objects/primitives/promotion-code.vo';
import { PromotionStatusVO } from '../../../../domain/value-objects/primitives/promotion-status.vo';
import { PromotionTypeVO } from '../../../../domain/value-objects/primitives/promotion-type.vo';
import { PromotionUsageVO } from '../../../../domain/value-objects/primitives/promotion-usage.vo';

const PREFIX = 'marketing:promotion';
const TTL_SECONDS = 60 * 15;

interface SerializedPromotion {
  readonly id: string;
  readonly name: string;
  readonly code: string;
  readonly status: string;
  readonly type: string;
  readonly usedCount: number;
  readonly createdAt: string;
  readonly updatedAt: string;
  readonly deletedAt: string | null;
}

@Injectable()
export class PromotionCacheRepository extends BaseCacheRepository<PromotionEntity, PromotionIdVO> {
  constructor(redis: RedisService) {
    super(redis, PREFIX, TTL_SECONDS);
  }

  private serialize(entity: PromotionEntity): SerializedPromotion {
    return {
      id: entity.id.value,
      name: entity.name.value,
      code: entity.code.value,
      status: entity.status.value,
      type: entity.type.value,
      usedCount: entity.usage.value,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
      deletedAt: entity.deletedAt ?? null,
    };
  }

  private deserialize(data: SerializedPromotion): PromotionEntity {
    return PromotionEntity.reconstitute(
      PromotionIdVO.create(data.id),
      {
        name: PromotionNameVO.create(data.name),
        code: PromotionCodeVO.create(data.code),
        status: PromotionStatusVO.create(data.status),
        type: PromotionTypeVO.create(data.type),
        usage: PromotionUsageVO.create(data.usedCount),
        maxUsage: null,
        startDate: null,
        endDate: null,
      },
      data.createdAt,
      data.updatedAt,
      data.deletedAt,
    );
  }

  async findById(id: PromotionIdVO): Promise<PromotionEntity | null> {
    const raw = await this.redis.get<SerializedPromotion>(this.keyFor(id));
    return raw ? this.deserialize(raw) : null;
  }

  async findAll(): Promise<readonly PromotionEntity[]> {
    return [];
  }

  async save(entity: PromotionEntity): Promise<PromotionEntity> {
    await this.redis.set(this.keyFor(entity.id), this.serialize(entity), TTL_SECONDS);
    return entity;
  }

  async delete(id: PromotionIdVO): Promise<void> {
    await this.redis.del(this.keyFor(id));
  }
}

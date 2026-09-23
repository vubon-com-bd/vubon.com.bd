import { Injectable } from '@nestjs/common';
import { BaseCacheRepository, RedisService } from '@vubon/shared-kernel/infrastructure';
import { LoyaltyTierEntity } from '../../../../domain/entities/loyalty-tier.entity';
import { LoyaltyTierCompositeVO } from '../../../../domain/value-objects/composites/loyalty-tier-composite.vo';
import { LoyaltyTierVO } from '../../../../domain/value-objects/primitives/loyalty-tier.vo';
import { LoyaltyPointsVO } from '../../../../domain/value-objects/primitives/loyalty-points.vo';

const PREFIX = 'marketing:loyalty-tier';
const TTL_SECONDS = 60 * 30;

interface SerializedTier {
  readonly id: string;
  readonly tier: string;
  readonly minPoints: number;
  readonly createdAt: string;
  readonly updatedAt: string;
}

@Injectable()
export class LoyaltyTierCacheRepository extends BaseCacheRepository<LoyaltyTierEntity, string> {
  constructor(redis: RedisService) {
    super(redis, PREFIX, TTL_SECONDS);
  }

  private serialize(entity: LoyaltyTierEntity): SerializedTier {
    return {
      id: entity.id,
      tier: entity.tier.tier.value,
      minPoints: entity.tier.minPoints.value,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    };
  }

  private deserialize(data: SerializedTier): LoyaltyTierEntity {
    return LoyaltyTierEntity.reconstitute(
      data.id,
      {
        tier: LoyaltyTierCompositeVO.create({
          tier: LoyaltyTierVO.create(data.tier),
          minPoints: LoyaltyPointsVO.create(data.minPoints),
          benefits: [],
        }),
      },
      data.createdAt,
      data.updatedAt,
      null,
    );
  }

  async findById(id: string): Promise<LoyaltyTierEntity | null> {
    const raw = await this.redis.get<SerializedTier>(this.keyFor(id));
    return raw ? this.deserialize(raw) : null;
  }

  async findAll(): Promise<readonly LoyaltyTierEntity[]> {
    return [];
  }

  async save(entity: LoyaltyTierEntity): Promise<LoyaltyTierEntity> {
    await this.redis.set(this.keyFor(entity.id), this.serialize(entity), TTL_SECONDS);
    return entity;
  }

  async delete(id: string): Promise<void> {
    await this.redis.del(this.keyFor(id));
  }
}

import { Injectable } from '@nestjs/common';
import { BaseCacheRepository, RedisService } from '@vubon/shared-kernel/infrastructure';
import { RecommendationEntity } from '../../../../domain/entities/recommendation.entity';
import { RecommendationIdVO } from '../../../../domain/value-objects/primitives/recommendation-id.vo';
import { RecommendationTypeVO } from '../../../../domain/value-objects/primitives/recommendation-type.vo';
import { RecommendationStrategyVO } from '../../../../domain/value-objects/primitives/recommendation-strategy.vo';
import { RecommendationStatusVO } from '../../../../domain/value-objects/primitives/recommendation-status.vo';
import { UserIdVO } from '../../../../domain/value-objects/primitives/user-id.vo';
import { RecommendationContextVO } from '../../../../domain/value-objects/composites/recommendation-context.vo';
import { RecommendationResultVO } from '../../../../domain/value-objects/composites/recommendation-result.vo';

interface SerializedRec {
  readonly id: string;
  readonly userId: string;
  readonly type: string;
  readonly strategy: string;
  readonly status: string;
  readonly createdAt: string;
  readonly updatedAt: string;
}

const PREFIX = 'ai:recommendation';
const TTL_SECONDS = 60 * 5;

@Injectable()
export class RecommendationCacheRepository extends BaseCacheRepository<RecommendationEntity, RecommendationIdVO> {
  constructor(redis: RedisService) {
    super(redis, PREFIX, TTL_SECONDS);
  }

  private serialize(entity: RecommendationEntity): SerializedRec {
    return {
      id: entity.id.value,
      userId: entity.context.userId.value,
      type: entity.type.value,
      strategy: entity.strategy.value,
      status: entity.status.value,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    };
  }

  private deserialize(data: SerializedRec): RecommendationEntity {
    return RecommendationEntity.reconstitute(
      RecommendationIdVO.create(data.id),
      {
        type: RecommendationTypeVO.create(data.type),
        strategy: RecommendationStrategyVO.create(data.strategy),
        status: RecommendationStatusVO.create(data.status),
        context: RecommendationContextVO.create({
          userId: UserIdVO.create(data.userId),
          sessionId: null,
          deviceType: null,
          location: null,
          recentlyViewed: [],
          cartItems: [],
        }),
        result: RecommendationResultVO.create({ items: [], generatedAt: new Date() }),
      },
      data.createdAt,
      data.updatedAt,
      null,
    );
  }

  async findById(id: RecommendationIdVO): Promise<RecommendationEntity | null> {
    const raw = await this.redis.get<SerializedRec>(this.keyFor(id));
    return raw ? this.deserialize(raw) : null;
  }

  async findAll(): Promise<readonly RecommendationEntity[]> {
    return [];
  }

  async save(entity: RecommendationEntity): Promise<RecommendationEntity> {
    await this.redis.set(this.keyFor(entity.id), this.serialize(entity), TTL_SECONDS);
    return entity;
  }

  async delete(id: RecommendationIdVO): Promise<void> {
    await this.redis.del(this.keyFor(id));
  }
}

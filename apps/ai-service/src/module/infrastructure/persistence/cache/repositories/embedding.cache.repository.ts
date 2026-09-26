import { Injectable } from '@nestjs/common';
import { BaseCacheRepository, RedisService } from '@vubon/shared-kernel/infrastructure';
import { EmbeddingEntity } from '../../../../domain/entities/embedding.entity';
import { EmbeddingIdVO } from '../../../../domain/value-objects/primitives/embedding-id.vo';
import { EmbeddingTypeVO } from '../../../../domain/value-objects/primitives/embedding-type.vo';
import { EmbeddingModelVO } from '../../../../domain/value-objects/primitives/embedding-model.vo';
import { EmbeddingDimensionVO } from '../../../../domain/value-objects/primitives/embedding-dimension.vo';
import { EmbeddingStatusVO } from '../../../../domain/value-objects/primitives/embedding-status.vo';

interface SerializedEmbedding {
  readonly id: string;
  readonly sourceId: string;
  readonly sourceType: string;
  readonly type: string;
  readonly model: string;
  readonly dimension: number;
  readonly status: string;
  readonly vector: readonly number[];
  readonly createdAt: string;
  readonly updatedAt: string;
}

const PREFIX = 'ai:embedding';
const TTL_SECONDS = 60 * 60 * 24;

@Injectable()
export class EmbeddingCacheRepository extends BaseCacheRepository<EmbeddingEntity, EmbeddingIdVO> {
  constructor(redis: RedisService) {
    super(redis, PREFIX, TTL_SECONDS);
  }

  private cacheKey(sourceId: string, sourceType: string): string {
    return `${sourceId}:${sourceType}`;
  }

  private serialize(entity: EmbeddingEntity): SerializedEmbedding {
    return {
      id: entity.id.value,
      sourceId: entity.sourceId,
      sourceType: entity.sourceType,
      type: entity.type.value,
      model: entity.model.value,
      dimension: entity.dimension.value,
      status: entity.status.value,
      vector: [...entity.vector],
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    };
  }

  private deserialize(data: SerializedEmbedding): EmbeddingEntity {
    return EmbeddingEntity.reconstitute(
      EmbeddingIdVO.create(data.id),
      {
        sourceId: data.sourceId,
        sourceType: data.sourceType,
        type: EmbeddingTypeVO.create(data.type),
        model: EmbeddingModelVO.create(data.model),
        dimension: EmbeddingDimensionVO.create(data.dimension),
        status: EmbeddingStatusVO.create(data.status),
        vector: data.vector,
      },
      data.createdAt,
      data.updatedAt,
      null,
    );
  }

  async findById(id: EmbeddingIdVO): Promise<EmbeddingEntity | null> {
    const raw = await this.redis.get<SerializedEmbedding>(this.keyFor(id));
    return raw ? this.deserialize(raw) : null;
  }

  async findBySource(sourceId: string, sourceType: string): Promise<EmbeddingEntity | null> {
    const raw = await this.redis.get<SerializedEmbedding>(this.cacheKey(sourceId, sourceType));
    return raw ? this.deserialize(raw) : null;
  }

  async findAll(): Promise<readonly EmbeddingEntity[]> {
    return [];
  }

  async save(entity: EmbeddingEntity): Promise<EmbeddingEntity> {
    const serialized = this.serialize(entity);
    await this.redis.set(this.keyFor(entity.id), serialized, TTL_SECONDS);
    await this.redis.set(this.cacheKey(entity.sourceId, entity.sourceType), serialized, TTL_SECONDS);
    return entity;
  }

  async delete(id: EmbeddingIdVO): Promise<void> {
    await this.redis.del(this.keyFor(id));
  }
}

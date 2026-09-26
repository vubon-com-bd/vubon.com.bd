import { Injectable } from '@nestjs/common';
import { BaseCacheRepository, RedisService } from '@vubon/shared-kernel/infrastructure';
import { ModelEntity } from '../../../../domain/entities/model.entity';
import { ModelIdVO } from '../../../../domain/value-objects/primitives/model-id.vo';
import { ModelNameVO } from '../../../../domain/value-objects/primitives/model-name.vo';
import { ModelVersionVO } from '../../../../domain/value-objects/primitives/model-version.vo';
import { ModelStatusVO } from '../../../../domain/value-objects/primitives/model-status.vo';
import { ModelTypeVO } from '../../../../domain/value-objects/primitives/model-type.vo';
import { ModelProviderIdVO } from '../../../../domain/value-objects/primitives/model-provider-id.vo';
import { ProviderEndpointVO } from '../../../../domain/value-objects/primitives/provider-endpoint.vo';

interface SerializedModel {
  readonly id: string;
  readonly name: string;
  readonly version: string;
  readonly status: string;
  readonly type: string;
  readonly providerId: string;
  readonly endpoint: string | null;
  readonly description: string | null;
  readonly createdAt: string;
  readonly updatedAt: string;
  readonly deletedAt: string | null;
}

const PREFIX = 'ai:model';
const TTL_SECONDS = 60 * 15;

@Injectable()
export class ModelCacheRepository extends BaseCacheRepository<ModelEntity, ModelIdVO> {
  constructor(redis: RedisService) {
    super(redis, PREFIX, TTL_SECONDS);
  }

  private serialize(entity: ModelEntity): SerializedModel {
    return {
      id: entity.id.value,
      name: entity.name.value,
      version: entity.modelVersion.value,
      status: entity.status.value,
      type: entity.type.value,
      providerId: entity.providerId.value,
      endpoint: entity.endpoint?.value ?? null,
      description: entity.description,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
      deletedAt: entity.deletedAt ?? null,
    };
  }

  private deserialize(data: SerializedModel): ModelEntity {
    return ModelEntity.reconstitute(
      ModelIdVO.create(data.id),
      {
        name: ModelNameVO.create(data.name),
        modelVersion: ModelVersionVO.create(data.version),
        status: ModelStatusVO.create(data.status),
        type: ModelTypeVO.create(data.type),
        providerId: ModelProviderIdVO.create(data.providerId),
        endpoint: data.endpoint ? ProviderEndpointVO.create(data.endpoint) : null,
        description: data.description,
        metadata: null,
        metrics: null,
      },
      data.createdAt,
      data.updatedAt,
      data.deletedAt,
    );
  }

  async findById(id: ModelIdVO): Promise<ModelEntity | null> {
    const raw = await this.redis.get<SerializedModel>(this.keyFor(id));
    return raw ? this.deserialize(raw) : null;
  }

  async findAll(): Promise<readonly ModelEntity[]> {
    return [];
  }

  async save(entity: ModelEntity): Promise<ModelEntity> {
    await this.redis.set(this.keyFor(entity.id), this.serialize(entity), TTL_SECONDS);
    return entity;
  }

  async delete(id: ModelIdVO): Promise<void> {
    await this.redis.del(this.keyFor(id));
  }
}

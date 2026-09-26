import type { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import { ModelMetadataEntity } from '../entities/model-metadata.entity';
import { ModelIdVO } from '../value-objects/primitives/model-id.vo';

export interface ModelMetadataRepository
  extends BaseRepository<ModelMetadataEntity, ModelIdVO> {
  findByModelId(modelId: ModelIdVO): Promise<ModelMetadataEntity | null>;
  findByTag(tag: string): Promise<readonly ModelMetadataEntity[]>;
}

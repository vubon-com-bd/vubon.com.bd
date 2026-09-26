import type { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import { ModelArtifactEntity } from '../entities/model-artifact.entity';
import { ModelIdVO } from '../value-objects/primitives/model-id.vo';

export interface ModelArtifactRepository
  extends BaseRepository<ModelArtifactEntity, string> {
  findByModelId(modelId: ModelIdVO): Promise<readonly ModelArtifactEntity[]>;
  findByType(type: string): Promise<readonly ModelArtifactEntity[]>;
}

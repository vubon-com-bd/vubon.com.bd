import type { BaseServiceInterface } from '@vubon/shared-kernel/application/services/base.service.interface';
import type { ModelArtifactEntity } from '../../../domain/entities/model-artifact.entity';

export interface ModelArtifactServiceInterface
  extends BaseServiceInterface<ModelArtifactEntity, string> {
  findByModelId(modelId: string): Promise<readonly ModelArtifactEntity[]>;
  attach(modelId: string, artifact: { type: string; url: string; sizeBytes?: number | null }): Promise<void>;
}

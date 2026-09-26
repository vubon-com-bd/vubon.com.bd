import { Injectable } from '@nestjs/common';
import { BaseService } from '@vubon/shared-kernel/application/services/base.service';
import type { ModelArtifactServiceInterface } from '../interfaces/model-artifact.service.interface';
import type { ModelArtifactRepository } from '../../../domain/repositories/model-artifact.repository.interface';
import { ModelArtifactEntity } from '../../../domain/entities/model-artifact.entity';
import { ModelIdVO } from '../../../domain/value-objects/primitives/model-id.vo';
import { ModelArtifactVO } from '../../../domain/value-objects/composites/model-artifact.vo';

@Injectable()
export class ModelArtifactService
  extends BaseService<ModelArtifactEntity, string>
  implements ModelArtifactServiceInterface
{
  readonly name = 'ModelArtifactService';

  constructor(private readonly artifactRepo: ModelArtifactRepository) {
    super();
  }

  async findByModelId(modelId: string): Promise<readonly ModelArtifactEntity[]> {
    return this.artifactRepo.findByModelId(ModelIdVO.create(modelId));
  }

  async attach(
    modelId: string,
    artifact: { type: string; url: string; sizeBytes?: number | null },
  ): Promise<void> {
    const vo = ModelArtifactVO.create({
      type: artifact.type,
      url: artifact.url,
      sizeBytes: artifact.sizeBytes ?? null,
      checksum: null,
    });
    const entity = ModelArtifactEntity.create({
      modelId: ModelIdVO.create(modelId),
      artifact: vo,
    });
    await this.artifactRepo.save(entity);
  }
}

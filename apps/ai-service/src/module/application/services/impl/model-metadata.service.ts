import { Injectable } from '@nestjs/common';
import { BaseService } from '@vubon/shared-kernel/application/services/base.service';
import type { ModelMetadataServiceInterface } from '../interfaces/model-metadata.service.interface';
import type { ModelMetadataRepository } from '../../../domain/repositories/model-metadata.repository.interface';
import { ModelMetadataEntity } from '../../../domain/entities/model-metadata.entity';
import { ModelIdVO } from '../../../domain/value-objects/primitives/model-id.vo';
import { ModelMetadataVO } from '../../../domain/value-objects/composites/model-metadata.vo';
import { ModelNotFoundError } from '../../errors/model.errors';

@Injectable()
export class ModelMetadataService
  extends BaseService<ModelMetadataEntity, ModelIdVO>
  implements ModelMetadataServiceInterface
{
  readonly name = 'ModelMetadataService';

  constructor(private readonly metadataRepo: ModelMetadataRepository) {
    super();
  }

  async findByModelId(modelId: string): Promise<ModelMetadataEntity | null> {
    return this.metadataRepo.findByModelId(ModelIdVO.create(modelId));
  }

  async upsert(modelId: string, metadata: Readonly<Record<string, unknown>>): Promise<void> {
    const id = ModelIdVO.create(modelId);
    const existing = await this.metadataRepo.findByModelId(id);

    const vo = ModelMetadataVO.create({
      framework: (metadata.framework as string) ?? null,
      architecture: (metadata.architecture as string) ?? null,
      parameters: typeof metadata.parameters === 'number' ? metadata.parameters : null,
      license: (metadata.license as string) ?? null,
      tags: Array.isArray(metadata.tags) ? (metadata.tags as string[]) : [],
    });

    if (existing) {
      const updated = ModelMetadataEntity.reconstitute(
        existing.id,
        { modelId: id, metadata: vo },
        existing.createdAt,
        new Date().toISOString(),
        existing.deletedAt ?? null,
      );
      await this.metadataRepo.save(updated);
    } else {
      const created = ModelMetadataEntity.create({ modelId: id, metadata: vo });
      await this.metadataRepo.save(created);
    }
  }
}

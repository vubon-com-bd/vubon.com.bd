import { Injectable } from '@nestjs/common';
import { BasePrismaRepository } from '@vubon/shared-kernel/infrastructure';
import type { AiModelMetadata as PrismaMetadata } from '@prisma/client';
import { ModelMetadataEntity } from '../../../../domain/entities/model-metadata.entity';
import type { ModelMetadataRepository } from '../../../../domain/repositories/model-metadata.repository.interface';
import { ModelIdVO } from '../../../../domain/value-objects/primitives/model-id.vo';
import { ModelMetadataVO } from '../../../../domain/value-objects/composites/model-metadata.vo';
import { PrismaService } from '../prisma.service';

@Injectable()
export class ModelMetadataPrismaRepository
  extends BasePrismaRepository<ModelMetadataEntity, ModelIdVO>
  implements ModelMetadataRepository
{
  constructor(protected readonly prisma: PrismaService) { super(prisma); }

  private toDomain(raw: PrismaMetadata): ModelMetadataEntity {
    return ModelMetadataEntity.reconstitute(
      ModelIdVO.create(raw.modelId),
      {
        modelId: ModelIdVO.create(raw.modelId),
        metadata: ModelMetadataVO.create({
          framework: raw.framework,
          architecture: raw.architecture,
          parameters: raw.parameters ? Number(raw.parameters) : null,
          license: raw.license,
          tags: raw.tags,
        }),
      },
      raw.createdAt.toISOString(),
      raw.updatedAt.toISOString(),
      raw.deletedAt?.toISOString() ?? null,
    );
  }

  async findById(id: ModelIdVO): Promise<ModelMetadataEntity | null> {
    const raw = await this.prisma.aiModelMetadata.findUnique({ where: { modelId: id.value } });
    return raw ? this.toDomain(raw) : null;
  }

  async findAll(): Promise<readonly ModelMetadataEntity[]> {
    const rows = await this.prisma.aiModelMetadata.findMany();
    return rows.map((r) => this.toDomain(r));
  }

  async save(entity: ModelMetadataEntity): Promise<ModelMetadataEntity> {
    const data = {
      framework: entity.metadata.framework,
      architecture: entity.metadata.architecture,
      parameters: entity.metadata.parameters ? BigInt(entity.metadata.parameters) : null,
      license: entity.metadata.license,
      tags: [...entity.metadata.tags],
      updatedAt: new Date(),
    };
    const raw = await this.prisma.aiModelMetadata.upsert({
      where: { modelId: entity.modelId.value },
      create: { id: entity.id.value, modelId: entity.modelId.value, ...data },
      update: data,
    });
    return this.toDomain(raw);
  }

  async delete(id: ModelIdVO): Promise<void> {
    await this.prisma.aiModelMetadata.update({
      where: { modelId: id.value },
      data: { deletedAt: new Date() },
    });
  }

  async findByModelId(modelId: ModelIdVO): Promise<ModelMetadataEntity | null> {
    const raw = await this.prisma.aiModelMetadata.findUnique({ where: { modelId: modelId.value } });
    return raw ? this.toDomain(raw) : null;
  }

  async findByTag(tag: string): Promise<readonly ModelMetadataEntity[]> {
    const rows = await this.prisma.aiModelMetadata.findMany({
      where: { tags: { has: tag } },
    });
    return rows.map((r) => this.toDomain(r));
  }
}

import { Injectable } from '@nestjs/common';
import { BasePrismaRepository } from '@vubon/shared-kernel/infrastructure';
import type { AiModelArtifact as PrismaArtifact } from '@prisma/client';
import { ModelArtifactEntity } from '../../../../domain/entities/model-artifact.entity';
import type { ModelArtifactRepository } from '../../../../domain/repositories/model-artifact.repository.interface';
import { ModelIdVO } from '../../../../domain/value-objects/primitives/model-id.vo';
import { ModelArtifactVO } from '../../../../domain/value-objects/composites/model-artifact.vo';
import { PrismaService } from '../prisma.service';

@Injectable()
export class ModelArtifactPrismaRepository
  extends BasePrismaRepository<ModelArtifactEntity, string>
  implements ModelArtifactRepository
{
  constructor(protected readonly prisma: PrismaService) { super(prisma); }

  private toDomain(raw: PrismaArtifact): ModelArtifactEntity {
    return ModelArtifactEntity.reconstitute(
      raw.id,
      {
        modelId: ModelIdVO.create(raw.modelId),
        artifact: ModelArtifactVO.create({
          type: raw.type,
          url: raw.url,
          sizeBytes: raw.sizeBytes ? Number(raw.sizeBytes) : null,
          checksum: raw.checksum,
        }),
      },
      raw.createdAt.toISOString(),
      raw.updatedAt.toISOString(),
      null,
    );
  }

  async findById(id: string): Promise<ModelArtifactEntity | null> {
    const raw = await this.prisma.aiModelArtifact.findUnique({ where: { id } });
    return raw ? this.toDomain(raw) : null;
  }

  async findAll(): Promise<readonly ModelArtifactEntity[]> {
    const rows = await this.prisma.aiModelArtifact.findMany();
    return rows.map((r) => this.toDomain(r));
  }

  async save(entity: ModelArtifactEntity): Promise<ModelArtifactEntity> {
    const data = {
      modelId: entity.modelId.value,
      type: entity.artifact.type,
      url: entity.artifact.url,
      sizeBytes: entity.artifact.sizeBytes ? BigInt(entity.artifact.sizeBytes) : null,
      checksum: entity.artifact.checksum,
    };
    const raw = await this.prisma.aiModelArtifact.upsert({
      where: { id: entity.id },
      create: { id: entity.id, ...data },
      update: data,
    });
    return this.toDomain(raw);
  }

  async delete(id: string): Promise<void> {
    await this.prisma.aiModelArtifact.delete({ where: { id } });
  }

  async findByModelId(modelId: ModelIdVO): Promise<readonly ModelArtifactEntity[]> {
    const rows = await this.prisma.aiModelArtifact.findMany({
      where: { modelId: modelId.value },
    });
    return rows.map((r) => this.toDomain(r));
  }

  async findByType(type: string): Promise<readonly ModelArtifactEntity[]> {
    const rows = await this.prisma.aiModelArtifact.findMany({ where: { type } });
    return rows.map((r) => this.toDomain(r));
  }
}

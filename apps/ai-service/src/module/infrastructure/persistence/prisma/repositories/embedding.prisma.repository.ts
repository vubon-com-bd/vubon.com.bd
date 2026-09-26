import { Injectable } from '@nestjs/common';
import { BasePrismaRepository } from '@vubon/shared-kernel/infrastructure';
import type { AiEmbedding as PrismaEmb } from '@prisma/client';
import { EmbeddingEntity } from '../../../../domain/entities/embedding.entity';
import type { EmbeddingRepository } from '../../../../domain/repositories/embedding.repository.interface';
import { EmbeddingIdVO } from '../../../../domain/value-objects/primitives/embedding-id.vo';
import { EmbeddingTypeVO } from '../../../../domain/value-objects/primitives/embedding-type.vo';
import { EmbeddingModelVO } from '../../../../domain/value-objects/primitives/embedding-model.vo';
import { EmbeddingDimensionVO } from '../../../../domain/value-objects/primitives/embedding-dimension.vo';
import { EmbeddingStatusVO } from '../../../../domain/value-objects/primitives/embedding-status.vo';
import { PrismaService } from '../prisma.service';

@Injectable()
export class EmbeddingPrismaRepository
  extends BasePrismaRepository<EmbeddingEntity, EmbeddingIdVO>
  implements EmbeddingRepository
{
  constructor(protected readonly prisma: PrismaService) { super(prisma); }

  private toDomain(raw: PrismaEmb): EmbeddingEntity {
    return EmbeddingEntity.reconstitute(
      EmbeddingIdVO.create(raw.id),
      {
        sourceId: raw.sourceId,
        sourceType: raw.sourceType,
        type: EmbeddingTypeVO.create(raw.type),
        model: EmbeddingModelVO.create(raw.model),
        dimension: EmbeddingDimensionVO.create(raw.dimension),
        status: EmbeddingStatusVO.create(raw.status),
        vector: raw.vector as number[],
      },
      raw.createdAt.toISOString(),
      raw.updatedAt.toISOString(),
      raw.deletedAt?.toISOString() ?? null,
    );
  }

  async findById(id: EmbeddingIdVO): Promise<EmbeddingEntity | null> {
    const raw = await this.prisma.aiEmbedding.findUnique({ where: { id: id.value } });
    return raw ? this.toDomain(raw) : null;
  }

  async findAll(): Promise<readonly EmbeddingEntity[]> {
    const rows = await this.prisma.aiEmbedding.findMany({ where: { deletedAt: null } });
    return rows.map((r) => this.toDomain(r));
  }

  async save(entity: EmbeddingEntity): Promise<EmbeddingEntity> {
    const data = {
      sourceId: entity.sourceId,
      sourceType: entity.sourceType,
      type: entity.type.value,
      model: entity.model.value,
      dimension: entity.dimension.value,
      status: entity.status.value,
      vector: [...entity.vector] as unknown as object,
      updatedAt: new Date(),
    };
    const raw = await this.prisma.aiEmbedding.upsert({
      where: { id: entity.id.value },
      create: { id: entity.id.value, ...data },
      update: data,
    });
    return this.toDomain(raw);
  }

  async delete(id: EmbeddingIdVO): Promise<void> {
    await this.prisma.aiEmbedding.update({ where: { id: id.value }, data: { deletedAt: new Date() } });
  }

  async findBySource(sourceId: string, sourceType: string): Promise<readonly EmbeddingEntity[]> {
    const rows = await this.prisma.aiEmbedding.findMany({
      where: { sourceId, sourceType, deletedAt: null },
    });
    return rows.map((r) => this.toDomain(r));
  }

  async findByModel(model: string): Promise<readonly EmbeddingEntity[]> {
    const rows = await this.prisma.aiEmbedding.findMany({
      where: { model, deletedAt: null },
    });
    return rows.map((r) => this.toDomain(r));
  }

  async findUnindexed(): Promise<readonly EmbeddingEntity[]> {
    const rows = await this.prisma.aiEmbedding.findMany({
      where: { status: { not: 'indexed' }, deletedAt: null },
    });
    return rows.map((r) => this.toDomain(r));
  }
}

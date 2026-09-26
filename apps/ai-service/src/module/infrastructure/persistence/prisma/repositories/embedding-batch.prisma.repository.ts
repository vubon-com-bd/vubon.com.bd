import { Injectable } from '@nestjs/common';
import { BasePrismaRepository } from '@vubon/shared-kernel/infrastructure';
import type { AiEmbedding as PrismaEmbedding } from '@prisma/client';
import { EmbeddingBatchEntity } from '../../../../domain/entities/embedding-batch.entity';
import type { EmbeddingBatchRepository } from '../../../../domain/repositories/embedding-batch.repository.interface';
import { EmbeddingIdVO } from '../../../../domain/value-objects/primitives/embedding-id.vo';
import { EmbeddingBatchVO } from '../../../../domain/value-objects/composites/embedding-batch.vo';
import { PrismaService } from '../prisma.service';

@Injectable()
export class EmbeddingBatchPrismaRepository
  extends BasePrismaRepository<EmbeddingBatchEntity, EmbeddingIdVO>
  implements EmbeddingBatchRepository
{
  constructor(protected readonly prisma: PrismaService) { super(prisma); }

  private toDomain(raw: PrismaEmbedding): EmbeddingBatchEntity {
    return EmbeddingBatchEntity.reconstitute(
      EmbeddingIdVO.create(raw.id),
      {
        embeddingId: EmbeddingIdVO.create(raw.id),
        batch: EmbeddingBatchVO.create({
          items: [
            {
              sourceId: raw.sourceId,
              vector: raw.vector as number[],
            },
          ],
          dimension: raw.dimension,
        }),
      },
      raw.createdAt.toISOString(),
      raw.updatedAt.toISOString(),
      raw.deletedAt?.toISOString() ?? null,
    );
  }

  async findById(id: EmbeddingIdVO): Promise<EmbeddingBatchEntity | null> {
    const raw = await this.prisma.aiEmbedding.findUnique({ where: { id: id.value } });
    return raw ? this.toDomain(raw) : null;
  }

  async findAll(): Promise<readonly EmbeddingBatchEntity[]> {
    const rows = await this.prisma.aiEmbedding.findMany({ where: { deletedAt: null } });
    return rows.map((r) => this.toDomain(r));
  }

  async save(entity: EmbeddingBatchEntity): Promise<EmbeddingBatchEntity> {
    const first = entity.batch.items[0];
    if (!first) {
      throw new Error('EmbeddingBatch: no items to persist');
    }
    const data = {
      sourceId: first.sourceId,
      sourceType: 'batch',
      type: 'text',
      model: 'batch',
      dimension: entity.batch.dimension,
      status: 'generated',
      vector: first.vector as unknown as object,
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
    await this.prisma.aiEmbedding.update({
      where: { id: id.value },
      data: { deletedAt: new Date() },
    });
  }

  async findByEmbeddingId(embeddingId: EmbeddingIdVO): Promise<EmbeddingBatchEntity | null> {
    const raw = await this.prisma.aiEmbedding.findUnique({ where: { id: embeddingId.value } });
    return raw ? this.toDomain(raw) : null;
  }
}

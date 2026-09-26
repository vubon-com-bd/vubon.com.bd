import { Injectable } from '@nestjs/common';
import { BasePrismaRepository } from '@vubon/shared-kernel/infrastructure';
import type { AiSimilarity as PrismaSimilarity } from '@prisma/client';
import { SimilarityResultEntity } from '../../../../domain/entities/similarity-result.entity';
import type { SimilarityResultRepository } from '../../../../domain/repositories/similarity-result.repository.interface';
import { SimilarityIdVO } from '../../../../domain/value-objects/primitives/similarity-id.vo';
import { SimilarityResultVO } from '../../../../domain/value-objects/composites/similarity-result.vo';
import { PrismaService } from '../prisma.service';

interface SimMatch {
  readonly vectorId: string;
  readonly score: number;
}

@Injectable()
export class SimilarityResultPrismaRepository
  extends BasePrismaRepository<SimilarityResultEntity, SimilarityIdVO>
  implements SimilarityResultRepository
{
  constructor(protected readonly prisma: PrismaService) { super(prisma); }

  private toDomain(raw: PrismaSimilarity): SimilarityResultEntity {
    const matches = (raw.matches as unknown as SimMatch[]) ?? [];
    return SimilarityResultEntity.reconstitute(
      SimilarityIdVO.create(raw.id),
      {
        similarityId: SimilarityIdVO.create(raw.id),
        result: SimilarityResultVO.create({
          id: SimilarityIdVO.create(raw.id),
          queryVectorId: raw.sourceVectorId,
          matches: matches.map((m) => ({ vectorId: m.vectorId, score: m.score })),
          threshold: raw.threshold,
        }),
      },
      raw.createdAt.toISOString(),
      raw.updatedAt.toISOString(),
      null,
    );
  }

  async findById(id: SimilarityIdVO): Promise<SimilarityResultEntity | null> {
    const raw = await this.prisma.aiSimilarity.findUnique({ where: { id: id.value } });
    return raw ? this.toDomain(raw) : null;
  }

  async findAll(): Promise<readonly SimilarityResultEntity[]> {
    const rows = await this.prisma.aiSimilarity.findMany();
    return rows.map((r) => this.toDomain(r));
  }

  async save(entity: SimilarityResultEntity): Promise<SimilarityResultEntity> {
    const data = {
      matches: entity.result.matches.map((m) => ({
        vectorId: m.vectorId,
        score: m.score,
      })) as unknown as object,
      updatedAt: new Date(),
    };
    const raw = await this.prisma.aiSimilarity.upsert({
      where: { id: entity.similarityId.value },
      create: {
        id: entity.similarityId.value,
        sourceVectorId: entity.result.queryVectorId,
        targetVectorId: entity.result.queryVectorId,
        metric: 'cosine',
        threshold: entity.result.threshold,
        ...data,
      },
      update: data,
    });
    return this.toDomain(raw);
  }

  async delete(id: SimilarityIdVO): Promise<void> {
    await this.prisma.aiSimilarity.delete({ where: { id: id.value } });
  }

  async findBySimilarityId(similarityId: SimilarityIdVO): Promise<SimilarityResultEntity | null> {
    const raw = await this.prisma.aiSimilarity.findUnique({ where: { id: similarityId.value } });
    return raw ? this.toDomain(raw) : null;
  }
}

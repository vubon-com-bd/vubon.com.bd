import { Injectable } from '@nestjs/common';
import { BasePrismaRepository } from '@vubon/shared-kernel/infrastructure';
import type { AiSimilarity as PrismaSim } from '@prisma/client';
import { SimilarityEntity } from '../../../../domain/entities/similarity.entity';
import type { SimilarityRepository } from '../../../../domain/repositories/similarity.repository.interface';
import { SimilarityIdVO } from '../../../../domain/value-objects/primitives/similarity-id.vo';
import { SimilarityThresholdVO } from '../../../../domain/value-objects/primitives/similarity-threshold.vo';
import { VectorIdVO } from '../../../../domain/value-objects/primitives/vector-id.vo';
import { SimilarityResultVO } from '../../../../domain/value-objects/composites/similarity-result.vo';
import { PrismaService } from '../prisma.service';

interface SimMatch {
  readonly vectorId: string;
  readonly score: number;
}

@Injectable()
export class SimilarityPrismaRepository
  extends BasePrismaRepository<SimilarityEntity, SimilarityIdVO>
  implements SimilarityRepository
{
  constructor(protected readonly prisma: PrismaService) { super(prisma); }

  private toDomain(raw: PrismaSim): SimilarityEntity {
    const matches = (raw.matches as unknown as SimMatch[]) ?? [];
    return SimilarityEntity.reconstitute(
      SimilarityIdVO.create(raw.id),
      {
        sourceVectorId: VectorIdVO.create(raw.sourceVectorId),
        targetVectorId: VectorIdVO.create(raw.targetVectorId),
        metric: raw.metric,
        threshold: SimilarityThresholdVO.create(raw.threshold),
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

  async findById(id: SimilarityIdVO): Promise<SimilarityEntity | null> {
    const raw = await this.prisma.aiSimilarity.findUnique({ where: { id: id.value } });
    return raw ? this.toDomain(raw) : null;
  }

  async findAll(): Promise<readonly SimilarityEntity[]> {
    const rows = await this.prisma.aiSimilarity.findMany({ orderBy: { createdAt: 'desc' } });
    return rows.map((r) => this.toDomain(r));
  }

  async save(entity: SimilarityEntity): Promise<SimilarityEntity> {
    const data = {
      sourceVectorId: entity.sourceVectorId.value,
      targetVectorId: entity.targetVectorId.value,
      metric: entity.metric,
      threshold: entity.threshold.value,
      matches: entity.result.matches.map((m) => ({
        vectorId: m.vectorId,
        score: m.score,
      })) as unknown as object,
      updatedAt: new Date(),
    };
    const raw = await this.prisma.aiSimilarity.upsert({
      where: { id: entity.id.value },
      create: { id: entity.id.value, ...data },
      update: data,
    });
    return this.toDomain(raw);
  }

  async delete(id: SimilarityIdVO): Promise<void> {
    await this.prisma.aiSimilarity.delete({ where: { id: id.value } });
  }

  async findByVectorId(vectorId: VectorIdVO): Promise<readonly SimilarityEntity[]> {
    const rows = await this.prisma.aiSimilarity.findMany({
      where: { sourceVectorId: vectorId.value },
    });
    return rows.map((r) => this.toDomain(r));
  }

  async findByMetric(metric: string): Promise<readonly SimilarityEntity[]> {
    const rows = await this.prisma.aiSimilarity.findMany({ where: { metric } });
    return rows.map((r) => this.toDomain(r));
  }

  async findRecent(limit: number): Promise<readonly SimilarityEntity[]> {
    const rows = await this.prisma.aiSimilarity.findMany({
      orderBy: { createdAt: 'desc' },
      take: limit,
    });
    return rows.map((r) => this.toDomain(r));
  }
}

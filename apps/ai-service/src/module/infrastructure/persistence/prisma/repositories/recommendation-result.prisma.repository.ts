import { Injectable } from '@nestjs/common';
import { BasePrismaRepository } from '@vubon/shared-kernel/infrastructure';
import type { AiRecommendationResult as PrismaRes } from '@prisma/client';
import { RecommendationResultEntity } from '../../../../domain/entities/recommendation-result.entity';
import type { RecommendationResultRepository } from '../../../../domain/repositories/recommendation-result.repository.interface';
import { RecommendationIdVO } from '../../../../domain/value-objects/primitives/recommendation-id.vo';
import { RecommendationResultVO } from '../../../../domain/value-objects/composites/recommendation-result.vo';
import { ProductIdVO } from '../../../../domain/value-objects/primitives/product-id.vo';
import { RecommendationScoreVO } from '../../../../domain/value-objects/primitives/recommendation-score.vo';
import { PrismaService } from '../prisma.service';

@Injectable()
export class RecommendationResultPrismaRepository
  extends BasePrismaRepository<RecommendationResultEntity, RecommendationIdVO>
  implements RecommendationResultRepository
{
  constructor(protected readonly prisma: PrismaService) { super(prisma); }

  private toDomain(raw: PrismaRes): RecommendationResultEntity {
    const items = (raw.items as Array<{ productId: string; score: number; rank: number; reason: string | null }>) ?? [];
    return RecommendationResultEntity.reconstitute(
      RecommendationIdVO.create(raw.recommendationId),
      {
        recommendationId: RecommendationIdVO.create(raw.recommendationId),
        result: RecommendationResultVO.create({
          items: items.map((i) => ({
            productId: ProductIdVO.create(i.productId),
            score: RecommendationScoreVO.create(i.score),
            rank: i.rank,
            reason: i.reason,
          })),
          generatedAt: raw.generatedAt,
        }),
      },
      raw.createdAt.toISOString(),
      raw.updatedAt.toISOString(),
      null,
    );
  }

  async findById(id: RecommendationIdVO): Promise<RecommendationResultEntity | null> {
    const raw = await this.prisma.aiRecommendationResult.findUnique({
      where: { recommendationId: id.value },
    });
    return raw ? this.toDomain(raw) : null;
  }

  async findAll(): Promise<readonly RecommendationResultEntity[]> {
    const rows = await this.prisma.aiRecommendationResult.findMany();
    return rows.map((r) => this.toDomain(r));
  }

  async save(entity: RecommendationResultEntity): Promise<RecommendationResultEntity> {
    const data = {
      items: entity.result.items.map((i) => ({
        productId: i.productId.value,
        score: i.score.value,
        rank: i.rank,
        reason: i.reason,
      })),
      generatedAt: entity.result.generatedAt,
      updatedAt: new Date(),
    };
    const raw = await this.prisma.aiRecommendationResult.upsert({
      where: { recommendationId: entity.recommendationId.value },
      create: { id: entity.id.value, recommendationId: entity.recommendationId.value, ...data },
      update: data,
    });
    return this.toDomain(raw);
  }

  async delete(id: RecommendationIdVO): Promise<void> {
    await this.prisma.aiRecommendationResult.delete({ where: { recommendationId: id.value } });
  }

  async findByRecommendationId(recommendationId: RecommendationIdVO): Promise<RecommendationResultEntity | null> {
    const raw = await this.prisma.aiRecommendationResult.findUnique({
      where: { recommendationId: recommendationId.value },
    });
    return raw ? this.toDomain(raw) : null;
  }
}

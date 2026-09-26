import { Injectable } from '@nestjs/common';
import { BasePrismaRepository } from '@vubon/shared-kernel/infrastructure';
import type { AiRankingResult as PrismaRR } from '@prisma/client';
import { RankingResultEntity } from '../../../../domain/entities/ranking-result.entity';
import type { RankingResultRepository } from '../../../../domain/repositories/ranking-result.repository.interface';
import { RankingIdVO } from '../../../../domain/value-objects/primitives/ranking-id.vo';
import { RankingResultVO } from '../../../../domain/value-objects/composites/ranking-result.vo';
import { ProductIdVO } from '../../../../domain/value-objects/primitives/product-id.vo';
import { PrismaService } from '../prisma.service';

@Injectable()
export class RankingResultPrismaRepository
  extends BasePrismaRepository<RankingResultEntity, RankingIdVO>
  implements RankingResultRepository
{
  constructor(protected readonly prisma: PrismaService) { super(prisma); }

  private toDomain(raw: PrismaRR): RankingResultEntity {
    const items = (raw.items as Array<{ productId: string; rank: number; score: number; features: Record<string, number> }>) ?? [];
    return RankingResultEntity.reconstitute(
      RankingIdVO.create(raw.rankingId),
      {
        rankingId: RankingIdVO.create(raw.rankingId),
        result: RankingResultVO.create({
          items: items.map((i) => ({
            productId: ProductIdVO.create(i.productId),
            rank: i.rank,
            score: i.score,
            features: i.features,
          })),
          algorithm: raw.algorithm,
        }),
      },
      raw.createdAt.toISOString(),
      raw.updatedAt.toISOString(),
      null,
    );
  }

  async findById(id: RankingIdVO): Promise<RankingResultEntity | null> {
    const raw = await this.prisma.aiRankingResult.findUnique({ where: { rankingId: id.value } });
    return raw ? this.toDomain(raw) : null;
  }

  async findAll(): Promise<readonly RankingResultEntity[]> {
    const rows = await this.prisma.aiRankingResult.findMany();
    return rows.map((r) => this.toDomain(r));
  }

  async save(entity: RankingResultEntity): Promise<RankingResultEntity> {
    const data = {
      items: entity.result.items.map((i) => ({
        productId: i.productId.value,
        rank: i.rank,
        score: i.score,
        features: { ...i.features },
      })),
      algorithm: entity.result.algorithm,
      updatedAt: new Date(),
    };
    const raw = await this.prisma.aiRankingResult.upsert({
      where: { rankingId: entity.rankingId.value },
      create: { id: entity.id.value, rankingId: entity.rankingId.value, ...data },
      update: data,
    });
    return this.toDomain(raw);
  }

  async delete(id: RankingIdVO): Promise<void> {
    await this.prisma.aiRankingResult.delete({ where: { rankingId: id.value } });
  }

  async findByRankingId(rankingId: RankingIdVO): Promise<RankingResultEntity | null> {
    const raw = await this.prisma.aiRankingResult.findUnique({ where: { rankingId: rankingId.value } });
    return raw ? this.toDomain(raw) : null;
  }
}

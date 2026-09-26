import { Injectable } from '@nestjs/common';
import { BasePrismaRepository } from '@vubon/shared-kernel/infrastructure';
import type { AiRanking as PrismaR } from '@prisma/client';
import { RankingEntity } from '../../../../domain/entities/ranking.entity';
import type { RankingRepository } from '../../../../domain/repositories/ranking.repository.interface';
import { RankingIdVO } from '../../../../domain/value-objects/primitives/ranking-id.vo';
import { RankingAlgorithmVO } from '../../../../domain/value-objects/primitives/ranking-algorithm.vo';
import { RankingResultVO } from '../../../../domain/value-objects/composites/ranking-result.vo';
import { ProductIdVO } from '../../../../domain/value-objects/primitives/product-id.vo';
import { PrismaService } from '../prisma.service';

@Injectable()
export class RankingPrismaRepository
  extends BasePrismaRepository<RankingEntity, RankingIdVO>
  implements RankingRepository
{
  constructor(protected readonly prisma: PrismaService) { super(prisma); }

  private toDomain(raw: PrismaR): RankingEntity {
    return RankingEntity.reconstitute(
      RankingIdVO.create(raw.id),
      {
        algorithm: RankingAlgorithmVO.create(raw.algorithm),
        features: [],
        result: RankingResultVO.create({ items: [], algorithm: raw.algorithm }),
      },
      raw.createdAt.toISOString(),
      raw.updatedAt.toISOString(),
      null,
    );
  }

  async findById(id: RankingIdVO): Promise<RankingEntity | null> {
    const raw = await this.prisma.aiRanking.findUnique({ where: { id: id.value } });
    return raw ? this.toDomain(raw) : null;
  }

  async findAll(): Promise<readonly RankingEntity[]> {
    const rows = await this.prisma.aiRanking.findMany();
    return rows.map((r) => this.toDomain(r));
  }

  async save(entity: RankingEntity): Promise<RankingEntity> {
    const data = {
      algorithm: entity.algorithm.value,
      features: [],
      updatedAt: new Date(),
    };
    const raw = await this.prisma.aiRanking.upsert({
      where: { id: entity.id.value },
      create: { id: entity.id.value, ...data },
      update: data,
    });
    return this.toDomain(raw);
  }

  async delete(id: RankingIdVO): Promise<void> {
    await this.prisma.aiRanking.delete({ where: { id: id.value } });
  }

  async findByAlgorithm(algorithm: string): Promise<readonly RankingEntity[]> {
    const rows = await this.prisma.aiRanking.findMany({ where: { algorithm } });
    return rows.map((r) => this.toDomain(r));
  }

  async findAllRecent(limit: number): Promise<readonly RankingEntity[]> {
    const rows = await this.prisma.aiRanking.findMany({ orderBy: { createdAt: 'desc' }, take: limit });
    return rows.map((r) => this.toDomain(r));
  }
}

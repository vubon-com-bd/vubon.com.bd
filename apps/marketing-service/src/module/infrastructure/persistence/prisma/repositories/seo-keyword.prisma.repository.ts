import { Injectable } from '@nestjs/common';
import { SeoKeyword as PrismaSeoKeyword } from '@prisma/client';
import { BasePrismaRepository } from '@vubon/shared-kernel/infrastructure';
import { PrismaService } from '../prisma.service';
import { SeoKeywordEntity } from '../../../../domain/entities/seo-keyword.entity';
import { SeoKeywordCompositeVO } from '../../../../domain/value-objects/composites/seo-keyword-composite.vo';
import { SeoMarketingIdVO } from '../../../../domain/value-objects/primitives/seo-marketing-id.vo';
import { SeoKeywordVO } from '../../../../domain/value-objects/primitives/seo-keyword.vo';
import type { SeoKeywordRepository } from '../../../../domain/repositories/seo-keyword.repository.interface';

@Injectable()
export class SeoKeywordPrismaRepository
  extends BasePrismaRepository<SeoKeywordEntity, string>
  implements SeoKeywordRepository
{
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }

  private toDomain(raw: PrismaSeoKeyword): SeoKeywordEntity {
    return SeoKeywordEntity.reconstitute(
      raw.id,
      {
        seoMarketingId: SeoMarketingIdVO.create(raw.seoMarketingId),
        keyword: SeoKeywordCompositeVO.create({
          keyword: SeoKeywordVO.create(raw.keyword),
          volume: raw.volume,
          difficulty: raw.difficulty,
          rank: raw.rank,
        }),
      },
      raw.createdAt.toISOString(),
      raw.updatedAt.toISOString(),
      null,
    );
  }

  async findById(id: string): Promise<SeoKeywordEntity | null> {
    const raw = await this.prisma.seoKeyword.findUnique({ where: { id } });
    return raw ? this.toDomain(raw) : null;
  }

  async findAll(): Promise<readonly SeoKeywordEntity[]> {
    const rows = await this.prisma.seoKeyword.findMany();
    return rows.map((r) => this.toDomain(r));
  }

  async save(entity: SeoKeywordEntity): Promise<SeoKeywordEntity> {
    const data = {
      seoMarketingId: entity.seoMarketingId.value,
      keyword: entity.keyword.keyword.value,
      volume: entity.keyword.volume,
      difficulty: entity.keyword.difficulty,
      rank: entity.keyword.rank,
      updatedAt: new Date(),
    };
    const raw = await this.prisma.seoKeyword.upsert({
      where: { id: entity.id },
      create: { id: entity.id, ...data },
      update: data,
    });
    return this.toDomain(raw);
  }

  async delete(id: string): Promise<void> {
    await this.prisma.seoKeyword.delete({ where: { id } });
  }

  async findBySeo(seoMarketingId: SeoMarketingIdVO): Promise<readonly SeoKeywordEntity[]> {
    const rows = await this.prisma.seoKeyword.findMany({
      where: { seoMarketingId: seoMarketingId.value },
    });
    return rows.map((r) => this.toDomain(r));
  }
}

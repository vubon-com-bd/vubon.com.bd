import { Injectable } from '@nestjs/common';
import { SeoMarketing as PrismaSeoMarketing } from '@prisma/client';
import { BasePrismaRepository } from '@vubon/shared-kernel/infrastructure';
import { PrismaService } from '../prisma.service';
import { SeoMarketingEntity } from '../../../../domain/entities/seo-marketing.entity';
import { SeoMarketingIdVO } from '../../../../domain/value-objects/primitives/seo-marketing-id.vo';
import { SeoElementVO } from '../../../../domain/value-objects/primitives/seo-element.vo';
import type { SeoMarketingRepository } from '../../../../domain/repositories/seo-marketing.repository.interface';

@Injectable()
export class SeoMarketingPrismaRepository
  extends BasePrismaRepository<SeoMarketingEntity, SeoMarketingIdVO>
  implements SeoMarketingRepository
{
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }

  private toDomain(raw: PrismaSeoMarketing): SeoMarketingEntity {
    return SeoMarketingEntity.reconstitute(
      SeoMarketingIdVO.create(raw.id),
      {
        pageUrl: raw.pageUrl,
        title: raw.title ? SeoElementVO.create(raw.title) : null,
        description: raw.description ? SeoElementVO.create(raw.description) : null,
        score: raw.score,
      },
      raw.createdAt.toISOString(),
      raw.updatedAt.toISOString(),
      null,
    );
  }

  async findById(id: SeoMarketingIdVO): Promise<SeoMarketingEntity | null> {
    const raw = await this.prisma.seoMarketing.findUnique({ where: { id: id.value } });
    return raw ? this.toDomain(raw) : null;
  }

  async findAll(): Promise<readonly SeoMarketingEntity[]> {
    const rows = await this.prisma.seoMarketing.findMany();
    return rows.map((r) => this.toDomain(r));
  }

  async save(entity: SeoMarketingEntity): Promise<SeoMarketingEntity> {
    const data = {
      pageUrl: entity.pageUrl,
      title: entity.title?.value ?? null,
      description: entity.description?.value ?? null,
      score: entity.score,
      updatedAt: new Date(),
    };
    const raw = await this.prisma.seoMarketing.upsert({
      where: { id: entity.id.value },
      create: { id: entity.id.value, ...data },
      update: data,
    });
    return this.toDomain(raw);
  }

  async delete(id: SeoMarketingIdVO): Promise<void> {
    await this.prisma.seoMarketing.delete({ where: { id: id.value } });
  }

  async findByPageUrl(pageUrl: string): Promise<SeoMarketingEntity | null> {
    const raw = await this.prisma.seoMarketing.findFirst({ where: { pageUrl } });
    return raw ? this.toDomain(raw) : null;
  }
}

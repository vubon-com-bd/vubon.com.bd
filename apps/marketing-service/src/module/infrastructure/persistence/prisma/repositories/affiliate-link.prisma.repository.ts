import { Injectable } from '@nestjs/common';
import { AffiliateLink as PrismaAffiliateLink } from '@prisma/client';
import { BasePrismaRepository } from '@vubon/shared-kernel/infrastructure';
import { PrismaService } from '../prisma.service';
import { AffiliateLinkEntity } from '../../../../domain/entities/affiliate-link.entity';
import { AffiliateLinkVO } from '../../../../domain/value-objects/composites/affiliate-link.vo';
import { AffiliateIdVO } from '../../../../domain/value-objects/primitives/affiliate-id.vo';
import { ProductIdVO } from '../../../../domain/value-objects/primitives/product-id.vo';
import type { AffiliateLinkRepository } from '../../../../domain/repositories/affiliate-link.repository.interface';

@Injectable()
export class AffiliateLinkPrismaRepository
  extends BasePrismaRepository<AffiliateLinkEntity, string>
  implements AffiliateLinkRepository
{
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }

  private toDomain(raw: PrismaAffiliateLink): AffiliateLinkEntity {
    const affiliateId = AffiliateIdVO.create(raw.affiliateId);
    return AffiliateLinkEntity.reconstitute(
      raw.id,
      {
        affiliateId,
        link: AffiliateLinkVO.create({
          affiliateId,
          productId: raw.productId ? ProductIdVO.create(raw.productId) : null,
          url: raw.url,
          clicks: raw.clicks,
          conversions: raw.conversions,
        }),
      },
      raw.createdAt.toISOString(),
      raw.updatedAt.toISOString(),
      null,
    );
  }

  async findById(id: string): Promise<AffiliateLinkEntity | null> {
    const raw = await this.prisma.affiliateLink.findUnique({ where: { id } });
    return raw ? this.toDomain(raw) : null;
  }

  async findAll(): Promise<readonly AffiliateLinkEntity[]> {
    const rows = await this.prisma.affiliateLink.findMany();
    return rows.map((r) => this.toDomain(r));
  }

  async save(entity: AffiliateLinkEntity): Promise<AffiliateLinkEntity> {
    const data = {
      affiliateId: entity.affiliateId.value,
      productId: entity.link.productId?.value ?? null,
      url: entity.link.url,
      clicks: entity.link.clicks,
      conversions: entity.link.conversions,
      updatedAt: new Date(),
    };
    const raw = await this.prisma.affiliateLink.upsert({
      where: { id: entity.id },
      create: { id: entity.id, ...data },
      update: data,
    });
    return this.toDomain(raw);
  }

  async delete(id: string): Promise<void> {
    await this.prisma.affiliateLink.delete({ where: { id } });
  }

  async findByAffiliate(affiliateId: AffiliateIdVO): Promise<readonly AffiliateLinkEntity[]> {
    const rows = await this.prisma.affiliateLink.findMany({
      where: { affiliateId: affiliateId.value },
    });
    return rows.map((r) => this.toDomain(r));
  }
}

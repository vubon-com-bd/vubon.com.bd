/**
 * BrandPrismaRepository
 */
import { Injectable } from '@nestjs/common';
import type { PrismaClient } from '@prisma/client';
import { PrismaService } from '@vubon/shared-kernel/prisma';
import { BasePrismaRepository, type PrismaDelegate } from '@vubon/shared-kernel/prisma';
import { BrandEntity } from '../../../../domain/entities/brand.entity.js';
import type {
  BrandRepository,
  BrandPaginationOptions,
  BrandPaginationResult,
} from '../../../../domain/repositories/brand.repository.interface.js';
import { BrandIdVO } from '../../../../domain/value-objects/primitives/brand-id.vo.js';
import { BrandNameVO } from '../../../../domain/value-objects/primitives/brand-name.vo.js';
import { BrandSlugVO } from '../../../../domain/value-objects/primitives/brand-slug.vo.js';
import { BrandLogoVO } from '../../../../domain/value-objects/primitives/brand-logo.vo.js';

interface PrismaBrandRow {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  logoUrl: string | null;
  bannerUrl: string | null;
  website: string | null;
  status: string;
  isFeatured: boolean;
  productCount: number;
  country: string | null;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

@Injectable()
export class BrandPrismaRepository
  extends BasePrismaRepository<BrandEntity, PrismaBrandRow, string>
  implements BrandRepository
{
  protected readonly model: PrismaDelegate<PrismaBrandRow>;

  constructor(private readonly prismaService: PrismaService) {
    super();
    const client = this.prismaService as unknown as { brand: PrismaDelegate<PrismaBrandRow> };
    this.model = client.brand;
  }

  private get client(): PrismaClient {
    return this.prismaService as unknown as PrismaClient;
  }

  protected toDomain(raw: PrismaBrandRow): BrandEntity {
    return BrandEntity.reconstitute({
      id: raw.id,
      createdAt: raw.createdAt.toISOString(),
      updatedAt: raw.updatedAt.toISOString(),
      deletedAt: raw.deletedAt ? raw.deletedAt.toISOString() : null,
      props: {
        name: BrandNameVO.reconstitute(raw.name),
        slug: BrandSlugVO.reconstitute(raw.slug),
        description: raw.description ?? undefined,
        logo: raw.logoUrl ? BrandLogoVO.reconstitute(raw.logoUrl) : BrandLogoVO.empty(),
        bannerUrl: raw.bannerUrl ?? undefined,
        website: raw.website ?? undefined,
        status: raw.status,
        isFeatured: raw.isFeatured,
        productCount: raw.productCount,
        country: raw.country ?? undefined,
      },
    });
  }

  protected toPersistence(domain: BrandEntity): Record<string, unknown> {
    return {
      id: domain.id,
      name: domain.name.value,
      slug: domain.slug.value,
      description: domain.description ?? null,
      logoUrl: domain.logo.value || null,
      bannerUrl: domain.bannerUrl ?? null,
      website: domain.website ?? null,
      status: domain.status,
      isFeatured: domain.isFeatured,
      productCount: domain.productCount,
      country: domain.country ?? null,
      deletedAt: domain.deletedAt ? new Date(domain.deletedAt) : null,
    };
  }

  protected idOf(domain: BrandEntity): string { return domain.id; }
  protected whereForId(id: string): Record<string, unknown> { return { id }; }

  async findByIdVO(id: BrandIdVO): Promise<BrandEntity | null> {
    return this.findById(id.value);
  }

  async findBySlug(slug: BrandSlugVO): Promise<BrandEntity | null> {
    const raw = await this.client.brand.findUnique({ where: { slug: slug.value } });
    return raw ? this.toDomain(raw as unknown as PrismaBrandRow) : null;
  }

  async existsBySlug(slug: BrandSlugVO): Promise<boolean> {
    const count = await this.client.brand.count({ where: { slug: slug.value } });
    return count > 0;
  }

  async findFeatured(limit = 20): Promise<readonly BrandEntity[]> {
    const rows = await this.client.brand.findMany({
      where: { isFeatured: true, deletedAt: null },
      take: limit,
    });
    return rows.map((r) => this.toDomain(r as unknown as PrismaBrandRow));
  }

  async findActive(): Promise<readonly BrandEntity[]> {
    const rows = await this.client.brand.findMany({
      where: { status: 'active', deletedAt: null },
    });
    return rows.map((r) => this.toDomain(r as unknown as PrismaBrandRow));
  }

  async findPaginated(options: BrandPaginationOptions): Promise<BrandPaginationResult> {
    const where: Record<string, unknown> = { deletedAt: null };
    if (options.status) where.status = options.status;
    if (options.isFeatured !== undefined) where.isFeatured = options.isFeatured;
    if (options.search) where.name = { contains: options.search, mode: 'insensitive' };

    const [rows, total] = await Promise.all([
      this.client.brand.findMany({
        where,
        skip: (options.page - 1) * options.limit,
        take: options.limit,
        orderBy: { createdAt: 'desc' },
      }),
      this.client.brand.count({ where }),
    ]);
    return {
      items: rows.map((r) => this.toDomain(r as unknown as PrismaBrandRow)),
      total,
      page: options.page,
      limit: options.limit,
    };
  }

  async findByIds(ids: readonly string[]): Promise<readonly BrandEntity[]> {
    const rows = await this.client.brand.findMany({ where: { id: { in: [...ids] } } });
    return rows.map((r) => this.toDomain(r as unknown as PrismaBrandRow));
  }
}

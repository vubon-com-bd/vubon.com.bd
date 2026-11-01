/**
 * BrandPrismaMapper
 * @module product-service/infrastructure/persistence/prisma/mappers
 */
import { BrandEntity } from '../../../../domain/entities/brand.entity.js';
import { BrandVO } from '../../../../domain/value-objects/composites/brand.vo.js';
import { BrandIdVO } from '../../../../domain/value-objects/primitives/brand-id.vo.js';
import { BrandNameVO } from '../../../../domain/value-objects/primitives/brand-name.vo.js';
import { BrandSlugVO } from '../../../../domain/value-objects/primitives/brand-slug.vo.js';
import { BrandLogoVO } from '../../../../domain/value-objects/primitives/brand-logo.vo.js';

export interface PrismaBrandRow {
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
  version: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
  deletedBy: string | null;
}

export class BrandPrismaMapper {
  static toDomain(raw: PrismaBrandRow): BrandEntity {
    const vo = BrandVO.reconstitute({
      id: BrandIdVO.reconstitute(raw.id),
      name: BrandNameVO.reconstitute(raw.name),
      slug: BrandSlugVO.reconstitute(raw.slug),
      description: raw.description ?? undefined,
      logo: raw.logoUrl ? BrandLogoVO.reconstitute(raw.logoUrl) : undefined,
      bannerUrl: raw.bannerUrl ?? undefined,
      website: raw.website ?? undefined,
      status: raw.status,
      isFeatured: raw.isFeatured,
      productCount: raw.productCount,
      country: raw.country ?? undefined,
    });

    return BrandEntity.reconstitute({
      id: raw.id,
      createdAt: new Date(raw.createdAt).toISOString(),
      updatedAt: new Date(raw.updatedAt).toISOString(),
      deletedAt: raw.deletedAt ? new Date(raw.deletedAt).toISOString() : null,
      vo,
      deletedBy: raw.deletedBy ?? undefined,
      version: raw.version,
    });
  }

  static toPersistence(entity: BrandEntity): Record<string, unknown> {
    const vo = entity.vo;
    return {
      id: entity.id,
      name: vo.name.value,
      slug: vo.slug.value,
      description: vo.description ?? null,
      logoUrl: vo.logo?.value ?? null,
      bannerUrl: vo.bannerUrl ?? null,
      website: vo.website ?? null,
      status: vo.status,
      isFeatured: vo.isFeatured,
      productCount: vo.productCount,
      country: vo.country ?? null,
      version: entity.version,
      deletedBy: entity.deletedBy ?? null,
      deletedAt: entity.deletedAt ? new Date(entity.deletedAt) : null,
    };
  }
}

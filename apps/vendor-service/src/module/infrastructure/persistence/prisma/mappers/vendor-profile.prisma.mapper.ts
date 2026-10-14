/**
 * VendorProfilePrismaMapper — row ↔ domain entity
 * @module vendor-service/infrastructure/persistence/prisma/mappers
 */
import { VendorProfileEntity } from '../../../../domain/entities/vendor-profile.entity.js';
import { VendorProfileVO } from '../../../../domain/value-objects/composites/vendor-profile.vo.js';
import { VendorIdVO } from '../../../../domain/value-objects/primitives/vendor-id.vo.js';
import { VendorNameVO } from '../../../../domain/value-objects/primitives/vendor-name.vo.js';
import { VendorSlugVO } from '../../../../domain/value-objects/primitives/vendor-slug.vo.js';
import { BusinessDescriptionVO } from '../../../../domain/value-objects/primitives/business-description.vo.js';
import { RatingValueVO } from '../../../../domain/value-objects/primitives/rating-value.vo.js';

export interface VendorProfilePrismaRow {
  id: string;
  vendorId: string;
  name: string;
  slug: string;
  displayName: string;
  tagline: string | null;
  description: string | null;
  logoUrl: string | null;
  bannerUrl: string | null;
  website: string | null;
  socialLinks: unknown;
  rating: unknown;
  reviewCount: number;
  isFeatured: boolean;
  isVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

const toNum = (v: unknown): number => {
  if (typeof v === 'number') return v;
  if (typeof v === 'string') return Number(v);
  if (v && typeof v === 'object' && 'toNumber' in v) {
    return (v as { toNumber: () => number }).toNumber();
  }
  return Number(v ?? 0);
};

const toIso = (d: Date): string => new Date(d).toISOString();

export class VendorProfilePrismaMapper {
  static toDomain(raw: VendorProfilePrismaRow): VendorProfileEntity {
    const socialLinks = Array.isArray(raw.socialLinks)
      ? (raw.socialLinks as string[])
      : [];

    const vo = VendorProfileVO.reconstitute({
      vendorId: VendorIdVO.reconstitute(raw.vendorId),
      name: VendorNameVO.reconstitute(raw.name),
      slug: VendorSlugVO.reconstitute(raw.slug),
      displayName: raw.displayName,
      tagline: raw.tagline ?? undefined,
      description: raw.description
        ? BusinessDescriptionVO.reconstitute(raw.description)
        : undefined,
      logoUrl: raw.logoUrl ?? undefined,
      bannerUrl: raw.bannerUrl ?? undefined,
      website: raw.website ?? undefined,
      socialLinks,
      rating: RatingValueVO.reconstitute(toNum(raw.rating)),
      reviewCount: raw.reviewCount,
      isFeatured: raw.isFeatured,
      isVerified: raw.isVerified,
    });

    return VendorProfileEntity.reconstitute({
      id: raw.id,
      createdAt: toIso(raw.createdAt),
      updatedAt: toIso(raw.updatedAt),
      deletedAt: raw.deletedAt ? toIso(raw.deletedAt) : null,
      props: { vo },
    });
  }

  static toPersistence(entity: VendorProfileEntity): Record<string, unknown> {
    const vo = entity.vo;
    return {
      id: entity.id,
      vendorId: vo.vendorId.value,
      name: vo.name.value,
      slug: vo.slug.value,
      displayName: vo.displayName,
      tagline: vo.tagline ?? null,
      description: vo.description?.value ?? null,
      logoUrl: vo.logoUrl ?? null,
      bannerUrl: vo.bannerUrl ?? null,
      website: vo.website ?? null,
      socialLinks: [...vo.socialLinks],
      rating: vo.rating.rating,
      reviewCount: vo.reviewCount,
      isFeatured: vo.isFeatured,
      isVerified: vo.isVerified,
      updatedAt: new Date(entity.updatedAt),
      deletedAt: entity.deletedAt ? new Date(entity.deletedAt) : null,
    };
  }
}

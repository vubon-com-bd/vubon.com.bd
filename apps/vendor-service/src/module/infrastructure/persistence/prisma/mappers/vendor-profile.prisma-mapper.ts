/**
 * VendorProfilePrismaMapper
 * @module vendor-service/infrastructure/persistence/prisma/mappers
 */
import type { VendorProfile as PrismaVendorProfile } from '@prisma/client';
import { VendorProfileEntity } from '../../../../domain/entities/vendor-profile.entity.js';
import { BusinessDescriptionVO } from '../../../../domain/value-objects/primitives/business-description.vo.js';
import { VendorLogoVO } from '../../../../domain/value-objects/primitives/vendor-logo.vo.js';
import { VendorBannerVO } from '../../../../domain/value-objects/primitives/vendor-banner.vo.js';
import { VendorWebsiteVO } from '../../../../domain/value-objects/primitives/vendor-website.vo.js';

export class VendorProfilePrismaMapper {
  static toDomain(row: PrismaVendorProfile): VendorProfileEntity {
    return VendorProfileEntity.reconstitute({
      id: row.id,
      createdAt: row.createdAt.toISOString(),
      updatedAt: row.updatedAt.toISOString(),
      deletedAt: row.deletedAt?.toISOString() ?? null,
      props: {
        vendorId: row.vendorId,
        tagline: row.tagline ?? undefined,
        about: row.about ? BusinessDescriptionVO.create(row.about) : undefined,
        logo: row.logoUrl ? VendorLogoVO.create(row.logoUrl) : undefined,
        banner: row.bannerUrl ? VendorBannerVO.create(row.bannerUrl) : undefined,
        website: row.website ? VendorWebsiteVO.create(row.website) : undefined,
        socialLinks: (row.socialLinks as Record<string, string> | null) ?? {},
        categories: row.categories,
        languages: row.languages,
      },
    });
  }

  static toPersistence(entity: VendorProfileEntity): Record<string, unknown> {
    return {
      id: entity.id,
      vendorId: entity.vendorId,
      tagline: entity.tagline,
      about: entity.about?.value,
      logoUrl: entity.logo?.value,
      bannerUrl: entity.banner?.value,
      website: entity.website?.value,
      socialLinks: entity.socialLinks,
      categories: [...entity.categories],
      languages: [...entity.languages],
      createdAt: new Date(entity.createdAt),
      updatedAt: new Date(entity.updatedAt),
      deletedAt: entity.deletedAt ? new Date(entity.deletedAt) : null,
    };
  }
}

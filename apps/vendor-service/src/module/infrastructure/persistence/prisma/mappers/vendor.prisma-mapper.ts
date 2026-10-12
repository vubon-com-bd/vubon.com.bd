/**
 * VendorPrismaMapper — DB row ↔ VendorEntity
 * @module vendor-service/infrastructure/persistence/prisma/mappers
 */
import type { Vendor as PrismaVendor } from '@prisma/client';
import { VendorEntity } from '../../../../domain/entities/vendor.entity.js';
import { VendorStatusVO } from '../../../../domain/value-objects/primitives/vendor-status.vo.js';
import { VendorNameVO } from '../../../../domain/value-objects/primitives/vendor-name.vo.js';
import { VendorSlugVO } from '../../../../domain/value-objects/primitives/vendor-slug.vo.js';
import { VendorEmailVO } from '../../../../domain/value-objects/primitives/vendor-email.vo.js';
import { VendorTypeVO } from '../../../../domain/value-objects/primitives/vendor-type.vo.js';
import { VendorBusinessTypeVO } from '../../../../domain/value-objects/primitives/vendor-business-type.vo.js';
import { VendorTierVO } from '../../../../domain/value-objects/primitives/vendor-tier.vo.js';
import { RatingScoreVO } from '../../../../domain/value-objects/primitives/rating-score.vo.js';
import { BusinessDescriptionVO } from '../../../../domain/value-objects/primitives/business-description.vo.js';
import { VendorContactVO } from '../../../../domain/value-objects/composites/vendor-contact.vo.js';
import { VendorPhoneVO } from '../../../../domain/value-objects/primitives/vendor-phone.vo.js';
import { VendorWebsiteVO } from '../../../../domain/value-objects/primitives/vendor-website.vo.js';
import { VendorLocationVO } from '../../../../domain/value-objects/composites/vendor-location.vo.js';
import { VendorAddressVO } from '../../../../domain/value-objects/primitives/vendor-address.vo.js';
import { VendorDivisionVO } from '../../../../domain/value-objects/primitives/vendor-division.vo.js';
import { VendorDistrictVO } from '../../../../domain/value-objects/primitives/vendor-district.vo.js';
import { VendorUpazilaVO } from '../../../../domain/value-objects/primitives/vendor-upazila.vo.js';
import { PostalCodeVO } from '../../../../domain/value-objects/primitives/postal-code.vo.js';
import { VendorBrandingVO } from '../../../../domain/value-objects/composites/vendor-branding.vo.js';
import { VendorLogoVO } from '../../../../domain/value-objects/primitives/vendor-logo.vo.js';
import { VendorBannerVO } from '../../../../domain/value-objects/primitives/vendor-banner.vo.js';

export class VendorPrismaMapper {
  static toDomain(row: PrismaVendor): VendorEntity {
    const phoneVO = row.phone ? VendorPhoneVO.create(row.phone) : undefined;
    const websiteVO = row.website ? VendorWebsiteVO.create(row.website) : undefined;
    const contact = VendorContactVO.create({
      email: VendorEmailVO.create(row.email),
      phone: phoneVO,
      website: websiteVO,
    });

    const location = VendorLocationVO.create({
      address: VendorAddressVO.create({
        line1: row.addressLine1,
        line2: row.addressLine2 ?? undefined,
        area: row.area ?? undefined,
        upazila: row.upazila,
        district: row.district,
        division: row.division,
        postalCode: row.postalCode ?? undefined,
        country: row.country,
      }),
      division: VendorDivisionVO.create(row.division),
      district: VendorDistrictVO.create(row.district),
      upazila: VendorUpazilaVO.create(row.upazila),
      postalCode: row.postalCode ? PostalCodeVO.create(row.postalCode) : undefined,
    });

    const branding = VendorBrandingVO.create({
      logo: row.logoUrl ? VendorLogoVO.create(row.logoUrl) : undefined,
      banner: row.bannerUrl ? VendorBannerVO.create(row.bannerUrl) : undefined,
    });

    return VendorEntity.reconstitute({
      id: row.id,
      createdAt: row.createdAt.toISOString(),
      updatedAt: row.updatedAt.toISOString(),
      deletedAt: row.deletedAt?.toISOString() ?? null,
      version: row.version,
      status: VendorStatusVO.reconstitute(row.status),
      props: {
        userId: row.userId,
        name: VendorNameVO.create(row.name),
        slug: VendorSlugVO.reconstitute(row.slug),
        displayName: VendorNameVO.create(row.displayName),
        description: row.description ? BusinessDescriptionVO.create(row.description) : undefined,
        type: VendorTypeVO.create(row.type),
        businessType: VendorBusinessTypeVO.create(row.businessType),
        email: VendorEmailVO.create(row.email),
        contact,
        location,
        branding,
        tier: VendorTierVO.reconstitute(row.tier),
        rating: RatingScoreVO.create(Number(row.rating)),
        totalSales: Number(row.totalSales),
        totalOrders: row.totalOrders,
        isVerified: row.isVerified,
        isFeatured: row.isFeatured,
        joinedAt: row.joinedAt.toISOString(),
        approvedAt: row.approvedAt?.toISOString(),
      },
    });
  }
}

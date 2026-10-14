/**
 * VendorPrismaMapper — row ↔ domain entity
 * @module vendor-service/infrastructure/persistence/prisma/mappers
 */
import { VendorEntity } from '../../../../domain/entities/vendor.entity.js';
import { VendorVO } from '../../../../domain/value-objects/composites/vendor.vo.js';
import { VendorIdVO } from '../../../../domain/value-objects/primitives/vendor-id.vo.js';
import { UserIdVO } from '../../../../domain/value-objects/primitives/user-id.vo.js';
import { VendorNameVO } from '../../../../domain/value-objects/primitives/vendor-name.vo.js';
import { VendorSlugVO } from '../../../../domain/value-objects/primitives/vendor-slug.vo.js';
import { VendorStatusVO } from '../../../../domain/value-objects/primitives/vendor-status.vo.js';
import { VendorTypeVO } from '../../../../domain/value-objects/primitives/vendor-type.vo.js';
import { BusinessTypeVO } from '../../../../domain/value-objects/primitives/business-type.vo.js';
import { VendorTierVO } from '../../../../domain/value-objects/primitives/vendor-tier.vo.js';
import { BusinessDescriptionVO } from '../../../../domain/value-objects/primitives/business-description.vo.js';
import { RatingValueVO } from '../../../../domain/value-objects/primitives/rating-value.vo.js';

// ═══ Prisma Row Shape ═══
export interface VendorPrismaRow {
  id: string;
  userId: string;
  name: string;
  slug: string;
  displayName: string;
  description: string | null;
  type: string;
  businessType: string;
  status: string;
  tier: string;
  email: string;
  phone: string | null;
  website: string | null;
  logoUrl: string | null;
  bannerUrl: string | null;
  addressLine1: string;
  addressLine2: string | null;
  area: string | null;
  upazila: string;
  district: string;
  division: string;
  postalCode: string | null;
  country: string;
  rating: unknown;
  totalSales: unknown;
  totalOrders: number;
  isVerified: boolean;
  isFeatured: boolean;
  joinedAt: Date;
  approvedAt: Date | null;
  suspendedAt: Date | null;
  version: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

// ═══ Helpers ═══
const toNum = (v: unknown): number => {
  if (typeof v === 'number') return v;
  if (typeof v === 'string') return Number(v);
  if (v && typeof v === 'object' && 'toNumber' in v) {
    return (v as { toNumber: () => number }).toNumber();
  }
  return Number(v);
};

const toIso = (d: Date | null | undefined): string | undefined =>
  d ? new Date(d).toISOString() : undefined;

const toIsoRequired = (d: Date): string => new Date(d).toISOString();

// ═══ Mapper Class ═══
export class VendorPrismaMapper {
  /**
   * Prisma row → Domain Entity
   */
  static toDomain(raw: VendorPrismaRow): VendorEntity {
    const vo = VendorVO.reconstitute({
      id: VendorIdVO.reconstitute(raw.id),
      userId: UserIdVO.reconstitute(raw.userId),
      name: VendorNameVO.reconstitute(raw.name),
      slug: VendorSlugVO.reconstitute(raw.slug),
      displayName: raw.displayName,
      description: raw.description
        ? BusinessDescriptionVO.reconstitute(raw.description)
        : undefined,
      type: VendorTypeVO.reconstitute(raw.type),
      businessType: BusinessTypeVO.reconstitute(raw.businessType),
      status: VendorStatusVO.reconstitute(raw.status),
      tier: VendorTierVO.reconstitute(raw.tier),
      email: raw.email,
      phone: raw.phone ?? undefined,
      website: raw.website ?? undefined,
      logoUrl: raw.logoUrl ?? undefined,
      bannerUrl: raw.bannerUrl ?? undefined,
      rating: RatingValueVO.reconstitute(toNum(raw.rating)),
      totalSales: toNum(raw.totalSales),
      totalOrders: raw.totalOrders,
      isVerified: raw.isVerified,
      isFeatured: raw.isFeatured,
      joinedAt: toIsoRequired(raw.joinedAt),
      approvedAt: toIso(raw.approvedAt),
    });

    return VendorEntity.reconstitute({
      id: raw.id,
      createdAt: toIsoRequired(raw.createdAt),
      updatedAt: toIsoRequired(raw.updatedAt),
      deletedAt: raw.deletedAt ? toIsoRequired(raw.deletedAt) : null,
      version: raw.version,
      props: {
        vo,
        // Optional meta fields not in VO
        featuredAt: raw.isFeatured ? toIsoRequired(raw.updatedAt) : undefined,
        verifiedAt: raw.isVerified ? toIsoRequired(raw.updatedAt) : undefined,
      },
    });
  }

  /**
   * Domain Entity → Prisma persistence data
   */
  static toPersistence(entity: VendorEntity): Record<string, unknown> {
    const vo = entity.vo;
    return {
      id: entity.id,
      userId: vo.userId.value,
      name: vo.name.value,
      slug: vo.slug.value,
      displayName: vo.displayName,
      description: vo.description?.value ?? null,
      type: vo.type.value,
      businessType: vo.businessType.value,
      status: vo.status.value,
      tier: vo.tier.value,
      email: vo.email,
      phone: vo.phone ?? null,
      website: vo.website ?? null,
      logoUrl: vo.logoUrl ?? null,
      bannerUrl: vo.bannerUrl ?? null,
      // Note: address fields currently required at DB level
      // (addressLine1, upazila, district, division) — populated by separate address flow
      rating: vo.rating.rating,
      totalSales: vo.totalSales,
      totalOrders: vo.totalOrders,
      isVerified: vo.isVerified,
      isFeatured: vo.isFeatured,
      joinedAt: new Date(vo.joinedAt),
      approvedAt: vo.approvedAt ? new Date(vo.approvedAt) : null,
      version: entity.version,
      updatedAt: new Date(entity.updatedAt),
      deletedAt: entity.deletedAt ? new Date(entity.deletedAt) : null,
    };
  }
}

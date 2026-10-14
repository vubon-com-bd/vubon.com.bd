/**
 * VendorRatingPrismaMapper — row ↔ domain entity
 * @module vendor-service/infrastructure/persistence/prisma/mappers
 *
 * Note: Prisma row is `vendor_ratings` — likely a summary per vendor.
 * Distribution is stored as separate columns (count1..count5) or as JSON.
 */
import { VendorRatingEntity } from '../../../../domain/entities/vendor-rating.entity.js';
import { VendorRatingVO } from '../../../../domain/value-objects/composites/vendor-rating.vo.js';
import { VendorIdVO } from '../../../../domain/value-objects/primitives/vendor-id.vo.js';
import { RatingValueVO } from '../../../../domain/value-objects/primitives/rating-value.vo.js';

export interface VendorRatingPrismaRow {
  id: string;
  vendorId: string;
  overall: unknown;
  productQuality: unknown;
  shippingSpeed: unknown;
  customerService: unknown;
  communication: unknown;
  valueForMoney: unknown;
  packaging: unknown;
  totalReviews: number;
  recentReviews: number;
  distribution: unknown; // JSON
  lastUpdatedAt: Date;
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

const parseDistribution = (v: unknown): Record<1 | 2 | 3 | 4 | 5, number> => {
  const empty = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 } as Record<1 | 2 | 3 | 4 | 5, number>;
  if (!v || typeof v !== 'object') return empty;
  const obj = v as Record<string, unknown>;
  return {
    1: toNum(obj['1'] ?? 0),
    2: toNum(obj['2'] ?? 0),
    3: toNum(obj['3'] ?? 0),
    4: toNum(obj['4'] ?? 0),
    5: toNum(obj['5'] ?? 0),
  };
};

export class VendorRatingPrismaMapper {
  static toDomain(raw: VendorRatingPrismaRow): VendorRatingEntity {
    const vo = VendorRatingVO.reconstitute({
      vendorId: VendorIdVO.reconstitute(raw.vendorId),
      overall: RatingValueVO.reconstitute(toNum(raw.overall)),
      productQuality: RatingValueVO.reconstitute(toNum(raw.productQuality)),
      shippingSpeed: RatingValueVO.reconstitute(toNum(raw.shippingSpeed)),
      customerService: RatingValueVO.reconstitute(toNum(raw.customerService)),
      communication: RatingValueVO.reconstitute(toNum(raw.communication)),
      valueForMoney: RatingValueVO.reconstitute(toNum(raw.valueForMoney)),
      packaging: RatingValueVO.reconstitute(toNum(raw.packaging)),
      totalReviews: raw.totalReviews,
      recentReviews: raw.recentReviews,
      distribution: parseDistribution(raw.distribution),
      lastUpdatedAt: new Date(raw.lastUpdatedAt).toISOString(),
    });

    return VendorRatingEntity.reconstitute({
      id: raw.id,
      createdAt: new Date(raw.createdAt).toISOString(),
      updatedAt: new Date(raw.updatedAt).toISOString(),
      deletedAt: raw.deletedAt ? new Date(raw.deletedAt).toISOString() : null,
      props: { vo },
    });
  }

  static toPersistence(entity: VendorRatingEntity): Record<string, unknown> {
    const vo = entity.vo;
    return {
      id: entity.id,
      vendorId: vo.vendorId.value,
      overall: vo.overall.rating,
      productQuality: vo.productQuality.rating,
      shippingSpeed: vo.shippingSpeed.rating,
      customerService: vo.customerService.rating,
      communication: vo.communication.rating,
      valueForMoney: vo.valueForMoney.rating,
      packaging: vo.packaging.rating,
      totalReviews: vo.totalReviews,
      recentReviews: vo.recentReviews,
      distribution: { ...vo.distribution },
      lastUpdatedAt: new Date(vo.lastUpdatedAt),
      updatedAt: new Date(entity.updatedAt),
      deletedAt: entity.deletedAt ? new Date(entity.deletedAt) : null,
    };
  }
}

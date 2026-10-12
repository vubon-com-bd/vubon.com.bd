/**
 * VendorRatingPrismaMapper
 * @module vendor-service/infrastructure/persistence/prisma/mappers
 */
import type { VendorRating as PrismaVendorRating } from '@prisma/client';
import { VendorRatingEntity } from '../../../../domain/entities/vendor-rating.entity.js';
import type { RatingCategoryScore } from '../../../../domain/entities/vendor-rating.entity.js';
import { RatingScoreVO } from '../../../../domain/value-objects/primitives/rating-score.vo.js';
import { VendorRatingCategoryVO } from '../../../../domain/value-objects/primitives/vendor-rating-category.vo.js';

interface RawDistribution {
  '1': number;
  '2': number;
  '3': number;
  '4': number;
  '5': number;
}

interface RawCategory {
  category: string;
  score: number;
  count: number;
}

export class VendorRatingPrismaMapper {
  static toDomain(row: PrismaVendorRating): VendorRatingEntity {
    const dist = (row.distribution as unknown as RawDistribution) ?? { '1': 0, '2': 0, '3': 0, '4': 0, '5': 0 };
    const rawCategories = (row.categories as unknown as RawCategory[]) ?? [];
    const categories: RatingCategoryScore[] = rawCategories.map((c) => ({
      category: VendorRatingCategoryVO.create(c.category),
      score: c.score,
      count: c.count,
    }));

    return VendorRatingEntity.reconstitute({
      id: row.id,
      createdAt: row.createdAt.toISOString(),
      updatedAt: row.updatedAt.toISOString(),
      deletedAt: row.deletedAt?.toISOString() ?? null,
      version: row.version,
      props: {
        vendorId: row.vendorId,
        overall: RatingScoreVO.create(Number(row.overall)),
        totalReviews: row.totalReviews,
        distribution: {
          '1': dist['1'],
          '2': dist['2'],
          '3': dist['3'],
          '4': dist['4'],
          '5': dist['5'],
        },
        categories,
        recentWeight: Number(row.recentWeight),
      },
    });
  }

  static toPersistence(entity: VendorRatingEntity): Record<string, unknown> {
    const dist = entity.distribution;
    const categories: RawCategory[] = entity.categories.map((c) => ({
      category: c.category.value,
      score: c.score,
      count: c.count,
    }));
    return {
      id: entity.id,
      vendorId: entity.vendorId,
      overall: entity.overall.value,
      totalReviews: entity.totalReviews,
      distribution: dist,
      categories,
      recentWeight: entity.recentWeight,
      createdAt: new Date(entity.createdAt),
      updatedAt: new Date(entity.updatedAt),
      deletedAt: entity.deletedAt ? new Date(entity.deletedAt) : null,
    };
  }
}

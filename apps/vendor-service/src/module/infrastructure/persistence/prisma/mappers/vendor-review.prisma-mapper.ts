/**
 * VendorReviewPrismaMapper
 * @module vendor-service/infrastructure/persistence/prisma/mappers
 */
import type { VendorReview as PrismaVendorReview } from '@prisma/client';
import { VendorReviewEntity } from '../../../../domain/entities/vendor-review.entity.js';
import type { ReviewCategoryScore } from '../../../../domain/entities/vendor-review.entity.js';
import { RatingScoreVO } from '../../../../domain/value-objects/primitives/rating-score.vo.js';
import { VendorReviewStatusVO } from '../../../../domain/value-objects/primitives/vendor-review-status.vo.js';
import { VendorReviewCategoryVO } from '../../../../domain/value-objects/primitives/vendor-review-category.vo.js';

interface RawCategory {
  category: string;
  score: number;
}

export class VendorReviewPrismaMapper {
  static toDomain(row: PrismaVendorReview): VendorReviewEntity {
    const rawCategories = (row.categories as unknown as RawCategory[]) ?? [];
    const categories: ReviewCategoryScore[] = rawCategories.map((c) => ({
      category: VendorReviewCategoryVO.create(c.category),
      score: c.score,
    }));

    return VendorReviewEntity.reconstitute({
      id: row.id,
      createdAt: row.createdAt.toISOString(),
      updatedAt: row.updatedAt.toISOString(),
      deletedAt: row.deletedAt?.toISOString() ?? null,
      version: row.version,
      props: {
        vendorId: row.vendorId,
        userId: row.userId,
        orderId: row.orderId,
        rating: RatingScoreVO.create(row.rating),
        comment: row.comment ?? undefined,
        categories,
        status: VendorReviewStatusVO.create(row.status),
        isVerifiedPurchase: row.isVerifiedPurchase,
        flagCount: row.flagCount,
        hiddenReason: row.hiddenReason ?? undefined,
        createdAt: row.createdAt.toISOString(),
      },
    });
  }

  static toPersistence(entity: VendorReviewEntity): Record<string, unknown> {
    const categories: RawCategory[] = entity.categories.map((c) => ({
      category: c.category.value,
      score: c.score,
    }));
    return {
      id: entity.id,
      vendorId: entity.vendorId,
      userId: entity.userId,
      orderId: entity.orderId,
      rating: entity.rating.value,
      comment: entity.comment,
      categories,
      status: entity.status.value,
      isVerifiedPurchase: entity.isVerifiedPurchase,
      flagCount: entity.flagCount,
      hiddenReason: entity.hiddenReason,
      createdAt: new Date(entity.createdAt),
      updatedAt: new Date(entity.updatedAt),
      deletedAt: entity.deletedAt ? new Date(entity.deletedAt) : null,
    };
  }
}

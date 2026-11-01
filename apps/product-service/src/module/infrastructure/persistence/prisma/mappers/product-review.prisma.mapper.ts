/**
 * ProductReviewPrismaMapper
 * @module product-service/infrastructure/persistence/prisma/mappers
 */
import { ProductReviewEntity } from '../../../../domain/entities/product-review.entity.js';
import { ProductReviewVO } from '../../../../domain/value-objects/composites/product-review.vo.js';
import { ReviewIdVO } from '../../../../domain/value-objects/primitives/review-id.vo.js';
import { ProductIdVO } from '../../../../domain/value-objects/primitives/product-id.vo.js';
import { ReviewRatingVO } from '../../../../domain/value-objects/primitives/review-rating.vo.js';
import { ReviewStatusVO } from '../../../../domain/value-objects/primitives/review-status.vo.js';
import { ReviewContentVO } from '../../../../domain/value-objects/primitives/review-content.vo.js';

export interface PrismaProductReviewRow {
  id: string;
  productId: string;
  userId: string;
  orderId: string | null;
  rating: number;
  title: string | null;
  comment: string | null;
  images: string[];
  status: string;
  isVerifiedPurchase: boolean;
  helpfulCount: number;
  reportCount: number;
  version: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
  deletedBy: string | null;
}

export class ProductReviewPrismaMapper {
  static toDomain(raw: PrismaProductReviewRow): ProductReviewEntity {
    const vo = ProductReviewVO.reconstitute({
      id: ReviewIdVO.reconstitute(raw.id),
      productId: ProductIdVO.reconstitute(raw.productId),
      userId: raw.userId,
      orderId: raw.orderId ?? undefined,
      rating: ReviewRatingVO.reconstitute(raw.rating),
      title: raw.title ?? undefined,
      content: raw.comment ? ReviewContentVO.reconstitute(raw.comment) : undefined,
      images: raw.images,
      status: ReviewStatusVO.reconstitute(raw.status),
      isVerifiedPurchase: raw.isVerifiedPurchase,
      helpfulCount: raw.helpfulCount,
      reportCount: raw.reportCount,
      createdAt: new Date(raw.createdAt).toISOString(),
    });

    return ProductReviewEntity.reconstitute({
      id: raw.id,
      createdAt: new Date(raw.createdAt).toISOString(),
      updatedAt: new Date(raw.updatedAt).toISOString(),
      deletedAt: raw.deletedAt ? new Date(raw.deletedAt).toISOString() : null,
      vo,
      deletedBy: raw.deletedBy ?? undefined,
      version: raw.version,
    });
  }

  static toPersistence(entity: ProductReviewEntity): Record<string, unknown> {
    const vo = entity.vo;
    return {
      id: entity.id,
      productId: vo.productId.value,
      userId: vo.userId,
      orderId: vo.orderId ?? null,
      rating: vo.rating.value,
      title: vo.title ?? null,
      comment: vo.content?.value ?? null,
      images: vo.images ? [...vo.images] : [],
      status: vo.status.value,
      isVerifiedPurchase: vo.isVerifiedPurchase,
      helpfulCount: vo.helpfulCount,
      reportCount: vo.reportCount,
      version: entity.version,
      deletedBy: entity.deletedBy ?? null,
      deletedAt: entity.deletedAt ? new Date(entity.deletedAt) : null,
    };
  }
}

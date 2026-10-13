/**
 * ReviewMapper — Entity → Response DTO
 * @module product-service/application/mappers
 */
import type { ProductReviewEntity } from '../../domain/entities/product-review.entity.js';
import type { ReviewStatusValue } from '@vubon/shared-types/business/product';
import type {
  ReviewResponseDTO,
  ReviewPublicResponseDTO,
  ReviewSummaryResponseDTO,
  ReviewListResponseDTO,
  ReviewStatsResponseDTO,
  RatingDistributionDTO,
} from '../dtos/responses/review-response.dto.js';

export class ReviewMapper {
  static toResponse(entity: ProductReviewEntity): ReviewResponseDTO {
    const vo = entity.vo;
    return {
      id: entity.id,
      productId: vo.productId.value,
      userId: vo.userId,
      orderId: vo.orderId,
      rating: vo.rating.value,
      title: vo.title,
      comment: vo.content?.value,
      images: vo.images ? [...vo.images] : undefined,
      status: vo.status.value as ReviewStatusValue,
      isVerifiedPurchase: vo.isVerifiedPurchase,
      helpfulCount: vo.helpfulCount,
      reportCount: vo.reportCount,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    };
  }

  static toPublicResponse(entity: ProductReviewEntity): ReviewPublicResponseDTO {
    const vo = entity.vo;
    return {
      id: entity.id,
      userId: vo.userId,
      rating: vo.rating.value,
      title: vo.title,
      comment: vo.content?.value,
      images: vo.images ? [...vo.images] : undefined,
      isVerifiedPurchase: vo.isVerifiedPurchase,
      helpfulCount: vo.helpfulCount,
      createdAt: entity.createdAt,
    };
  }

  static toSummary(entity: ProductReviewEntity): ReviewSummaryResponseDTO {
    return {
      id: entity.id,
      userId: entity.userId,
      rating: entity.rating.value,
      title: entity.vo.title,
      createdAt: entity.createdAt,
    };
  }

  static toListResponse(
    entities: readonly ProductReviewEntity[],
    total: number,
    page: number,
    limit: number,
  ): ReviewListResponseDTO {
    return {
      items: entities.map((e) => this.toPublicResponse(e)),
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  static toStatsResponse(stats: {
    productId: string;
    totalReviews: number;
    averageRating: number;
    ratingDistribution: RatingDistributionDTO;
    verifiedCount: number;
    approvedCount: number;
    pendingCount: number;
  }): ReviewStatsResponseDTO {
    return { ...stats };
  }
}

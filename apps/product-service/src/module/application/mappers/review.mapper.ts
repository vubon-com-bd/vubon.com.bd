/**
 * ReviewMapper
 */
import { ProductReviewEntity } from '../../domain/entities/product-review.entity.js';
import type { ReviewResponseDTO } from '../dtos/responses/review-response.dto.js';
import type { ReviewId, ProductId, UserId, Url } from '@vubon/shared-types/common';

export class ReviewMapper {
  static toResponse(r: ProductReviewEntity): ReviewResponseDTO {
    return {
      id: r.id as ReviewId,
      productId: r.productId.value as ProductId,
      userId: r.userId as UserId,
      rating: r.rating.value,
      title: r.title,
      comment: r.comment.value || undefined,
      images: r.images as readonly Url[],
      status: r.status,
      isVerifiedPurchase: r.isVerifiedPurchase,
      helpfulCount: r.helpfulCount,
      reportCount: r.reportCount,
      createdAt: r.createdAt,
      updatedAt: r.updatedAt,
    };
  }

  static toResponseList(reviews: readonly ProductReviewEntity[]): readonly ReviewResponseDTO[] {
    return reviews.map((r) => ReviewMapper.toResponse(r));
  }
}

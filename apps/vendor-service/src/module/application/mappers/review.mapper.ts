/**
 * ReviewMapper
 * @module vendor-service/application/mappers
 */
import type { VendorReviewEntity } from '../../domain/entities/vendor-review.entity.js';
import type {
  ReviewResponseDTO,
  ReviewPublicResponseDTO,
  ReviewSummaryResponseDTO,
  ReviewListResponseDTO,
} from '../dtos/responses/review-response.dto.js';

export class ReviewMapper {
  static toResponse(entity: VendorReviewEntity): ReviewResponseDTO {
    return {
      id: entity.id,
      vendorId: entity.vendorId.value,
      userId: entity.userId.value,
      orderId: entity.orderId?.value,
      productId: entity.productId?.value,
      rating: entity.rating.rating,
      content: entity.content.value,
      title: entity.title,
      status: entity.status.value,
      isVerifiedPurchase: entity.isVerifiedPurchase,
      helpfulCount: entity.helpfulCount,
      flaggedCount: entity.flaggedCount,
      vendorReply: entity.vendorReply,
      vendorRepliedAt: entity.vendorRepliedAt,
      submittedAt: entity.submittedAt,
      moderatedAt: entity.moderatedAt,
      moderatedBy: entity.moderatedBy,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    };
  }

  static toPublicResponse(entity: VendorReviewEntity): ReviewPublicResponseDTO {
    return {
      id: entity.id,
      rating: entity.rating.rating,
      content: entity.content.value,
      title: entity.title,
      isVerifiedPurchase: entity.isVerifiedPurchase,
      helpfulCount: entity.helpfulCount,
      vendorReply: entity.vendorReply,
      submittedAt: entity.submittedAt,
    };
  }

  static toSummary(entity: VendorReviewEntity): ReviewSummaryResponseDTO {
    return {
      id: entity.id,
      rating: entity.rating.rating,
      title: entity.title,
      status: entity.status.value,
      submittedAt: entity.submittedAt,
    };
  }

  static toListResponse(
    entities: readonly VendorReviewEntity[],
    total: number,
    page: number,
    limit: number,
  ): ReviewListResponseDTO {
    return {
      items: entities.map((e) => this.toSummary(e)),
      total,
      page,
      limit,
      totalPages: Math.ceil(total / Math.max(1, limit)),
    };
  }
}

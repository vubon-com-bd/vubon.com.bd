/**
 * ReviewControllerMapper
 */
import type { ReviewResponseDTO as AppReviewDTO } from '../../application/dtos/responses/review-response.dto.js';
import { ReviewResponseDTO } from '../dtos/responses/review.response.dto.js';

export class ReviewControllerMapper {
  static toHttp(dto: AppReviewDTO): ReviewResponseDTO {
    const out = new ReviewResponseDTO();
    Object.assign(out, {
      id: String(dto.id),
      productId: String(dto.productId),
      userId: String(dto.userId),
      userName: dto.userName,
      userAvatar: dto.userAvatar ? String(dto.userAvatar) : undefined,
      rating: dto.rating,
      title: dto.title,
      comment: dto.comment,
      images: dto.images ? dto.images.map((i) => String(i)) : undefined,
      status: dto.status,
      isVerifiedPurchase: dto.isVerifiedPurchase,
      helpfulCount: dto.helpfulCount,
      reportCount: dto.reportCount,
      createdAt: dto.createdAt,
      updatedAt: dto.updatedAt,
    });
    return out;
  }

  static toHttpList(dtos: readonly AppReviewDTO[]): readonly ReviewResponseDTO[] {
    return dtos.map((d) => ReviewControllerMapper.toHttp(d));
  }
}

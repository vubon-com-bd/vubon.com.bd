/**
 * ReviewService
 */
import { Injectable, Inject } from '@nestjs/common';
import { randomUUID } from 'node:crypto';
import type { IReviewService } from '../interfaces/review.service.interface.js';
import { REVIEW_REPOSITORY, type ReviewRepository } from '../../../domain/repositories/review.repository.interface.js';
import { ProductReviewEntity } from '../../../domain/entities/product-review.entity.js';
import { ProductIdVO } from '../../../domain/value-objects/primitives/product-id.vo.js';
import { ReviewRatingVO } from '../../../domain/value-objects/primitives/review-rating.vo.js';
import { ReviewCommentVO } from '../../../domain/value-objects/primitives/review-comment.vo.js';
import { ReviewMapper } from '../../mappers/review.mapper.js';
import { REVIEW_STATUS } from '@vubon/shared-constants/business/product';
import type { SubmitReviewRequestDTO } from '../../dtos/requests/review/submit-review.dto.js';
import type { UpdateReviewRequestDTO } from '../../dtos/requests/review/update-review.dto.js';
import type { ReviewResponseDTO, ReviewStatsResponseDTO } from '../../dtos/responses/review-response.dto.js';
import { ReviewNotFoundApplicationError, ReviewAlreadySubmittedApplicationError } from '../../errors/review.errors.js';

@Injectable()
export class ReviewService implements IReviewService {
  constructor(
    @Inject(REVIEW_REPOSITORY) private readonly reviewRepo: ReviewRepository,
  ) {}

  async submit(dto: SubmitReviewRequestDTO): Promise<ReviewResponseDTO> {
    const productIdVO = ProductIdVO.create(dto.productId);
    if (await this.reviewRepo.existsByUserAndProduct(dto.userId, productIdVO)) {
      throw new ReviewAlreadySubmittedApplicationError(dto.productId, dto.userId);
    }
    const now = new Date().toISOString();
    const review = ProductReviewEntity.create({
      id: randomUUID(),
      now,
      props: {
        productId: productIdVO,
        userId: dto.userId,
        orderId: undefined,
        rating: ReviewRatingVO.create(dto.rating),
        title: dto.title,
        comment: dto.comment ? ReviewCommentVO.create(dto.comment) : ReviewCommentVO.empty(),
        images: dto.images ?? [],
        status: REVIEW_STATUS.PENDING,
        isVerifiedPurchase: dto.isVerifiedPurchase ?? false,
        helpfulCount: 0,
        reportCount: 0,
        createdAt: now,
        updatedAt: now,
      },
    });
    await this.reviewRepo.save(review);
    return ReviewMapper.toResponse(review);
  }

  async update(dto: UpdateReviewRequestDTO): Promise<ReviewResponseDTO> {
    const review = await this.reviewRepo.findById(dto.reviewId);
    if (!review) throw new ReviewNotFoundApplicationError(dto.reviewId);
    review.updateContent({
      rating: dto.rating !== undefined ? ReviewRatingVO.create(dto.rating) : undefined,
      title: dto.title,
      comment: dto.comment !== undefined ? ReviewCommentVO.create(dto.comment) : undefined,
      images: dto.images,
      now: new Date().toISOString(),
    });
    await this.reviewRepo.save(review);
    return ReviewMapper.toResponse(review);
  }

  async approve(reviewId: string, moderatorId: string): Promise<ReviewResponseDTO> {
    const review = await this.reviewRepo.findById(reviewId);
    if (!review) throw new ReviewNotFoundApplicationError(reviewId);
    review.approve(moderatorId);
    await this.reviewRepo.save(review);
    return ReviewMapper.toResponse(review);
  }

  async reject(reviewId: string, moderatorId: string, reason: string): Promise<ReviewResponseDTO> {
    const review = await this.reviewRepo.findById(reviewId);
    if (!review) throw new ReviewNotFoundApplicationError(reviewId);
    review.reject(moderatorId, reason);
    await this.reviewRepo.save(review);
    return ReviewMapper.toResponse(review);
  }

  async remove(reviewId: string, actorId: string): Promise<void> {
    const review = await this.reviewRepo.findById(reviewId);
    if (!review) throw new ReviewNotFoundApplicationError(reviewId);
    review.softDelete(actorId);
    await this.reviewRepo.save(review);
  }

  async markHelpful(reviewId: string, userId: string): Promise<ReviewResponseDTO> {
    const review = await this.reviewRepo.findById(reviewId);
    if (!review) throw new ReviewNotFoundApplicationError(reviewId);
    review.markHelpful(userId);
    await this.reviewRepo.save(review);
    return ReviewMapper.toResponse(review);
  }

  async report(reviewId: string, userId: string, reason: string): Promise<ReviewResponseDTO> {
    const review = await this.reviewRepo.findById(reviewId);
    if (!review) throw new ReviewNotFoundApplicationError(reviewId);
    review.report(userId, reason);
    await this.reviewRepo.save(review);
    return ReviewMapper.toResponse(review);
  }

  async listByProduct(productId: string, page: number, limit: number): Promise<{ items: readonly ReviewResponseDTO[]; total: number }> {
    const result = await this.reviewRepo.findPaginatedByProduct(ProductIdVO.create(productId), { page, limit });
    return { items: ReviewMapper.toResponseList(result.items), total: result.total };
  }

  async statsByProduct(productId: string): Promise<ReviewStatsResponseDTO | null> {
    const agg = await this.reviewRepo.aggregateRatings(ProductIdVO.create(productId));
    if (!agg) return null;
    return {
      productId: agg.productId as unknown as import('@vubon/shared-types/common').ProductId,
      totalReviews: agg.totalReviews,
      averageRating: agg.averageRating,
      ratingDistribution: {
        1: agg.distribution[1],
        2: agg.distribution[2],
        3: agg.distribution[3],
        4: agg.distribution[4],
        5: agg.distribution[5],
      },
    };
  }
}

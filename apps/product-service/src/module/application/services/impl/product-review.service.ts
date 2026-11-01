/**
 * ProductReviewService — orchestrates review use cases
 * @module product-service/application/services/impl
 *
 * Real business logic:
 *  - Duplicate review prevention
 *  - Moderation workflow (approve/reject)
 *  - Helpful / report tracking
 *  - Rating aggregation via domain service
 */
import { Inject, Injectable, Logger } from '@nestjs/common';
import { randomUUID } from 'node:crypto';

import {
  REVIEW_REPOSITORY,
  type ProductReviewRepository,
  type ReviewListFilter,
  type ReviewListOptions,
} from '../../../domain/repositories/product-review.repository.interface.js';
import { ProductReviewEntity } from '../../../domain/entities/product-review.entity.js';
import { ProductReviewVO } from '../../../domain/value-objects/composites/product-review.vo.js';
import { ReviewIdVO } from '../../../domain/value-objects/primitives/review-id.vo.js';
import { ProductIdVO } from '../../../domain/value-objects/primitives/product-id.vo.js';
import { ReviewRatingVO } from '../../../domain/value-objects/primitives/review-rating.vo.js';
import { ReviewStatusVO } from '../../../domain/value-objects/primitives/review-status.vo.js';
import { ReviewContentVO } from '../../../domain/value-objects/primitives/review-content.vo.js';
import { DomainEventBridgeService } from '@vubon/shared-kernel/infrastructure/messaging/event-bridge';

import { ReviewMapper } from '../../mappers/review.mapper.js';
import type {
  IProductReviewService,
  ReviewListOptionsDTO,
  ReviewListFilterDTO,
} from '../interfaces/product-review.service.interface.js';
import {
  ReviewNotFoundApplicationError,
  ReviewSubmitError,
  ReviewModerationError,
  DuplicateReviewApplicationError,
} from '../../errors/review.errors.js';
import type {
  SubmitReviewCommandDTO,
  UpdateReviewRequestDTO,
  DeleteReviewRequestDTO,
  ApproveReviewRequestDTO,
  RejectReviewRequestDTO,
} from '../../dtos/requests/review/index.js';
import type {
  ReviewResponseDTO,
  ReviewPublicResponseDTO,
  ReviewSummaryResponseDTO,
  ReviewListResponseDTO,
  ReviewStatsResponseDTO,
  RatingDistributionDTO,
} from '../../dtos/responses/review-response.dto.js';

@Injectable()
export class ProductReviewService implements IProductReviewService {
  private readonly logger = new Logger(ProductReviewService.name);

  constructor(
    @Inject(REVIEW_REPOSITORY)
    private readonly repo: ProductReviewRepository,
    private readonly eventBridge: DomainEventBridgeService,
  ) {}

  // ═══════════════ COMMANDS ═══════════════
  async submit(dto: SubmitReviewCommandDTO): Promise<ReviewResponseDTO> {
    // ─── Duplicate check ───
    if (await this.repo.existsByProductAndUser(ProductIdVO.create(dto.productId), dto.userId)) {
      throw new DuplicateReviewApplicationError(dto.productId, dto.userId);
    }

    const now = new Date().toISOString();
    const id = randomUUID();

    try {
      const vo = ProductReviewVO.create({
        id: ReviewIdVO.create(id),
        productId: ProductIdVO.create(dto.productId),
        userId: dto.userId,
        orderId: dto.orderId,
        rating: ReviewRatingVO.create(dto.rating),
        title: dto.title,
        content: dto.comment ? ReviewContentVO.create(dto.comment) : undefined,
        images: dto.images,
        status: ReviewStatusVO.pending(),
        isVerifiedPurchase: dto.isVerifiedPurchase ?? false,
        helpfulCount: 0,
        reportCount: 0,
        createdAt: now,
      });

      const entity = ProductReviewEntity.create({ id, vo, now });
      const saved = await this.repo.save(entity);
      await this.eventBridge.publishFromEntity(saved);

      this.logger.log(`Review ${saved.id} submitted for product ${dto.productId}`);
      return ReviewMapper.toResponse(saved);
    } catch (e) {
      const msg = e instanceof Error ? e.message : 'Unknown';
      throw new ReviewSubmitError(msg);
    }
  }

  async update(dto: UpdateReviewRequestDTO): Promise<ReviewResponseDTO> {
    const entity = await this.load(dto.reviewId);
    const current = entity.vo.value;

    const nextVo = ProductReviewVO.create({
      ...current,
      rating: dto.rating !== undefined ? ReviewRatingVO.create(dto.rating) : current.rating,
      title: dto.title !== undefined ? dto.title : current.title,
      content: dto.comment !== undefined
        ? (dto.comment ? ReviewContentVO.create(dto.comment) : undefined)
        : current.content,
      images: dto.images !== undefined ? dto.images : current.images,
    });

    const updated = ProductReviewEntity.reconstitute({
      id: entity.id,
      createdAt: entity.createdAt,
      updatedAt: new Date().toISOString(),
      vo: nextVo,
      version: entity.version,
    });

    const saved = await this.repo.save(updated);
    await this.eventBridge.publishFromEntity(saved);
    this.logger.log(`Review ${saved.id} updated`);
    return ReviewMapper.toResponse(saved);
  }

  async delete(
    dto: DeleteReviewRequestDTO,
  ): Promise<{ readonly success: true; readonly reviewId: string }> {
    const entity = await this.load(dto.reviewId);

    try {
      entity.delete(dto.actorId);
    } catch (e) {
      const msg = e instanceof Error ? e.message : 'Unknown';
      throw new ReviewModerationError(dto.reviewId, msg);
    }

    const saved = await this.repo.save(entity);
    await this.eventBridge.publishFromEntity(saved);
    this.logger.log(`Review ${saved.id} deleted`);
    return { success: true, reviewId: saved.id };
  }

  async approve(dto: ApproveReviewRequestDTO): Promise<ReviewResponseDTO> {
    const entity = await this.load(dto.reviewId);

    try {
      entity.approve(dto.approvedBy);
    } catch (e) {
      const msg = e instanceof Error ? e.message : 'Unknown';
      throw new ReviewModerationError(dto.reviewId, msg);
    }

    const saved = await this.repo.save(entity);
    await this.eventBridge.publishFromEntity(saved);
    this.logger.log(`Review ${saved.id} approved`);
    return ReviewMapper.toResponse(saved);
  }

  async reject(dto: RejectReviewRequestDTO): Promise<ReviewResponseDTO> {
    const entity = await this.load(dto.reviewId);

    try {
      entity.reject(dto.reason);
    } catch (e) {
      const msg = e instanceof Error ? e.message : 'Unknown';
      throw new ReviewModerationError(dto.reviewId, msg);
    }

    const saved = await this.repo.save(entity);
    await this.eventBridge.publishFromEntity(saved);
    this.logger.log(`Review ${saved.id} rejected: ${dto.reason}`);
    return ReviewMapper.toResponse(saved);
  }

  async markHelpful(reviewId: string, _userId: string): Promise<ReviewResponseDTO> {
    const entity = await this.load(reviewId);
    entity.markHelpful();
    const saved = await this.repo.save(entity);
    await this.eventBridge.publishFromEntity(saved);
    this.logger.log(`Review ${saved.id} marked helpful`);
    return ReviewMapper.toResponse(saved);
  }

  async report(reviewId: string, reason: string, _userId: string): Promise<ReviewResponseDTO> {
    const entity = await this.load(reviewId);
    entity.report(reason);
    const saved = await this.repo.save(entity);
    await this.eventBridge.publishFromEntity(saved);
    this.logger.log(`Review ${saved.id} reported: ${reason}`);
    return ReviewMapper.toResponse(saved);
  }

  // ═══════════════ QUERIES ═══════════════
  async getById(id: string): Promise<ReviewResponseDTO> {
    const entity = await this.load(id);
    return ReviewMapper.toResponse(entity);
  }

  async getPublic(id: string): Promise<ReviewPublicResponseDTO> {
    const entity = await this.load(id);
    return ReviewMapper.toPublicResponse(entity);
  }

  async listByProduct(productId: string): Promise<readonly ReviewSummaryResponseDTO[]> {
    const entities = await this.repo.findApprovedByProduct(ProductIdVO.create(productId));
    return entities.map((e) => ReviewMapper.toSummary(e));
  }

  async list(options: ReviewListOptionsDTO): Promise<ReviewListResponseDTO> {
    const result = await this.repo.findPaginated({
      page: options.page,
      limit: options.limit,
      sortBy: options.sortBy,
      sortDir: options.sortDir,
      filter: options.filter as ReviewListFilter | undefined,
    } as ReviewListOptions);
    return ReviewMapper.toListResponse(result.items, result.total, result.page, result.limit);
  }

  async listPending(): Promise<readonly ReviewSummaryResponseDTO[]> {
    const entities = await this.repo.findByStatus('pending');
    return entities.map((e) => ReviewMapper.toSummary(e));
  }

  async getStats(productId: string): Promise<ReviewStatsResponseDTO> {
    const summary = await this.repo.getSummary(ProductIdVO.create(productId));
    return ReviewMapper.toStatsResponse({
      productId: summary.productId,
      totalReviews: summary.totalReviews,
      averageRating: summary.averageRating,
      ratingDistribution: summary.ratingDistribution as RatingDistributionDTO,
      verifiedCount: summary.verifiedCount,
      approvedCount: summary.approvedCount,
      pendingCount: summary.pendingCount,
    });
  }

  // ═══════════════ HELPERS ═══════════════
  private async load(id: string): Promise<ProductReviewEntity> {
    const vo = ReviewIdVO.create(id);
    const entity = await this.repo.findByIdVO(vo);
    if (!entity) throw new ReviewNotFoundApplicationError(id);
    return entity;
  }
}

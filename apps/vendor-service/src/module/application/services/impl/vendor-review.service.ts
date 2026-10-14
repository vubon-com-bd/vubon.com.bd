/**
 * VendorReviewService — review lifecycle + moderation
 * @module vendor-service/application/services/impl
 */
import { Inject, Injectable, Logger } from '@nestjs/common';
import { randomUUID } from 'node:crypto';

import {
  VENDOR_REVIEW_REPOSITORY,
  type VendorReviewRepository,
  type VendorReviewListFilter,
} from '../../../domain/repositories/vendor-review.repository.interface.js';
import { VendorReviewEntity } from '../../../domain/entities/vendor-review.entity.js';
import { VendorReviewVO } from '../../../domain/value-objects/composites/vendor-review.vo.js';
import { ReviewIdVO } from '../../../domain/value-objects/primitives/review-id.vo.js';
import { VendorIdVO } from '../../../domain/value-objects/primitives/vendor-id.vo.js';
import { UserIdVO } from '../../../domain/value-objects/primitives/user-id.vo.js';
import { OrderIdVO } from '../../../domain/value-objects/primitives/order-id.vo.js';
import { ProductIdVO } from '../../../domain/value-objects/primitives/product-id.vo.js';
import { RatingValueVO } from '../../../domain/value-objects/primitives/rating-value.vo.js';
import { ReviewContentVO } from '../../../domain/value-objects/primitives/review-content.vo.js';
import { ReviewStatusVO } from '../../../domain/value-objects/primitives/review-status.vo.js';
import { DomainEventBridgeService } from '@vubon/shared-kernel/infrastructure/messaging/event-bridge';

import { ReviewMapper } from '../../mappers/review.mapper.js';
import { VendorNotFoundApplicationError, VendorValidationError } from '../../errors/vendor.errors.js';
import type {
  SubmitReviewRequestDTO,
  RespondReviewRequestDTO,
} from '../../dtos/requests/review/index.js';
import type {
  ReviewResponseDTO,
  ReviewPublicResponseDTO,
  ReviewSummaryResponseDTO,
  ReviewListResponseDTO,
  ReviewStatsResponseDTO,
} from '../../dtos/responses/review-response.dto.js';
import type {
  IVendorReviewService,
  ReviewListOptionsDTO,
} from '../interfaces/vendor-review.service.interface.js';

@Injectable()
export class VendorReviewService implements IVendorReviewService {
  private readonly logger = new Logger(VendorReviewService.name);

  constructor(
    @Inject(VENDOR_REVIEW_REPOSITORY)
    private readonly repo: VendorReviewRepository,
    private readonly eventBridge: DomainEventBridgeService,
  ) {}

  // ═══════════════ COMMANDS ═══════════════
  async submit(dto: SubmitReviewRequestDTO, _actorId?: string): Promise<ReviewResponseDTO> {
    const now = new Date().toISOString();
    const id = randomUUID();

    // ─── Duplicate check: one review per user per vendor ───
    if (dto.orderId) {
      const existingByOrder = await this.repo.findByOrder(dto.orderId);
      if (existingByOrder.length > 0) {
        throw new VendorValidationError(
          `Review already exists for order "${dto.orderId}"`,
          'orderId',
        );
      }
    }

    const vo = VendorReviewVO.create({
      id: ReviewIdVO.create(id),
      vendorId: VendorIdVO.create(dto.vendorId),
      userId: UserIdVO.create(dto.userId),
      orderId: dto.orderId ? OrderIdVO.create(dto.orderId) : undefined,
      productId: dto.productId ? ProductIdVO.create(dto.productId) : undefined,
      rating: RatingValueVO.create(dto.rating),
      content: ReviewContentVO.create(dto.content),
      title: dto.title,
      status: ReviewStatusVO.pending(),
      isVerifiedPurchase: dto.isVerifiedPurchase ?? false,
      helpfulCount: 0,
      flaggedCount: 0,
      submittedAt: now,
      createdAt: now,
      updatedAt: now,
    });

    const entity = VendorReviewEntity.create({ id, vo, now });
    const saved = await this.repo.save(entity);
    await this.eventBridge.publishFromEntity(saved as never);
    this.logger.log(`Review ${saved.id} submitted for vendor ${dto.vendorId} — rating=${dto.rating}`);
    return ReviewMapper.toResponse(saved as never);
  }

  async approve(reviewId: string, actorId: string): Promise<ReviewResponseDTO> {
    const entity = await this.load(reviewId);
    entity.approve(actorId);
    const saved = await this.repo.save(entity);
    await this.eventBridge.publishFromEntity(saved as never);
    return ReviewMapper.toResponse(saved as never);
  }

  async reject(reviewId: string, actorId: string): Promise<ReviewResponseDTO> {
    const entity = await this.load(reviewId);
    entity.reject(actorId);
    const saved = await this.repo.save(entity);
    await this.eventBridge.publishFromEntity(saved as never);
    return ReviewMapper.toResponse(saved as never);
  }

  async flag(reviewId: string, reason: string, actorId: string): Promise<ReviewResponseDTO> {
    const entity = await this.load(reviewId);
    entity.flag(reason, actorId);
    const saved = await this.repo.save(entity);
    await this.eventBridge.publishFromEntity(saved as never);
    return ReviewMapper.toResponse(saved as never);
  }

  async hide(reviewId: string, reason: string, actorId: string): Promise<ReviewResponseDTO> {
    const entity = await this.load(reviewId);
    entity.hide(reason, actorId);
    const saved = await this.repo.save(entity);
    await this.eventBridge.publishFromEntity(saved as never);
    return ReviewMapper.toResponse(saved as never);
  }

  async reply(dto: RespondReviewRequestDTO, actorId: string): Promise<ReviewResponseDTO> {
    const entity = await this.load(dto.reviewId);
    entity.reply(dto.replyText, actorId);
    const saved = await this.repo.save(entity);
    await this.eventBridge.publishFromEntity(saved as never);
    return ReviewMapper.toResponse(saved as never);
  }

  async markHelpful(reviewId: string, _userId: string): Promise<ReviewResponseDTO> {
    const entity = await this.load(reviewId);
    entity.markHelpful();
    const saved = await this.repo.save(entity);
    return ReviewMapper.toResponse(saved as never);
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

  async listByVendor(vendorId: string, options?: ReviewListOptionsDTO): Promise<ReviewListResponseDTO> {
    const result = await this.repo.findPaginated({
      page: options?.page ?? 1,
      limit: options?.limit ?? 20,
      sortBy: options?.sortBy,
      sortDir: options?.sortDir,
      filter: { ...options?.filter, vendorId } as VendorReviewListFilter,
    });
    return ReviewMapper.toListResponse(result.items as never, result.total, result.page, result.limit);
  }

  async listPendingModeration(limit = 50): Promise<readonly ReviewSummaryResponseDTO[]> {
    const entities = await this.repo.findPendingModeration(limit);
    return entities.map((e) => ReviewMapper.toSummary(e as never));
  }

  async listFlagged(limit = 50): Promise<readonly ReviewSummaryResponseDTO[]> {
    const entities = await this.repo.findFlagged(limit);
    return entities.map((e) => ReviewMapper.toSummary(e as never));
  }

  async getStats(vendorId?: string): Promise<ReviewStatsResponseDTO> {
    const stats = await this.repo.getStats(vendorId);
    return {
      total: stats.total,
      averageRating: stats.averageRating,
      positiveCount: stats.positiveCount,
      negativeCount: stats.negativeCount,
      verifiedPurchaseCount: stats.verifiedPurchaseCount,
      withRepliesCount: stats.withRepliesCount,
      byStatus: stats.byStatus,
      byRating: stats.byRating,
    };
  }

  private async load(id: string): Promise<VendorReviewEntity> {
    const vo = ReviewIdVO.create(id);
    const entity = await this.repo.findByIdVO(vo);
    if (!entity) throw new VendorNotFoundApplicationError(id);
    return entity;
  }
}

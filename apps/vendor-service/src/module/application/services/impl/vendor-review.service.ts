/**
 * VendorReviewService
 * @module vendor-service/application/services/impl
 */
import { Injectable, Inject } from '@nestjs/common';
import {
  VENDOR_REVIEW_REPOSITORY,
  type VendorReviewRepository,
} from '../../../domain/repositories/vendor-review.repository.interface.js';
import { VendorReviewEntity } from '../../../domain/entities/vendor-review.entity.js';
import { RatingScoreVO } from '../../../domain/value-objects/primitives/rating-score.vo.js';
import { VendorIdGeneratorService } from '../../../domain/services/vendor-id-generator.service.js';
import {
  VENDOR_REVIEW_SERVICE,
  type IVendorReviewService,
  type SubmitReviewInput,
} from '../interfaces/vendor-review.service.interface.js';
import type {
  VendorReviewResponseDto,
  VendorReviewPublicDto,
} from '../../dtos/responses/vendor-review-response.dto.js';

@Injectable()
export class VendorReviewService implements IVendorReviewService {
  constructor(
    @Inject(VENDOR_REVIEW_REPOSITORY)
    private readonly repo: VendorReviewRepository,
  ) {}

  async submit(input: SubmitReviewInput, _actorId?: string): Promise<VendorReviewResponseDto> {
    const now = new Date().toISOString();
    const entity = VendorReviewEntity.create({
      id: VendorIdGeneratorService.generateUUID(),
      vendorId: input.vendorId,
      userId: input.userId,
      orderId: input.orderId,
      rating: RatingScoreVO.create(input.rating),
      comment: input.comment,
      isVerifiedPurchase: input.isVerifiedPurchase,
      now,
    });
    const saved = await this.repo.save(entity);
    return this.toResponse(saved);
  }

  async approve(reviewId: string, _actorId?: string): Promise<VendorReviewResponseDto> {
    const entity = await this.requireReview(reviewId);
    entity.approve(new Date().toISOString());
    const saved = await this.repo.save(entity);
    return this.toResponse(saved);
  }

  async reject(reviewId: string, reason: string, _actorId?: string): Promise<VendorReviewResponseDto> {
    const entity = await this.requireReview(reviewId);
    entity.reject(reason, new Date().toISOString());
    const saved = await this.repo.save(entity);
    return this.toResponse(saved);
  }

  async flag(reviewId: string, reason: string, _actorId?: string): Promise<VendorReviewResponseDto> {
    const entity = await this.requireReview(reviewId);
    entity.flag(reason, new Date().toISOString());
    const saved = await this.repo.save(entity);
    return this.toResponse(saved);
  }

  async hide(reviewId: string, reason: string, _actorId?: string): Promise<VendorReviewResponseDto> {
    const entity = await this.requireReview(reviewId);
    entity.hide(reason, new Date().toISOString());
    const saved = await this.repo.save(entity);
    return this.toResponse(saved);
  }

  async restore(reviewId: string, _actorId?: string): Promise<VendorReviewResponseDto> {
    const entity = await this.requireReview(reviewId);
    entity.restore(new Date().toISOString());
    const saved = await this.repo.save(entity);
    return this.toResponse(saved);
  }

  async getById(reviewId: string): Promise<VendorReviewResponseDto> {
    const entity = await this.requireReview(reviewId);
    return this.toResponse(entity);
  }

  async listByVendor(vendorId: string): Promise<readonly VendorReviewResponseDto[]> {
    const entities = await this.repo.findByVendorId(vendorId);
    return entities.map((e) => this.toResponse(e));
  }

  async listPublicByVendor(vendorId: string): Promise<readonly VendorReviewPublicDto[]> {
    const entities = await this.repo.findPublicByVendorId(vendorId);
    return entities.map((e) => this.toPublic(e));
  }

  private async requireReview(id: string): Promise<VendorReviewEntity> {
    const entity = await this.repo.findById(id);
    if (!entity) {
      throw new Error(`Review "${id}" not found`);
    }
    return entity;
  }

  private toResponse(entity: VendorReviewEntity): VendorReviewResponseDto {
    return {
      id: entity.id,
      vendorId: entity.vendorId,
      userId: entity.userId,
      orderId: entity.orderId,
      rating: entity.rating.value,
      comment: entity.comment,
      categories: entity.categories.map((c) => ({
        category: c.category.value as VendorReviewResponseDto['categories'][number]['category'],
        score: c.score,
      })),
      status: entity.status.value as VendorReviewResponseDto['status'],
      isVerifiedPurchase: entity.isVerifiedPurchase,
      flagCount: entity.flagCount,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    };
  }

  private toPublic(entity: VendorReviewEntity): VendorReviewPublicDto {
    return {
      id: entity.id,
      userId: entity.userId,
      rating: entity.rating.value,
      comment: entity.comment,
      categories: entity.categories.map((c) => ({
        category: c.category.value as VendorReviewPublicDto['categories'][number]['category'],
        score: c.score,
      })),
      isVerifiedPurchase: entity.isVerifiedPurchase,
      createdAt: entity.createdAt,
    };
  }
}

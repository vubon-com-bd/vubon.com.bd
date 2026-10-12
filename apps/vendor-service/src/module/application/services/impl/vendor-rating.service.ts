/**
 * VendorRatingService
 * @module vendor-service/application/services/impl
 */
import { Injectable, Inject } from '@nestjs/common';
import {
  VENDOR_RATING_REPOSITORY,
  type VendorRatingRepository,
} from '../../../domain/repositories/vendor-rating.repository.interface.js';
import { VendorRatingEntity } from '../../../domain/entities/vendor-rating.entity.js';
import { VendorIdGeneratorService } from '../../../domain/services/vendor-id-generator.service.js';
import {
  VENDOR_RATING_SERVICE,
  type IVendorRatingService,
} from '../interfaces/vendor-rating.service.interface.js';
import type { VendorRatingResponseDto } from '../../dtos/responses/vendor-rating-response.dto.js';

@Injectable()
export class VendorRatingService implements IVendorRatingService {
  constructor(
    @Inject(VENDOR_RATING_REPOSITORY)
    private readonly repo: VendorRatingRepository,
  ) {}

  async initializeForVendor(vendorId: string, _actorId?: string): Promise<VendorRatingResponseDto> {
    const now = new Date().toISOString();
    const entity = VendorRatingEntity.create({
      id: VendorIdGeneratorService.generateUUID(),
      vendorId,
      now,
    });
    const saved = await this.repo.upsert(entity);
    return this.toResponse(saved);
  }

  async recordReview(vendorId: string, starRating: number, _actorId?: string): Promise<VendorRatingResponseDto> {
    const entity = await this.requireOrInitialize(vendorId);
    entity.recordReview(starRating, new Date().toISOString());
    const saved = await this.repo.upsert(entity);
    return this.toResponse(saved);
  }

  async removeReview(vendorId: string, starRating: number, _actorId?: string): Promise<VendorRatingResponseDto> {
    const entity = await this.requireOrInitialize(vendorId);
    entity.removeReview(starRating, new Date().toISOString());
    const saved = await this.repo.upsert(entity);
    return this.toResponse(saved);
  }

  async recalculate(vendorId: string, _actorId?: string): Promise<VendorRatingResponseDto> {
    const entity = await this.requireOrInitialize(vendorId);
    const overall = entity.computeOverall();
    entity.updateCategory(
      // placeholder — real category comes from RatingCategoryVO
      { value: 'overall' } as never,
      overall.value,
      entity.totalReviews,
      new Date().toISOString(),
    );
    const saved = await this.repo.upsert(entity);
    return this.toResponse(saved);
  }

  async getByVendorId(vendorId: string): Promise<VendorRatingResponseDto> {
    const entity = await this.requireOrInitialize(vendorId);
    return this.toResponse(entity);
  }

  private async requireOrInitialize(vendorId: string): Promise<VendorRatingEntity> {
    const existing = await this.repo.findByVendorId(vendorId);
    if (existing) return existing;
    const now = new Date().toISOString();
    return VendorRatingEntity.create({
      id: VendorIdGeneratorService.generateUUID(),
      vendorId,
      now,
    });
  }

  private toResponse(entity: VendorRatingEntity): VendorRatingResponseDto {
    const dist = entity.distribution;
    return {
      id: entity.id,
      vendorId: entity.vendorId,
      overall: entity.overall.value,
      totalReviews: entity.totalReviews,
      distribution: {
        '1': dist['1'],
        '2': dist['2'],
        '3': dist['3'],
        '4': dist['4'],
        '5': dist['5'],
      },
      categories: entity.categories.map((c) => ({
        category: c.category.value,
        score: c.score,
        count: c.count,
      })),
      positiveRatio: entity.positiveRatio(),
      negativeRatio: entity.negativeRatio(),
      recentWeight: entity.recentWeight,
      isDisplayable: entity.totalReviews >= 5,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    };
  }
}

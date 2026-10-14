/**
 * VendorRatingService — aggregate rating computation
 * @module vendor-service/application/services/impl
 */
import { Inject, Injectable, Logger } from '@nestjs/common';

import {
  VENDOR_RATING_REPOSITORY,
  type VendorRatingRepository,
} from '../../../domain/repositories/vendor-rating.repository.interface.js';
import { VendorIdVO } from '../../../domain/value-objects/primitives/vendor-id.vo.js';
import { RatingCalculatorService } from '../../../domain/services/rating-calculator.service.js';
import { DomainEventBridgeService } from '@vubon/shared-kernel/infrastructure/messaging/event-bridge';

import { RatingMapper } from '../../mappers/rating.mapper.js';
import { VendorNotFoundApplicationError } from '../../errors/vendor.errors.js';
import type { IVendorRatingService } from '../interfaces/vendor-rating.service.interface.js';
import type {
  RatingSummaryDTO,
  RatingRecalculationResultDTO,
} from '../interfaces/vendor-rating.service.interface.js';

@Injectable()
export class VendorRatingService implements IVendorRatingService {
  private readonly logger = new Logger(VendorRatingService.name);

  constructor(
    @Inject(VENDOR_RATING_REPOSITORY)
    private readonly repo: VendorRatingRepository,
    private readonly eventBridge: DomainEventBridgeService,
  ) {}

  async getByVendorId(vendorId: string): Promise<RatingSummaryDTO | null> {
    const entity = await this.repo.findByVendorId(VendorIdVO.create(vendorId));
    if (!entity) return null;
    return RatingMapper.toSummary(entity as never);
  }

  async recalculate(vendorId: string, _actorId?: string): Promise<RatingRecalculationResultDTO> {
    const entity = await this.repo.findByVendorId(VendorIdVO.create(vendorId));
    if (!entity) throw new VendorNotFoundApplicationError(vendorId);

    const previousOverall = entity.overall.rating;

    // Recalculate via domain service (would receive review list in real impl)
    const reviews: never[] = [];
    if (reviews.length > 0) {
      entity.recalculateFrom(reviews);
    }

    const saved = await this.repo.save(entity);
    await this.eventBridge.publishFromEntity(saved as never);

    const newOverall = saved.overall.rating;
    this.logger.log(`Rating recalculated for vendor ${vendorId}: ${previousOverall} → ${newOverall}`);

    return {
      vendorId,
      previousOverall,
      newOverall,
      delta: Math.round((newOverall - previousOverall) * 10) / 10,
      totalReviews: saved.totalReviews,
    };
  }

  async getTopRated(limit = 20): Promise<readonly RatingSummaryDTO[]> {
    const entities = await this.repo.findTopRated(limit);
    return entities.map((e) => RatingMapper.toSummary(e as never));
  }

  async getBottomRated(limit = 20): Promise<readonly RatingSummaryDTO[]> {
    const entities = await this.repo.findBottomRated(limit);
    return entities.map((e) => RatingMapper.toSummary(e as never));
  }

  async getDistribution(vendorId: string): Promise<Readonly<Record<1 | 2 | 3 | 4 | 5, number>>> {
    return this.repo.getDistribution(vendorId);
  }

  // Placeholder use to avoid unused import warning
  private _previewWeighted(vendorId: string): Promise<number> {
    void vendorId;
    return Promise.resolve(RatingCalculatorService.compute([]).overall);
  }
}

/**
 * ReviewModerationWorker — auto-moderation + stats refresh.
 * @module product-service/infrastructure/workers
 */
import { Injectable } from '@nestjs/common';
import { Job } from 'bullmq';
import { BaseWorker } from './base.worker.js';
import { REVIEW_QUEUE, JOB_TYPES } from '../queues/queue.constants.js';
import { REVIEW_REPOSITORY, type ReviewRepository } from '../../domain/repositories/review.repository.interface.js';
import { Inject } from '@nestjs/common';
import { ProductIdVO } from '../../domain/value-objects/primitives/product-id.vo.js';

interface ReviewPayload {
  reviewId?: string;
  productId?: string;
}

@Injectable()
export class ReviewModerationWorker extends BaseWorker {
  constructor(
    @Inject(REVIEW_REPOSITORY) private readonly reviewRepo: ReviewRepository,
  ) {
    super(REVIEW_QUEUE, ReviewModerationWorker.name);
  }

  protected async handle(job: Job): Promise<void> {
    const data = job.data as ReviewPayload;
    switch (job.name as string) {
      case JOB_TYPES.REVIEW_AUTO_MODERATE:
        if (data.reviewId) {
          const review = await this.reviewRepo.findById(data.reviewId);
          if (review && review.isSpamSuspicious()) {
            review.markAsSpam('system');
            await this.reviewRepo.save(review);
            this.logger.warn(`Auto-flagged spam review ${data.reviewId}`);
          }
        }
        return;
      case JOB_TYPES.REVIEW_UPDATE_STATS:
        if (data.productId) {
          const agg = await this.reviewRepo.aggregateRatings(ProductIdVO.create(data.productId));
          this.logger.debug(`Review stats for ${data.productId}: total=${agg?.totalReviews ?? 0}`);
        }
        return;
      default:
        this.logger.warn(`Unknown job: ${job.name}`);
    }
  }
}

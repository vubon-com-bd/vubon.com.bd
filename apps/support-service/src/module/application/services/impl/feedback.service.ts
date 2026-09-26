/**
 * FeedbackService — use case orchestration
 * @module support-service/application/services/impl
 */
import { Injectable } from '@nestjs/common';
import { BusinessRuleError } from '@vubon/shared-kernel/domain/errors/business-rule.error';

import type { FeedbackServiceInterface } from '../interfaces/feedback.service.interface';
import type { FeedbackRepository } from '../../../domain/repositories/feedback.repository.interface';
import { FeedbackEntity } from '../../../domain/entities/feedback.entity';
import { FeedbackIdVO } from '../../../domain/value-objects/primitives/feedback-id.vo';
import { FeedbackTypeVO } from '../../../domain/value-objects/primitives/feedback-type.vo';
import { FeedbackContentVO } from '../../../domain/value-objects/primitives/feedback-content.vo';
import { FeedbackStatusVO } from '../../../domain/value-objects/primitives/feedback-status.vo';
import { UserIdVO } from '../../../domain/value-objects/primitives/user-id.vo';

import { FeedbackMapper } from '../../mappers/feedback.mapper';
import { FeedbackNotFoundException } from '../../errors/feedback.errors';
import type { SubmitFeedbackRequestDTO } from '../../dtos/requests/feedback/submit-feedback.dto';
import type { ReviewFeedbackRequestDTO } from '../../dtos/requests/feedback/review-feedback.dto';
import type { FeedbackResponseDTO } from '../../dtos/responses/feedback-response.dto';
import type { FeedbackListResponseDTO } from '../../dtos/responses/feedback-list-response.dto';

@Injectable()
export class FeedbackService implements FeedbackServiceInterface {
  constructor(
    private readonly feedbackRepo: FeedbackRepository,
    private readonly mapper: FeedbackMapper,
  ) {}

  async submit(input: SubmitFeedbackRequestDTO): Promise<FeedbackResponseDTO> {
    if (input.rating !== undefined && (input.rating < 1 || input.rating > 5)) {
      throw new BusinessRuleError(
        'Rating must be between 1 and 5',
        'feedback.rating.range',
      );
    }
    const now = new Date().toISOString();
    const userId = input.isAnonymous
      ? undefined
      : UserIdVO.create(input.userId ?? 'anonymous');

    const feedback = FeedbackEntity.create({
      id: FeedbackIdVO.generate(),
      type: FeedbackTypeVO.create(input.type),
      content: FeedbackContentVO.create(input.message),
      userId: userId ?? UserIdVO.create('anonymous'),
      rating: input.rating,
      now,
    });

    await this.feedbackRepo.save(feedback);
    return this.mapper.map(feedback);
  }

  async review(input: ReviewFeedbackRequestDTO): Promise<FeedbackResponseDTO> {
    const feedback = await this.loadOrThrow(input.feedbackId);
    const reviewer = UserIdVO.create(input.reviewerId);
    feedback.review(reviewer, input.note ?? 'reviewed', new Date().toISOString());
    await this.feedbackRepo.save(feedback);
    return this.mapper.map(feedback);
  }

  async getById(feedbackId: string): Promise<FeedbackResponseDTO> {
    const feedback = await this.loadOrThrow(feedbackId);
    return this.mapper.map(feedback);
  }

  async list(page: number, limit: number): Promise<FeedbackListResponseDTO> {
    const all = await this.feedbackRepo.findAll();
    const safeLimit = Math.max(1, Math.min(limit, 100));
    const safePage = Math.max(1, page);
    const total = all.length;
    const start = (safePage - 1) * safeLimit;
    const slice = all.slice(start, start + safeLimit);
    return {
      items: this.mapper.toList(slice),
      total,
      page: safePage,
      limit: safeLimit,
      totalPages: Math.ceil(total / safeLimit) || 1,
    };
  }

  private async loadOrThrow(feedbackId: string): Promise<FeedbackEntity> {
    const feedback = await this.feedbackRepo.findById(FeedbackIdVO.create(feedbackId));
    if (!feedback) {
      throw new FeedbackNotFoundException(feedbackId);
    }
    return feedback;
  }

  // reference to avoid unused import warnings (VO stays for future use)
  private _unusedStatus(): FeedbackStatusVO {
    return FeedbackStatusVO.create('pending');
  }
}

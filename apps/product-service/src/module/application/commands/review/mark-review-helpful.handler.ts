import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { MarkReviewHelpfulCommand } from './mark-review-helpful.command.js';
import { REVIEW_SERVICE, type IReviewService } from '../../services/interfaces/review.service.interface.js';
import type { ReviewResponseDTO } from '../../dtos/responses/review-response.dto.js';

@CommandHandler(MarkReviewHelpfulCommand)
export class MarkReviewHelpfulHandler implements ICommandHandler<MarkReviewHelpfulCommand, ReviewResponseDTO> {
  constructor(@Inject(REVIEW_SERVICE) private readonly service: IReviewService) {}
  async execute(c: MarkReviewHelpfulCommand): Promise<ReviewResponseDTO> {
    return this.service.markHelpful(c.reviewId, c.userId);
  }
}

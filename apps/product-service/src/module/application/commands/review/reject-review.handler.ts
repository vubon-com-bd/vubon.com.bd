import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { RejectReviewCommand } from './reject-review.command.js';
import { REVIEW_SERVICE, type IReviewService } from '../../services/interfaces/review.service.interface.js';
import type { ReviewResponseDTO } from '../../dtos/responses/review-response.dto.js';

@CommandHandler(RejectReviewCommand)
export class RejectReviewHandler implements ICommandHandler<RejectReviewCommand, ReviewResponseDTO> {
  constructor(@Inject(REVIEW_SERVICE) private readonly service: IReviewService) {}
  async execute(c: RejectReviewCommand): Promise<ReviewResponseDTO> {
    return this.service.reject(c.reviewId, c.moderatorId, c.reason);
  }
}

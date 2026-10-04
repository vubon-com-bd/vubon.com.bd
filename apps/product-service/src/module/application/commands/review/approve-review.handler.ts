import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { ApproveReviewCommand } from './approve-review.command.js';
import { REVIEW_SERVICE, type IReviewService } from '../../services/interfaces/review.service.interface.js';
import type { ReviewResponseDTO } from '../../dtos/responses/review-response.dto.js';

@CommandHandler(ApproveReviewCommand)
export class ApproveReviewHandler implements ICommandHandler<ApproveReviewCommand, ReviewResponseDTO> {
  constructor(@Inject(REVIEW_SERVICE) private readonly service: IReviewService) {}
  async execute(c: ApproveReviewCommand): Promise<ReviewResponseDTO> {
    return this.service.approve(c.reviewId, c.moderatorId);
  }
}

import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { ReportReviewCommand } from './report-review.command.js';
import { REVIEW_SERVICE, type IReviewService } from '../../services/interfaces/review.service.interface.js';
import type { ReviewResponseDTO } from '../../dtos/responses/review-response.dto.js';

@CommandHandler(ReportReviewCommand)
export class ReportReviewHandler implements ICommandHandler<ReportReviewCommand, ReviewResponseDTO> {
  constructor(@Inject(REVIEW_SERVICE) private readonly service: IReviewService) {}
  async execute(c: ReportReviewCommand): Promise<ReviewResponseDTO> {
    return this.service.report(c.reviewId, c.userId, c.reason);
  }
}

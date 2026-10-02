import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { SubmitReviewCommand } from './submit-review.command.js';
import { REVIEW_SERVICE, type IReviewService } from '../../services/interfaces/review.service.interface.js';
import type { ReviewResponseDTO } from '../../dtos/responses/review-response.dto.js';

@CommandHandler(SubmitReviewCommand)
export class SubmitReviewHandler implements ICommandHandler<SubmitReviewCommand, ReviewResponseDTO> {
  constructor(@Inject(REVIEW_SERVICE) private readonly service: IReviewService) {}
  async execute(c: SubmitReviewCommand): Promise<ReviewResponseDTO> {
    return this.service.submit(c.dto);
  }
}

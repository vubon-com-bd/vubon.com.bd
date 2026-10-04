import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { UpdateReviewCommand } from './update-review.command.js';
import { REVIEW_SERVICE, type IReviewService } from '../../services/interfaces/review.service.interface.js';
import type { ReviewResponseDTO } from '../../dtos/responses/review-response.dto.js';

@CommandHandler(UpdateReviewCommand)
export class UpdateReviewHandler implements ICommandHandler<UpdateReviewCommand, ReviewResponseDTO> {
  constructor(@Inject(REVIEW_SERVICE) private readonly service: IReviewService) {}
  async execute(c: UpdateReviewCommand): Promise<ReviewResponseDTO> {
    return this.service.update(c.dto);
  }
}

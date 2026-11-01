import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { ApproveReviewCommand } from './approve-review.command.js';
import {
  REVIEW_SERVICE,
  type IProductReviewService,
} from '../../services/interfaces/product-review.service.interface.js';
import type { ReviewResponseDTO } from '../../dtos/responses/review-response.dto.js';

@CommandHandler(ApproveReviewCommand)
export class ApproveReviewHandler
  implements ICommandHandler<ApproveReviewCommand, ReviewResponseDTO>
{
  constructor(
    @Inject(REVIEW_SERVICE)
    private readonly service: IProductReviewService,
  ) {}

  async execute(c: ApproveReviewCommand): Promise<ReviewResponseDTO> {
    return this.service.approve(c.dto);
  }
}

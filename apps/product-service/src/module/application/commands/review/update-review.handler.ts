import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { UpdateReviewCommand } from './update-review.command.js';
import {
  REVIEW_SERVICE,
  type IProductReviewService,
} from '../../services/interfaces/product-review.service.interface.js';
import type { ReviewResponseDTO } from '../../dtos/responses/review-response.dto.js';

@CommandHandler(UpdateReviewCommand)
export class UpdateReviewHandler
  implements ICommandHandler<UpdateReviewCommand, ReviewResponseDTO>
{
  constructor(
    @Inject(REVIEW_SERVICE)
    private readonly service: IProductReviewService,
  ) {}

  async execute(c: UpdateReviewCommand): Promise<ReviewResponseDTO> {
    return this.service.update(c.dto);
  }
}

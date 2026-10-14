import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { SubmitReviewCommand } from './submit-review.command.js';
import {
  VENDOR_REVIEW_SERVICE,
  type IVendorReviewService,
} from '../../services/interfaces/vendor-review.service.interface.js';
import type { ReviewResponseDTO } from '../../dtos/responses/review-response.dto.js';

@CommandHandler(SubmitReviewCommand)
export class SubmitReviewHandler
  implements ICommandHandler<SubmitReviewCommand, ReviewResponseDTO>
{
  constructor(
    @Inject(VENDOR_REVIEW_SERVICE)
    private readonly service: IVendorReviewService,
  ) {}

  async execute(c: SubmitReviewCommand): Promise<ReviewResponseDTO> {
    return this.service.submit(c.dto, c.actorId);
  }
}

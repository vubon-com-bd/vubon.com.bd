import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { RespondReviewCommand } from './respond-review.command.js';
import {
  VENDOR_REVIEW_SERVICE,
  type IVendorReviewService,
} from '../../services/interfaces/vendor-review.service.interface.js';
import type { ReviewResponseDTO } from '../../dtos/responses/review-response.dto.js';

@CommandHandler(RespondReviewCommand)
export class RespondReviewHandler
  implements ICommandHandler<RespondReviewCommand, ReviewResponseDTO>
{
  constructor(
    @Inject(VENDOR_REVIEW_SERVICE)
    private readonly service: IVendorReviewService,
  ) {}

  async execute(c: RespondReviewCommand): Promise<ReviewResponseDTO> {
    return this.service.reply(c.dto, c.actorId);
  }
}

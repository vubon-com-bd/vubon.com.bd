import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { ApproveVendorReviewCommand } from './approve-vendor-review.command.js';
import {
  VENDOR_REVIEW_SERVICE,
  type IVendorReviewService,
} from '../../services/interfaces/vendor-review.service.interface.js';
import type { VendorReviewResponseDto } from '../../dtos/responses/vendor-review-response.dto.js';

@CommandHandler(ApproveVendorReviewCommand)
export class ApproveVendorReviewHandler
  implements ICommandHandler<ApproveVendorReviewCommand, VendorReviewResponseDto>
{
  constructor(@Inject(VENDOR_REVIEW_SERVICE) private readonly service: IVendorReviewService) {}
  async execute(cmd: ApproveVendorReviewCommand): Promise<VendorReviewResponseDto> {
    return this.service.approve(cmd.reviewId, cmd.actorId);
  }
}

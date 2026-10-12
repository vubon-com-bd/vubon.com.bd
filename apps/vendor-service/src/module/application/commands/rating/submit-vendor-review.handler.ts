import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { SubmitVendorReviewCommand } from './submit-vendor-review.command.js';
import {
  VENDOR_REVIEW_SERVICE,
  type IVendorReviewService,
} from '../../services/interfaces/vendor-review.service.interface.js';
import type { VendorReviewResponseDto } from '../../dtos/responses/vendor-review-response.dto.js';

@CommandHandler(SubmitVendorReviewCommand)
export class SubmitVendorReviewHandler
  implements ICommandHandler<SubmitVendorReviewCommand, VendorReviewResponseDto>
{
  constructor(@Inject(VENDOR_REVIEW_SERVICE) private readonly service: IVendorReviewService) {}
  async execute(cmd: SubmitVendorReviewCommand): Promise<VendorReviewResponseDto> {
    return this.service.submit(cmd.input, cmd.actorId);
  }
}

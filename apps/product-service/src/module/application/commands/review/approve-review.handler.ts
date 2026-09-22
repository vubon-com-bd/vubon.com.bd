import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { ApproveReviewCommand } from './approve-review.command';
import type { ProductReviewServiceInterface } from '../../services/interfaces/product-review.service.interface';
import type { ReviewResponseDTO } from '../../dtos/responses/review-response.dto';

@CommandHandler(ApproveReviewCommand)
export class ApproveReviewHandler
  extends BaseCommandHandler<ApproveReviewCommand, ReviewResponseDTO>
  implements ICommandHandler<ApproveReviewCommand>
{
  readonly commandType = 'product.review.approve';

  constructor(
    private readonly reviewService: ProductReviewServiceInterface,
    private readonly eventBus: EventBus,
  ) {
    super();
  }

  async execute(command: ApproveReviewCommand): Promise<ReviewResponseDTO> {
    return this.reviewService.approve(command.reviewId);
  }
}

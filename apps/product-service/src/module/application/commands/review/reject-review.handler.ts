import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { RejectReviewCommand } from './reject-review.command';
import type { ProductReviewServiceInterface } from '../../services/interfaces/product-review.service.interface';
import type { ReviewResponseDTO } from '../../dtos/responses/review-response.dto';

@CommandHandler(RejectReviewCommand)
export class RejectReviewHandler
  extends BaseCommandHandler<RejectReviewCommand, ReviewResponseDTO>
  implements ICommandHandler<RejectReviewCommand>
{
  readonly commandType = 'product.review.reject';

  constructor(
    private readonly reviewService: ProductReviewServiceInterface,
    private readonly eventBus: EventBus,
  ) {
    super();
  }

  async execute(command: RejectReviewCommand): Promise<ReviewResponseDTO> {
    return this.reviewService.reject(command.reviewId, command.reason);
  }
}

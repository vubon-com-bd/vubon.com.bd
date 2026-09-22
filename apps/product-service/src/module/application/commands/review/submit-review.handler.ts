import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { SubmitReviewCommand } from './submit-review.command';
import type { ProductReviewServiceInterface } from '../../services/interfaces/product-review.service.interface';
import type { ReviewResponseDTO } from '../../dtos/responses/review-response.dto';

@CommandHandler(SubmitReviewCommand)
export class SubmitReviewHandler
  extends BaseCommandHandler<SubmitReviewCommand, ReviewResponseDTO>
  implements ICommandHandler<SubmitReviewCommand>
{
  readonly commandType = 'product.review.submit';

  constructor(
    private readonly reviewService: ProductReviewServiceInterface,
    private readonly eventBus: EventBus,
  ) {
    super();
  }

  async execute(command: SubmitReviewCommand): Promise<ReviewResponseDTO> {
    return this.reviewService.submit(
      command.productId,
      command.userId,
      command.rating,
      command.content,
    );
  }
}

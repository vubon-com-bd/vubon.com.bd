import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { UpdateReviewCommand } from './update-review.command';
import type { ProductReviewServiceInterface } from '../../services/interfaces/product-review.service.interface';
import type { ReviewResponseDTO } from '../../dtos/responses/review-response.dto';

@CommandHandler(UpdateReviewCommand)
export class UpdateReviewHandler
  extends BaseCommandHandler<UpdateReviewCommand, ReviewResponseDTO | null>
  implements ICommandHandler<UpdateReviewCommand>
{
  readonly commandType = 'product.review.update';

  constructor(
    private readonly reviewService: ProductReviewServiceInterface,
    private readonly eventBus: EventBus,
  ) {
    super();
  }

  async execute(command: UpdateReviewCommand): Promise<ReviewResponseDTO | null> {
    void command;
    void this.reviewService;
    throw new Error('update-review not yet wired');
  }
}

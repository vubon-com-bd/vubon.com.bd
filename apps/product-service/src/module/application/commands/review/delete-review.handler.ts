import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { DeleteReviewCommand } from './delete-review.command';
import type { ProductReviewServiceInterface } from '../../services/interfaces/product-review.service.interface';

@CommandHandler(DeleteReviewCommand)
export class DeleteReviewHandler
  extends BaseCommandHandler<DeleteReviewCommand, void>
  implements ICommandHandler<DeleteReviewCommand>
{
  readonly commandType = 'product.review.delete';

  constructor(
    private readonly reviewService: ProductReviewServiceInterface,
    private readonly eventBus: EventBus,
  ) {
    super();
  }

  async execute(command: DeleteReviewCommand): Promise<void> {
    await this.reviewService.delete(command.reviewId);
  }
}

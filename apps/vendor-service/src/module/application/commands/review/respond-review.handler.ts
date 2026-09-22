import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { RespondReviewCommand } from './respond-review.command';
import type { VendorReviewRepository } from '../../../domain/repositories/vendor-review.repository.interface';
import { ReviewIdVO } from '../../../domain/value-objects/primitives/review-id.vo';
import { VendorNotFoundAppError } from '../../errors/vendor.errors';

@CommandHandler(RespondReviewCommand)
export class RespondReviewHandler
  extends BaseCommandHandler<RespondReviewCommand, void>
  implements ICommandHandler<RespondReviewCommand>
{
  readonly commandType = 'vendor.review.respond';

  constructor(
    private readonly reviewRepo: VendorReviewRepository,
    private readonly eventBus: EventBus,
  ) {
    super();
  }

  async execute(command: RespondReviewCommand): Promise<void> {
    const review = await this.reviewRepo.findById(
      ReviewIdVO.create(command.reviewId),
    );
    if (!review) throw new VendorNotFoundAppError(command.reviewId);
    void this.eventBus;
    throw new Error('respond-review orchestration not yet wired');
  }
}

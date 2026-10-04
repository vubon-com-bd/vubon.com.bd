import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { DeleteReviewCommand } from './delete-review.command.js';
import { REVIEW_SERVICE, type IReviewService } from '../../services/interfaces/review.service.interface.js';

@CommandHandler(DeleteReviewCommand)
export class DeleteReviewHandler implements ICommandHandler<DeleteReviewCommand, void> {
  constructor(@Inject(REVIEW_SERVICE) private readonly service: IReviewService) {}
  async execute(c: DeleteReviewCommand): Promise<void> {
    return this.service.remove(c.reviewId, c.actorId);
  }
}

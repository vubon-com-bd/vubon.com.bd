import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { ReviewFeedbackCommand } from './review-feedback.command';
import type { FeedbackRepository } from '../../../domain/repositories/feedback.repository.interface';
import { FeedbackIdVO } from '../../../domain/value-objects/primitives/feedback-id.vo';
import { FeedbackNotFoundError } from '../../errors/feedback.errors';

@CommandHandler(ReviewFeedbackCommand)
export class ReviewFeedbackHandler
  extends BaseCommandHandler<ReviewFeedbackCommand, void>
  implements ICommandHandler<ReviewFeedbackCommand>
{
  readonly commandType = 'support.feedback.review';

  constructor(private readonly feedbackRepo: FeedbackRepository) {
    super();
  }

  async execute(command: ReviewFeedbackCommand): Promise<void> {
    void command.status;
    void command.notes;
    const existing = await this.feedbackRepo.findById(FeedbackIdVO.create(command.feedbackId));
    if (!existing) throw new FeedbackNotFoundError(command.feedbackId);
  }
}

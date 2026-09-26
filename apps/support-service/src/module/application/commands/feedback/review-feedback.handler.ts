/**
 * ReviewFeedbackHandler
 * @module support-service/application/commands/feedback
 */
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { ReviewFeedbackCommand } from './review-feedback.command';
import type { FeedbackResponseDTO } from '../../dtos/responses/feedback-response.dto';
import type { FeedbackServiceInterface } from '../../services/interfaces/feedback.service.interface';

export class ReviewFeedbackHandler extends BaseCommandHandler<
  ReviewFeedbackCommand,
  FeedbackResponseDTO
> {
  readonly commandType = 'support.feedback.review';

  constructor(private readonly feedbackService: FeedbackServiceInterface) {
    super();
  }

  async execute(command: ReviewFeedbackCommand): Promise<FeedbackResponseDTO> {
    return this.feedbackService.review(command.payload);
  }
}

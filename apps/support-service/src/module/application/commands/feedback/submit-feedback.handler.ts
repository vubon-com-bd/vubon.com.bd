/**
 * SubmitFeedbackHandler
 * @module support-service/application/commands/feedback
 */
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { SubmitFeedbackCommand } from './submit-feedback.command';
import type { FeedbackResponseDTO } from '../../dtos/responses/feedback-response.dto';
import type { FeedbackServiceInterface } from '../../services/interfaces/feedback.service.interface';

export class SubmitFeedbackHandler extends BaseCommandHandler<
  SubmitFeedbackCommand,
  FeedbackResponseDTO
> {
  readonly commandType = 'support.feedback.submit';

  constructor(private readonly feedbackService: FeedbackServiceInterface) {
    super();
  }

  async execute(command: SubmitFeedbackCommand): Promise<FeedbackResponseDTO> {
    return this.feedbackService.submit(command.payload);
  }
}

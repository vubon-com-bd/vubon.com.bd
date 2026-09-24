import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { SubmitFeedbackCommand } from './submit-feedback.command';
import type { FeedbackServiceInterface } from '../../services/interfaces/feedback.service.interface';
import type { FeedbackResponseDTO } from '../../dtos/responses/feedback-response.dto';

@CommandHandler(SubmitFeedbackCommand)
export class SubmitFeedbackHandler
  extends BaseCommandHandler<SubmitFeedbackCommand, FeedbackResponseDTO>
  implements ICommandHandler<SubmitFeedbackCommand>
{
  readonly commandType = 'support.feedback.submit';

  constructor(private readonly feedbackService: FeedbackServiceInterface) {
    super();
  }

  async execute(command: SubmitFeedbackCommand): Promise<FeedbackResponseDTO> {
    return this.feedbackService.submit({
      userId: command.userId,
      type: command.type_,
      content: command.content,
    });
  }
}

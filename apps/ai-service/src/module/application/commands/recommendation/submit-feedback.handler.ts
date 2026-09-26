import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { SubmitFeedbackCommand } from './submit-feedback.command';
import type { RecommendationServiceInterface } from '../../services/interfaces/recommendation.service.interface';

@CommandHandler(SubmitFeedbackCommand)
export class SubmitFeedbackHandler
  extends BaseCommandHandler<SubmitFeedbackCommand, void>
  implements ICommandHandler<SubmitFeedbackCommand>
{
  readonly commandType = 'ai.recommendation.feedback';

  constructor(
    private readonly recommendationService: RecommendationServiceInterface,
    private readonly eventBus: EventBus,
  ) {
    super();
  }

  async execute(command: SubmitFeedbackCommand): Promise<void> {
    await this.recommendationService.submitFeedback(
      command.recommendationId,
      command.userId,
      command.productId,
      command.rating,
    );
  }
}

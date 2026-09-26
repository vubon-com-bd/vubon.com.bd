import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';

export class SubmitFeedbackCommand extends BaseCommand {
  readonly type = 'ai.recommendation.feedback';

  constructor(
    public readonly recommendationId: string,
    public readonly userId: string,
    public readonly productId: string,
    public readonly rating: number,
  ) {
    super();
  }
}

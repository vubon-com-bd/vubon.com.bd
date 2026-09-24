import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';

export class ReviewFeedbackCommand extends BaseCommand {
  readonly type = 'support.feedback.review';

  constructor(
    public readonly feedbackId: string,
    public readonly status: string,
    public readonly notes?: string,
  ) {
    super();
  }
}

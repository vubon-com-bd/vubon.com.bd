import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';

export class SubmitFeedbackCommand extends BaseCommand {
  readonly type = 'support.feedback.submit';

  constructor(
    public readonly userId: string,
    public readonly type_: string,
    public readonly content: string,
  ) {
    super();
  }
}

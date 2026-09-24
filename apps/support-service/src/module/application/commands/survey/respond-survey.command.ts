import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';

export class RespondSurveyCommand extends BaseCommand {
  readonly type = 'support.survey.respond';

  constructor(
    public readonly surveyId: string,
    public readonly userId: string,
    public readonly answers: Readonly<Record<string, unknown>>,
  ) {
    super();
  }
}

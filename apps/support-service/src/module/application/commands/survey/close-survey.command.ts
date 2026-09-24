import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';

export class CloseSurveyCommand extends BaseCommand {
  readonly type = 'support.survey.close';

  constructor(public readonly surveyId: string) {
    super();
  }
}

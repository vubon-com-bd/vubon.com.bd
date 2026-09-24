import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';

export class CreateSurveyCommand extends BaseCommand {
  readonly type = 'support.survey.create';

  constructor(
    public readonly title: string,
    public readonly type_: string,
    public readonly questions: readonly unknown[],
  ) {
    super();
  }
}

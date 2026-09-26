import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';

export class AnalyzeCohortCommand extends BaseCommand {
  readonly type = 'analytics.cohort.analyze';

  constructor(
    public readonly cohortId: string,
    public readonly periods: number = 30,
  ) {
    super();
  }
}

import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';

export class CreateCohortCommand extends BaseCommand {
  readonly type = 'analytics.cohort.create';

  constructor(
    public readonly name: string,
    public readonly period: string,
    public readonly fromDate: string,
    public readonly toDate: string,
    public readonly userIds: readonly string[],
  ) {
    super();
  }
}

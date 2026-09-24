import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';

export class ScheduleReportCommand extends BaseCommand {
  readonly type = 'analytics.report.schedule';

  constructor(
    public readonly reportId: string,
    public readonly frequency: string,
    public readonly cronExpression?: string,
    public readonly recipients?: readonly string[],
  ) {
    super();
  }
}

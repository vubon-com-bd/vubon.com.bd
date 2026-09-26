import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';

export class ScheduleReportCommand extends BaseCommand {
  readonly type = 'marketing.report.schedule';
  constructor(
    public readonly name: string,
    public readonly reportType: string,
    public readonly schedule: string,
  ) { super(); }
}

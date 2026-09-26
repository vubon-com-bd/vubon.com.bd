import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';

export class GenerateReportCommand extends BaseCommand {
  readonly type = 'analytics.report.generate';

  constructor(
    public readonly reportId: string,
    public readonly fromDate: string,
    public readonly toDate: string,
    public readonly filters?: Record<string, unknown>,
  ) {
    super();
  }
}

import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';

export class ExportReportCommand extends BaseCommand {
  readonly type = 'analytics.report.export';

  constructor(
    public readonly reportId: string,
    public readonly format: string,
    public readonly filename?: string,
  ) {
    super();
  }
}

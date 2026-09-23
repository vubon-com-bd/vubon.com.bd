import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';

export class GenerateReportCommand extends BaseCommand {
  readonly type = 'marketing.report.generate';
  constructor(
    public readonly name: string,
    public readonly reportType: string,
    public readonly format?: string,
  ) { super(); }
}

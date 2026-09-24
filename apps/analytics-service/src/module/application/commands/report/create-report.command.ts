import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';

export class CreateReportCommand extends BaseCommand {
  readonly type = 'analytics.report.create';

  constructor(
    public readonly reportType: string,
    public readonly reportFormat: string,
    public readonly ownerId: string,
  ) {
    super();
  }
}

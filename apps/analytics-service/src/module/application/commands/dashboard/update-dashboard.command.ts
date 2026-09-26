import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';

export class UpdateDashboardCommand extends BaseCommand {
  readonly type = 'analytics.dashboard.update';

  constructor(
    public readonly dashboardId: string,
    public readonly name?: string,
    public readonly layout?: string,
  ) {
    super();
  }
}

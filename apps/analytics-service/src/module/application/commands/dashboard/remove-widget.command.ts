import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';

export class RemoveWidgetCommand extends BaseCommand {
  readonly type = 'analytics.dashboard.remove-widget';

  constructor(
    public readonly dashboardId: string,
    public readonly widgetId: string,
  ) {
    super();
  }
}

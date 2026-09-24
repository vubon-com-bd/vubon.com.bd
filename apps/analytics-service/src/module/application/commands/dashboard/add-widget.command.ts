import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';

export class AddWidgetCommand extends BaseCommand {
  readonly type = 'analytics.dashboard.add-widget';

  constructor(
    public readonly dashboardId: string,
    public readonly widgetType: string,
    public readonly metricName: string,
    public readonly config: Record<string, unknown>,
    public readonly position?: number,
  ) {
    super();
  }
}

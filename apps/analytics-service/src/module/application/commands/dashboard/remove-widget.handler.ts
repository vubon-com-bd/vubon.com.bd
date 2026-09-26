import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { RemoveWidgetCommand } from './remove-widget.command';
import type { DashboardServiceInterface } from '../../services/interfaces/dashboard.service.interface';

@CommandHandler(RemoveWidgetCommand)
export class RemoveWidgetHandler
  extends BaseCommandHandler<RemoveWidgetCommand, void>
  implements ICommandHandler<RemoveWidgetCommand>
{
  readonly commandType = 'analytics.dashboard.remove-widget';

  constructor(private readonly dashboardService: DashboardServiceInterface) {
    super();
  }

  async execute(command: RemoveWidgetCommand): Promise<void> {
    await this.dashboardService.removeWidget({
      dashboardId: command.dashboardId,
      widgetId: command.widgetId,
    });
  }
}

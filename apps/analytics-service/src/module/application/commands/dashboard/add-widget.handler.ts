import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { AddWidgetCommand } from './add-widget.command';
import type { DashboardServiceInterface } from '../../services/interfaces/dashboard.service.interface';
import type { WidgetResponseDTO } from '../../dtos/responses';

@CommandHandler(AddWidgetCommand)
export class AddWidgetHandler
  extends BaseCommandHandler<AddWidgetCommand, WidgetResponseDTO>
  implements ICommandHandler<AddWidgetCommand>
{
  readonly commandType = 'analytics.dashboard.add-widget';

  constructor(private readonly dashboardService: DashboardServiceInterface) {
    super();
  }

  async execute(command: AddWidgetCommand): Promise<WidgetResponseDTO> {
    return this.dashboardService.addWidget({
      dashboardId: command.dashboardId,
      widgetType: command.widgetType as never,
      metricName: command.metricName,
      config: command.config,
      position: command.position,
    });
  }
}

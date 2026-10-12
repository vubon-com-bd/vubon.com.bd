import { DashboardService } from '../../services/impl/dashboard.service.js';
import { Injectable } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands';
import { RemoveWidgetCommand } from './remove-widget.command.js';
import type { DashboardResponseData } from '../../dtos/responses/dashboard-response.dto.js';

@Injectable()
@CommandHandler(RemoveWidgetCommand)
export class RemoveWidgetHandler extends BaseCommandHandler<RemoveWidgetCommand, DashboardResponseData>
  implements ICommandHandler<RemoveWidgetCommand> {
  readonly commandType = 'analytics.dashboard.remove-widget';
  constructor(private readonly service: DashboardService) { super(); }
  async execute(command: RemoveWidgetCommand): Promise<DashboardResponseData> {
    return this.service.removeWidget(command.dashboardId, command.widgetId, command.userId);
  }
}

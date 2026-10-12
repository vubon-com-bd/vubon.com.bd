import { DashboardService } from '../../services/impl/dashboard.service.js';
import { Injectable } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands';
import { AddWidgetCommand } from './add-widget.command.js';
import type { DashboardResponseData } from '../../dtos/responses/dashboard-response.dto.js';

@Injectable()
@CommandHandler(AddWidgetCommand)
export class AddWidgetHandler extends BaseCommandHandler<AddWidgetCommand, DashboardResponseData>
  implements ICommandHandler<AddWidgetCommand> {
  readonly commandType = 'analytics.dashboard.add-widget';
  constructor(private readonly service: DashboardService) { super(); }
  async execute(command: AddWidgetCommand): Promise<DashboardResponseData> {
    return this.service.addWidget(command.dashboardId, command.payload, command.userId);
  }
}

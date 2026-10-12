import { DashboardService } from '../../services/impl/dashboard.service.js';
import { Injectable } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands';
import { UpdateDashboardCommand } from './update-dashboard.command.js';
import type { DashboardResponseData } from '../../dtos/responses/dashboard-response.dto.js';

@Injectable()
@CommandHandler(UpdateDashboardCommand)
export class UpdateDashboardHandler extends BaseCommandHandler<UpdateDashboardCommand, DashboardResponseData>
  implements ICommandHandler<UpdateDashboardCommand> {
  readonly commandType = 'analytics.dashboard.update';
  constructor(private readonly service: DashboardService) { super(); }
  async execute(command: UpdateDashboardCommand): Promise<DashboardResponseData> {
    return this.service.update(command.dashboardId, command.payload, command.userId);
  }
}

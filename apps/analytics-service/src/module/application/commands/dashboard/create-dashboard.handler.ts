import { DashboardService } from '../../services/impl/dashboard.service.js';
import { Injectable } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands';
import { CreateDashboardCommand } from './create-dashboard.command.js';
import type { DashboardResponseData } from '../../dtos/responses/dashboard-response.dto.js';

@Injectable()
@CommandHandler(CreateDashboardCommand)
export class CreateDashboardHandler extends BaseCommandHandler<CreateDashboardCommand, DashboardResponseData>
  implements ICommandHandler<CreateDashboardCommand> {
  readonly commandType = 'analytics.dashboard.create';
  constructor(private readonly service: DashboardService) { super(); }
  async execute(command: CreateDashboardCommand): Promise<DashboardResponseData> {
    return this.service.create(command.payload, command.userId);
  }
}

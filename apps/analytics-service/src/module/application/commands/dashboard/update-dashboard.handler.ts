import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { UpdateDashboardCommand } from './update-dashboard.command';
import type { DashboardServiceInterface } from '../../services/interfaces/dashboard.service.interface';
import type { DashboardResponseDTO } from '../../dtos/responses';

@CommandHandler(UpdateDashboardCommand)
export class UpdateDashboardHandler
  extends BaseCommandHandler<UpdateDashboardCommand, DashboardResponseDTO>
  implements ICommandHandler<UpdateDashboardCommand>
{
  readonly commandType = 'analytics.dashboard.update';

  constructor(private readonly dashboardService: DashboardServiceInterface) {
    super();
  }

  async execute(command: UpdateDashboardCommand): Promise<DashboardResponseDTO> {
    return this.dashboardService.update({
      dashboardId: command.dashboardId,
      name: command.name,
      layout: command.layout as never,
    });
  }
}

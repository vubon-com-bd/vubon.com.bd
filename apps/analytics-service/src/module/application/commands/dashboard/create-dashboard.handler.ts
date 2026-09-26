import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { CreateDashboardCommand } from './create-dashboard.command';
import type { DashboardServiceInterface } from '../../services/interfaces/dashboard.service.interface';
import type { DashboardResponseDTO } from '../../dtos/responses';

type Layout = 'grid' | 'masonry' | 'flex' | 'freeform';

@CommandHandler(CreateDashboardCommand)
export class CreateDashboardHandler
  extends BaseCommandHandler<CreateDashboardCommand, DashboardResponseDTO>
  implements ICommandHandler<CreateDashboardCommand>
{
  readonly commandType = 'analytics.dashboard.create';

  constructor(private readonly dashboardService: DashboardServiceInterface) {
    super();
  }

  async execute(command: CreateDashboardCommand): Promise<DashboardResponseDTO> {
    const layout = (command.layout ?? 'grid') as Layout;
    return this.dashboardService.create({
      name: command.name,
      ownerId: command.ownerId,
      layout,
    });
  }
}

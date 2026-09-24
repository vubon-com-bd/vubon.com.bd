import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { UpdateKpiCommand } from './update-kpi.command';
import type { KpiServiceInterface } from '../../services/interfaces/kpi.service.interface';
import type { KpiResponseDTO } from '../../dtos/responses';

@CommandHandler(UpdateKpiCommand)
export class UpdateKpiHandler
  extends BaseCommandHandler<UpdateKpiCommand, KpiResponseDTO>
  implements ICommandHandler<UpdateKpiCommand>
{
  readonly commandType = 'analytics.kpi.update';

  constructor(private readonly kpiService: KpiServiceInterface) {
    super();
  }

  async execute(command: UpdateKpiCommand): Promise<KpiResponseDTO> {
    return this.kpiService.update({
      kpiId: command.kpiId,
      name: command.name,
      target: command.target,
      threshold: command.threshold,
      metricName: command.metricName,
    });
  }
}

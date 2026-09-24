import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { CreateKpiCommand } from './create-kpi.command';
import type { KpiServiceInterface } from '../../services/interfaces/kpi.service.interface';
import type { KpiResponseDTO } from '../../dtos/responses';

@CommandHandler(CreateKpiCommand)
export class CreateKpiHandler
  extends BaseCommandHandler<CreateKpiCommand, KpiResponseDTO>
  implements ICommandHandler<CreateKpiCommand>
{
  readonly commandType = 'analytics.kpi.create';

  constructor(private readonly kpiService: KpiServiceInterface) {
    super();
  }

  async execute(command: CreateKpiCommand): Promise<KpiResponseDTO> {
    return this.kpiService.create({
      name: command.name,
      metricName: command.metricName,
      target: command.target,
      threshold: command.threshold,
      ownerId: command.ownerId,
    });
  }
}

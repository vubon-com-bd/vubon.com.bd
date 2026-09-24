import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { EvaluateKpiCommand } from './evaluate-kpi.command';
import type { KpiServiceInterface } from '../../services/interfaces/kpi.service.interface';
import type { KpiResultResponseDTO } from '../../dtos/responses';

@CommandHandler(EvaluateKpiCommand)
export class EvaluateKpiHandler
  extends BaseCommandHandler<EvaluateKpiCommand, KpiResultResponseDTO>
  implements ICommandHandler<EvaluateKpiCommand>
{
  readonly commandType = 'analytics.kpi.evaluate';

  constructor(private readonly kpiService: KpiServiceInterface) {
    super();
  }

  async execute(command: EvaluateKpiCommand): Promise<KpiResultResponseDTO> {
    return this.kpiService.evaluate({
      kpiId: command.kpiId,
      actual: command.actual,
      evaluatedAt: command.evaluatedAt,
    });
  }
}

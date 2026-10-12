import { KpiService } from '../../services/impl/kpi.service.js';
import { Injectable } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
/**
 * Evaluate KPI Command Handler
 */
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands';
import { EvaluateKpiCommand } from './evaluate-kpi.command.js';
import type { KpiResultResponseData } from '../../dtos/responses/kpi-result-response.dto.js';

@Injectable()
@CommandHandler(EvaluateKpiCommand)
export class EvaluateKpiHandler extends BaseCommandHandler<EvaluateKpiCommand, KpiResultResponseData>
  implements ICommandHandler<EvaluateKpiCommand> {
  readonly commandType = 'analytics.kpi.evaluate';

  constructor(private readonly kpiService: KpiService) {
    super();
  }

  async execute(command: EvaluateKpiCommand): Promise<KpiResultResponseData> {
    return this.kpiService.evaluate(command.kpiId, command.payload.actual);
  }
}

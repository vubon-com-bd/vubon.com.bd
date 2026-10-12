import { KpiService } from '../../services/impl/kpi.service.js';
import { Injectable } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
/**
 * Update KPI Command Handler
 */
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands';
import { UpdateKpiCommand } from './update-kpi.command.js';
import type { KpiResponseData } from '../../dtos/responses/kpi-response.dto.js';

@Injectable()
@CommandHandler(UpdateKpiCommand)
export class UpdateKpiHandler extends BaseCommandHandler<UpdateKpiCommand, KpiResponseData>
  implements ICommandHandler<UpdateKpiCommand> {
  readonly commandType = 'analytics.kpi.update';

  constructor(private readonly kpiService: KpiService) {
    super();
  }

  async execute(command: UpdateKpiCommand): Promise<KpiResponseData> {
    return this.kpiService.update(command.kpiId, command.payload);
  }
}

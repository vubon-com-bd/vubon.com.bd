import { KpiService } from '../../services/impl/kpi.service.js';
import { Injectable } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
/**
 * Create KPI Command Handler
 */
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands';
import { CreateKpiCommand } from './create-kpi.command.js';
import type { KpiResponseData } from '../../dtos/responses/kpi-response.dto.js';

@Injectable()
@CommandHandler(CreateKpiCommand)
export class CreateKpiHandler extends BaseCommandHandler<CreateKpiCommand, KpiResponseData>
  implements ICommandHandler<CreateKpiCommand> {
  readonly commandType = 'analytics.kpi.create';

  constructor(private readonly kpiService: KpiService) {
    super();
  }

  async execute(command: CreateKpiCommand): Promise<KpiResponseData> {
    return this.kpiService.create(command.payload);
  }
}

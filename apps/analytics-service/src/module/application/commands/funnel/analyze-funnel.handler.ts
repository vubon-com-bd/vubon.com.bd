import { FunnelService } from '../../services/impl/funnel.service.js';
import { Injectable } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands';
import { AnalyzeFunnelCommand } from './analyze-funnel.command.js';
import type { FunnelAnalysisResponseData } from '../../dtos/responses/funnel-analysis-response.dto.js';

@Injectable()
@CommandHandler(AnalyzeFunnelCommand)
export class AnalyzeFunnelHandler extends BaseCommandHandler<AnalyzeFunnelCommand, FunnelAnalysisResponseData>
  implements ICommandHandler<AnalyzeFunnelCommand> {
  readonly commandType = 'analytics.funnel.analyze';
  constructor(private readonly service: FunnelService) { super(); }
  async execute(command: AnalyzeFunnelCommand): Promise<FunnelAnalysisResponseData> {
    return this.service.analyze(command.funnelId, command.payload);
  }
}

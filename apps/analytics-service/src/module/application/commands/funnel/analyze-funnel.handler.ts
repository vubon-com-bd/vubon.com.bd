import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { AnalyzeFunnelCommand } from './analyze-funnel.command';
import type { FunnelServiceInterface } from '../../services/interfaces/funnel.service.interface';
import type { FunnelAnalysisResponseDTO } from '../../dtos/responses';

@CommandHandler(AnalyzeFunnelCommand)
export class AnalyzeFunnelHandler
  extends BaseCommandHandler<AnalyzeFunnelCommand, FunnelAnalysisResponseDTO>
  implements ICommandHandler<AnalyzeFunnelCommand>
{
  readonly commandType = 'analytics.funnel.analyze';

  constructor(private readonly funnelService: FunnelServiceInterface) {
    super();
  }

  async execute(command: AnalyzeFunnelCommand): Promise<FunnelAnalysisResponseDTO> {
    return this.funnelService.analyze({
      funnelId: command.funnelId,
      fromDate: command.fromDate,
      toDate: command.toDate,
    });
  }
}

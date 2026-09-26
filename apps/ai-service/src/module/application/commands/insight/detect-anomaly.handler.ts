import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { DetectAnomalyCommand } from './detect-anomaly.command';
import type { InsightServiceInterface } from '../../services/interfaces/insight.service.interface';

@CommandHandler(DetectAnomalyCommand)
export class DetectAnomalyHandler
  extends BaseCommandHandler<
    DetectAnomalyCommand,
    readonly { readonly timestamp: string; readonly value: number; readonly severity: string }[]
  >
  implements ICommandHandler<DetectAnomalyCommand>
{
  readonly commandType = 'ai.insight.detect-anomaly';
  constructor(
    private readonly insightService: InsightServiceInterface,
    private readonly eventBus: EventBus,
  ) { super(); }

  async execute(
    command: DetectAnomalyCommand,
  ): Promise<readonly { readonly timestamp: string; readonly value: number; readonly severity: string }[]> {
    return this.insightService.detectAnomalies(command.input);
  }
}

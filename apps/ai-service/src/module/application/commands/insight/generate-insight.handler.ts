import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { GenerateInsightCommand } from './generate-insight.command';
import type { InsightServiceInterface } from '../../services/interfaces/insight.service.interface';
import type { InsightResponseDTO } from '../../dtos/responses/insight-response.dto';

@CommandHandler(GenerateInsightCommand)
export class GenerateInsightHandler
  extends BaseCommandHandler<GenerateInsightCommand, InsightResponseDTO>
  implements ICommandHandler<GenerateInsightCommand>
{
  readonly commandType = 'ai.insight.generate';
  constructor(
    private readonly insightService: InsightServiceInterface,
    private readonly eventBus: EventBus,
  ) { super(); }

  async execute(command: GenerateInsightCommand): Promise<InsightResponseDTO> {
    return this.insightService.generate(command.input);
  }
}

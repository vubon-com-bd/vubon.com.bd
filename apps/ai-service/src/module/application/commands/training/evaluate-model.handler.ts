import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { EvaluateModelCommand } from './evaluate-model.command';
import type { TrainingServiceInterface } from '../../services/interfaces/training.service.interface';

@CommandHandler(EvaluateModelCommand)
export class EvaluateModelHandler
  extends BaseCommandHandler<
    EvaluateModelCommand,
    { readonly modelId: string; readonly metrics: Readonly<Record<string, number>> }
  >
  implements ICommandHandler<EvaluateModelCommand>
{
  readonly commandType = 'ai.training.evaluate';

  constructor(
    private readonly trainingService: TrainingServiceInterface,
    private readonly eventBus: EventBus,
  ) {
    super();
  }

  async execute(
    command: EvaluateModelCommand,
  ): Promise<{ readonly modelId: string; readonly metrics: Readonly<Record<string, number>> }> {
    return this.trainingService.evaluate(command.input);
  }
}

import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { CancelTrainingCommand } from './cancel-training.command';
import type { TrainingServiceInterface } from '../../services/interfaces/training.service.interface';

@CommandHandler(CancelTrainingCommand)
export class CancelTrainingHandler
  extends BaseCommandHandler<CancelTrainingCommand, void>
  implements ICommandHandler<CancelTrainingCommand>
{
  readonly commandType = 'ai.training.cancel';

  constructor(
    private readonly trainingService: TrainingServiceInterface,
    private readonly eventBus: EventBus,
  ) {
    super();
  }

  async execute(command: CancelTrainingCommand): Promise<void> {
    await this.trainingService.cancel(command.trainingId, command.reason);
  }
}

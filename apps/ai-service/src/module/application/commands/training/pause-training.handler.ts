import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { PauseTrainingCommand } from './pause-training.command';
import type { TrainingServiceInterface } from '../../services/interfaces/training.service.interface';
import type { TrainingResponseDTO } from '../../dtos/responses/training-response.dto';

@CommandHandler(PauseTrainingCommand)
export class PauseTrainingHandler
  extends BaseCommandHandler<PauseTrainingCommand, TrainingResponseDTO>
  implements ICommandHandler<PauseTrainingCommand>
{
  readonly commandType = 'ai.training.pause';

  constructor(
    private readonly trainingService: TrainingServiceInterface,
    private readonly eventBus: EventBus,
  ) {
    super();
  }

  async execute(command: PauseTrainingCommand): Promise<TrainingResponseDTO> {
    return this.trainingService.pause(command.trainingId, command.reason);
  }
}

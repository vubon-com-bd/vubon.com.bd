import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { StartTrainingCommand } from './start-training.command';
import type { TrainingServiceInterface } from '../../services/interfaces/training.service.interface';
import type { TrainingResponseDTO } from '../../dtos/responses/training-response.dto';

@CommandHandler(StartTrainingCommand)
export class StartTrainingHandler
  extends BaseCommandHandler<StartTrainingCommand, TrainingResponseDTO>
  implements ICommandHandler<StartTrainingCommand>
{
  readonly commandType = 'ai.training.start';

  constructor(
    private readonly trainingService: TrainingServiceInterface,
    private readonly eventBus: EventBus,
  ) {
    super();
  }

  async execute(command: StartTrainingCommand): Promise<TrainingResponseDTO> {
    return this.trainingService.start(command.input);
  }
}

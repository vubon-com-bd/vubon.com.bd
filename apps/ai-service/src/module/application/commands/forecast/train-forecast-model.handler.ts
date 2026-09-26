import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { TrainForecastModelCommand } from './train-forecast-model.command';

@CommandHandler(TrainForecastModelCommand)
export class TrainForecastModelHandler
  extends BaseCommandHandler<TrainForecastModelCommand, void>
  implements ICommandHandler<TrainForecastModelCommand>
{
  readonly commandType = 'ai.forecast.train-model';
  constructor(private readonly eventBus: EventBus) { super(); }

  async execute(command: TrainForecastModelCommand): Promise<void> {
    void command;
    void this.eventBus;
  }
}

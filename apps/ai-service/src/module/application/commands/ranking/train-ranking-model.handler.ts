import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { TrainRankingModelCommand } from './train-ranking-model.command';
import type { RankingServiceInterface } from '../../services/interfaces/ranking.service.interface';

@CommandHandler(TrainRankingModelCommand)
export class TrainRankingModelHandler
  extends BaseCommandHandler<TrainRankingModelCommand, void>
  implements ICommandHandler<TrainRankingModelCommand>
{
  readonly commandType = 'ai.ranking.train-model';
  constructor(
    private readonly rankingService: RankingServiceInterface,
    private readonly eventBus: EventBus,
  ) { super(); }

  async execute(command: TrainRankingModelCommand): Promise<void> {
    await this.rankingService.trainModel(command.input);
  }
}

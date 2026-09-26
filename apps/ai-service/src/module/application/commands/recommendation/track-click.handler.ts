import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { TrackClickCommand } from './track-click.command';
import type { RecommendationServiceInterface } from '../../services/interfaces/recommendation.service.interface';

@CommandHandler(TrackClickCommand)
export class TrackClickHandler
  extends BaseCommandHandler<TrackClickCommand, void>
  implements ICommandHandler<TrackClickCommand>
{
  readonly commandType = 'ai.recommendation.track-click';

  constructor(
    private readonly recommendationService: RecommendationServiceInterface,
    private readonly eventBus: EventBus,
  ) {
    super();
  }

  async execute(command: TrackClickCommand): Promise<void> {
    await this.recommendationService.trackClick(
      command.recommendationId,
      command.userId,
      command.productId,
    );
  }
}

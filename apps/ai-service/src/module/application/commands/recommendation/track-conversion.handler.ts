import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { TrackConversionCommand } from './track-conversion.command';
import type { RecommendationServiceInterface } from '../../services/interfaces/recommendation.service.interface';

@CommandHandler(TrackConversionCommand)
export class TrackConversionHandler
  extends BaseCommandHandler<TrackConversionCommand, void>
  implements ICommandHandler<TrackConversionCommand>
{
  readonly commandType = 'ai.recommendation.track-conversion';

  constructor(
    private readonly recommendationService: RecommendationServiceInterface,
    private readonly eventBus: EventBus,
  ) {
    super();
  }

  async execute(command: TrackConversionCommand): Promise<void> {
    await this.recommendationService.trackConversion(
      command.recommendationId,
      command.userId,
      command.productId,
      command.orderId,
    );
  }
}

import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { GenerateRecommendationCommand } from './generate-recommendation.command';
import type { RecommendationServiceInterface } from '../../services/interfaces/recommendation.service.interface';
import type { RecommendationResponseDTO } from '../../dtos/responses/recommendation-response.dto';

@CommandHandler(GenerateRecommendationCommand)
export class GenerateRecommendationHandler
  extends BaseCommandHandler<GenerateRecommendationCommand, RecommendationResponseDTO>
  implements ICommandHandler<GenerateRecommendationCommand>
{
  readonly commandType = 'ai.recommendation.generate';

  constructor(
    private readonly recommendationService: RecommendationServiceInterface,
    private readonly eventBus: EventBus,
  ) {
    super();
  }

  async execute(command: GenerateRecommendationCommand): Promise<RecommendationResponseDTO> {
    return this.recommendationService.generate(command.input);
  }
}

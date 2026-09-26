import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';
import type { GenerateRecommendationRequestDTO } from '../../dtos/requests/recommendation/generate-recommendation.dto';

export class GenerateRecommendationCommand extends BaseCommand {
  readonly type = 'ai.recommendation.generate';

  constructor(
    public readonly input: GenerateRecommendationRequestDTO,
    public readonly correlationId?: string,
  ) {
    super();
  }
}

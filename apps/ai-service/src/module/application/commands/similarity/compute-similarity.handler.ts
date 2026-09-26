import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { ComputeSimilarityCommand } from './compute-similarity.command';
import type { SimilarityServiceInterface } from '../../services/interfaces/similarity.service.interface';
import type { SimilarityResponseDTO } from '../../dtos/responses/similarity-response.dto';

@CommandHandler(ComputeSimilarityCommand)
export class ComputeSimilarityHandler
  extends BaseCommandHandler<ComputeSimilarityCommand, SimilarityResponseDTO>
  implements ICommandHandler<ComputeSimilarityCommand>
{
  readonly commandType = 'ai.similarity.compute';
  constructor(
    private readonly similarityService: SimilarityServiceInterface,
    private readonly eventBus: EventBus,
  ) { super(); }

  async execute(command: ComputeSimilarityCommand): Promise<SimilarityResponseDTO> {
    return this.similarityService.compute(command.input);
  }
}
